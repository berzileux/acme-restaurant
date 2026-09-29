import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { brand } from '../content/brand';
import { locations } from '../content/locations';
import { categoryLabels, groupByCategory, menuStats, money, resolveMenu, resolvePromotions } from '../content/resolve';
import PromoList from './PromoList';

export default function LocationPage() {
  const { slug } = useParams();
  const location = locations.find((l) => l.slug === slug);

  useEffect(() => {
    document.title = location ? `${location.name} | ${brand.name}` : `Location not found | ${brand.name}`;
  }, [location]);

  if (!location) {
    return (
      <section className="section container">
        <h1>Location not found</h1>
        <p><Link className="text-link" to="/">Back to all locations</Link></p>
      </section>
    );
  }

  const groups = groupByCategory(resolveMenu(brand, location));
  const stats = menuStats(brand, location);
  const promos = resolvePromotions(brand, location);

  return (
    <>
      <section className="location-hero">
        <div className="container">
          <p><Link className="text-link on-dark" to="/">All locations</Link></p>
          <h1>{brand.name} {location.name}</h1>
          <p className="lead">{location.address}</p>
          <p className="lead"><a className="on-dark" href={`tel:${location.phone.replace(/[^\d]/g, '')}`}>{location.phone}</a></p>
        </div>
      </section>

      <div className="container two-col">
        <aside className="panel" aria-labelledby="hours">
          <h2 id="hours">Hours</h2>
          <dl className="hours">
            {location.hours.map((h) => (
              <div key={h.days}><dt>{h.days}</dt><dd>{h.open}</dd></div>
            ))}
          </dl>
          {location.override.announcement && <p className="note">{location.override.announcement}</p>}
          <details className="source">
            <summary>How this page is built</summary>
            <p>
              {stats.shared} shared brand items, {stats.local} local {stats.local === 1 ? 'special' : 'specials'},{' '}
              {stats.repriced} local {stats.repriced === 1 ? 'price' : 'prices'}, {stats.hidden} not served here, {stats.promotions} syndicated {stats.promotions === 1 ? 'promotion' : 'promotions'}.{' '}
              <Link className="text-link" to="/schema">See the content model</Link>.
            </p>
          </details>
        </aside>

        <div>
          <PromoList promos={promos} />
          {groups.map(([category, items]) => (
            <section key={category} aria-labelledby={`cat-${category}`} className="menu-group">
              <h2 id={`cat-${category}`}>{categoryLabels[category]}</h2>
              <ul className="menu">
                {items.map((item) => (
                  <li key={item.id} className="menu-item">
                    <div>
                      <h3>
                        {item.name}
                        {item.source === 'local' && <span className="badge badge-local">Local special</span>}
                        {item.tags?.map((t) => <span key={t} className="badge">{t}</span>)}
                      </h3>
                      <p>{item.description}</p>
                    </div>
                    <p className="price">
                      {item.priceOverridden && <span className="was" aria-label={`brand price ${money(item.basePrice)}`}>{money(item.basePrice)}</span>}
                      {money(item.price)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
