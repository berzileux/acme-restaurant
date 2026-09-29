import { brand } from '../content/brand';
import type { Promotion } from '../content/schema';

export default function PromoList({ promos }: { promos: Promotion[] }) {
  if (promos.length === 0) return null;
  const nameOf = (id: string) => brand.menu.find((m) => m.id === id)?.name ?? id;
  return (
    <section className="promos" aria-labelledby="promo-h">
      <h2 id="promo-h">From the brand</h2>
      <ul className="promo-list">
        {promos.map((p) => (
          <li key={p.id} className="promo">
            <p className="promo-dates">{p.dates}</p>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.featuredItemIds && p.featuredItemIds.length > 0 && (
              <p className="promo-items">Featuring {p.featuredItemIds.map(nameOf).join(', ')}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
