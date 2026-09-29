import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { brand } from '../content/brand';
import { locations } from '../content/locations';
import { money } from '../content/resolve';
import PromoList from './PromoList';

export default function Home() {
  useEffect(() => { document.title = `${brand.name} | Neighborhood kitchens, one shared table`; }, []);
  const featured = brand.menu.filter((m) => m.featured);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <p className="eyebrow">{locations.length} neighborhood kitchens</p>
          <h1>{brand.tagline}</h1>
          <p className="lead">Same recipes, same fire, same welcome. Find the kitchen closest to you.</p>
          <a className="button" href="#locations">Find a location</a>
        </div>
      </section>

      <section className="section container">
        <h2>Our story</h2>
        <div className="prose">
          {brand.story.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      <div className="container promo-wrap">
        <PromoList promos={brand.promotions.filter((p) => p.audience === 'all')} />
      </div>

      <section className="section container" aria-labelledby="sig">
        <h2 id="sig">Signature plates</h2>
        <p className="muted">Served at every location. Prices may vary slightly by city.</p>
        <ul className="cards">
          {featured.map((item) => (
            <li key={item.id} className="card">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">from {money(Math.min(item.price, ...locations.map((l) => l.override.priceOverrides?.[item.id] ?? item.price)))}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section container" id="locations" aria-labelledby="loc">
        <h2 id="loc">Find your table</h2>
        <ul className="cards">
          {locations.map((l) => (
            <li key={l.slug} className="card location-card">
              <h3><Link to={`/locations/${l.slug}`}>{l.name}</Link></h3>
              <p className="muted">{l.city}</p>
              <p>{l.address}</p>
              <p>{l.hours[0].days}: {l.hours[0].open}</p>
              {l.override.announcement && <p className="note">{l.override.announcement}</p>}
              <Link className="text-link" to={`/locations/${l.slug}`}>View menu and hours<span className="sr-only"> for {l.name}</span></Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
