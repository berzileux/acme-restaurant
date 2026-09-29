import { useEffect, useState } from 'react';
import { brand } from '../content/brand';
import { locations } from '../content/locations';
import { menuStats, promotionStatus, statusLabels } from '../content/resolve';

const rules = [
  ['Brand owns', 'Name, description, category, tags and base price of every menu item, plus brand story and tagline.'],
  ['Location may override', 'Price of a brand item, whether an item is served, one announcement, and its own hours and contact details.'],
  ['Location may hide', 'A syndicated brand promotion it does not want to run. It cannot edit the promotion text or dates.'],
  ['Location may add', 'Local specials. They are always labeled so guests can tell them apart from the shared menu.'],
  ['Location may not', 'Rename or redescribe a brand item. The types make that impossible to express.'],
];

export default function SchemaPage() {
  const [slug, setSlug] = useState(locations[0].slug);
  useEffect(() => { document.title = `How it works | ${brand.name}`; }, []);
  const location = locations.find((l) => l.slug === slug)!;
  const stats = menuStats(brand, location);

  return (
    <section className="section container">
      <h1>How this site is built</h1>
      <p className="lead-dark">
        One brand content model feeds every location page. Locations store only their differences, so a brand
        change reaches all sites at once and a local change never touches the brand.
      </p>

      <h2>Governance rules</h2>
      <dl className="rules">
        {rules.map(([k, v]) => (
          <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
        ))}
      </dl>

      <h2>See a location's overrides</h2>
      <label className="field">
        <span>Location</span>
        <select value={slug} onChange={(e) => setSlug(e.target.value)}>
          {locations.map((l) => <option key={l.slug} value={l.slug}>{l.name}</option>)}
        </select>
      </label>
      <p className="muted">
        Resolves to {stats.shared} shared items, {stats.local} local, {stats.repriced} repriced, {stats.hidden} hidden, {stats.promotions} promotions.
      </p>
      <pre className="code" tabIndex={0} aria-label={`Overrides stored for ${location.name}`}>{JSON.stringify(location.override, null, 2)}</pre>

      <h2>Content syndication</h2>
      <p className="muted">
        Brand promotions are written once and syndicated by audience rule. Each location either shows a promotion,
        hides it, or is not in the audience. Nothing is copied, so a brand edit reaches every location that shows it.
      </p>
      <div className="table-wrap">
        <table className="matrix">
          <caption className="sr-only">Promotion status by location</caption>
          <thead>
            <tr>
              <th scope="col">Promotion</th>
              {locations.map((l) => <th scope="col" key={l.slug}>{l.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {brand.promotions.map((p) => (
              <tr key={p.id}>
                <th scope="row">{p.title}</th>
                {locations.map((l) => {
                  const st = promotionStatus(p, l);
                  return <td key={l.slug}><span className={`status status-${st}`}>{statusLabels[st]}</span></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Resolution</h2>
      <pre className="code" tabIndex={0} aria-label="Resolution logic">{`resolvedMenu(location) =
  brand.menu
    .filter(not in location.unavailable)
    .map(apply location.priceOverrides)
  + location.localItems (labeled "Local special")

resolvedPromotions(location) =
  brand.promotions
    .filter(audience is 'all' or includes location)
    .filter(not in location.hiddenPromotions)`}</pre>
    </section>
  );
}
