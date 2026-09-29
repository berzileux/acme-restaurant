import type { Brand, Category, Location, Promotion, PromotionStatus, ResolvedMenuItem } from './schema';

export const categoryLabels: Record<Category, string> = {
  starters: 'Starters',
  mains: 'Mains',
  desserts: 'Desserts',
  drinks: 'Drinks',
};

export const categoryOrder: Category[] = ['starters', 'mains', 'desserts', 'drinks'];

// Merge shared brand content with a location's overrides.
export function resolveMenu(brand: Brand, location: Location): ResolvedMenuItem[] {
  const { priceOverrides = {}, unavailable = [], localItems = [] } = location.override;

  const shared = brand.menu
    .filter((item) => !unavailable.includes(item.id))
    .map<ResolvedMenuItem>((item) => {
      const local = priceOverrides[item.id];
      return {
        ...item,
        source: 'brand',
        basePrice: item.price,
        price: local ?? item.price,
        priceOverridden: local !== undefined && local !== item.price,
      };
    });

  const extra = localItems.map<ResolvedMenuItem>((item) => ({
    ...item,
    source: 'local',
    basePrice: item.price,
    priceOverridden: false,
  }));

  return [...shared, ...extra];
}

export function groupByCategory(items: ResolvedMenuItem[]): Array<[Category, ResolvedMenuItem[]]> {
  return categoryOrder
    .map<[Category, ResolvedMenuItem[]]>((c) => [c, items.filter((i) => i.category === c)])
    .filter(([, list]) => list.length > 0);
}

export function menuStats(brand: Brand, location: Location) {
  const items = resolveMenu(brand, location);
  return {
    shared: items.filter((i) => i.source === 'brand').length,
    local: items.filter((i) => i.source === 'local').length,
    repriced: items.filter((i) => i.priceOverridden).length,
    hidden: (location.override.unavailable ?? []).length,
    promotions: resolvePromotions(brand, location).length,
  };
}

export function promotionStatus(promo: Promotion, location: Location): PromotionStatus {
  const targeted = promo.audience === 'all' || promo.audience.includes(location.slug);
  if (!targeted) return 'not-targeted';
  return (location.override.hiddenPromotions ?? []).includes(promo.id) ? 'hidden-locally' : 'shown';
}

// Promotions a location actually displays, with featured items limited to what it serves.
export function resolvePromotions(brand: Brand, location: Location) {
  const served = new Set(resolveMenu(brand, location).map((i) => i.id));
  return brand.promotions
    .filter((p) => promotionStatus(p, location) === 'shown')
    .map((p) => ({ ...p, featuredItemIds: (p.featuredItemIds ?? []).filter((id) => served.has(id)) }));
}

export const statusLabels: Record<PromotionStatus, string> = {
  'shown': 'Shown',
  'hidden-locally': 'Hidden by location',
  'not-targeted': 'Not targeted',
};

export const money = (n: number) => `$${n.toFixed(0)}`;
