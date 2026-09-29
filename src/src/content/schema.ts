// Content model for the franchise ecosystem.
// Governance is encoded in the types: a location can override price and
// availability, add local items, and post announcements. It cannot rename or
// redescribe a brand item, so the brand voice stays consistent everywhere.

export type Category = 'starters' | 'mains' | 'desserts' | 'drinks';
export type Tag = 'vegetarian' | 'spicy' | 'gluten-free';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  tags?: Tag[];
  featured?: boolean;
}

// A brand-owned campaign syndicated to locations. Locations receive it by
// audience rule and may hide it, but cannot edit it.
export interface Promotion {
  id: string;
  title: string;
  description: string;
  dates: string;
  audience: 'all' | string[]; // 'all' or a list of location slugs
  featuredItemIds?: string[]; // menu items the promotion highlights
}

export interface Brand {
  name: string;
  tagline: string;
  story: string[];
  menu: MenuItem[];
  promotions: Promotion[];
}

export interface HoursRow {
  days: string;
  open: string;
}

// The only fields a franchisee may change on shared brand content.
export interface LocationOverride {
  priceOverrides?: Record<string, number>; // menu item id -> local price
  unavailable?: string[]; // menu item ids not served here
  localItems?: MenuItem[]; // location-only items (rendered as "Local special")
  hiddenPromotions?: string[]; // syndicated promotion ids this location opts out of
  announcement?: string;
}

export interface Location {
  slug: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  hours: HoursRow[];
  override: LocationOverride;
}

export interface ResolvedMenuItem extends MenuItem {
  source: 'brand' | 'local';
  basePrice: number;
  priceOverridden: boolean;
}

export type PromotionStatus = 'shown' | 'hidden-locally' | 'not-targeted';
