import type { Location } from './schema';

// Fictional locations and addresses used for demonstration only.
export const locations: Location[] = [
  {
    slug: 'austin-downtown',
    name: 'Downtown Austin',
    city: 'Austin, TX',
    address: '100 Example Street, Austin, TX 78701',
    phone: '(512) 555-0142',
    hours: [
      { days: 'Mon - Thu', open: '11:00 am - 10:00 pm' },
      { days: 'Fri - Sat', open: '11:00 am - 12:00 am' },
      { days: 'Sun', open: '10:00 am - 9:00 pm' },
    ],
    override: {
      priceOverrides: { ribeye: 36, burger: 18 },
      localItems: [
        { id: 'atx-brisket-taco', name: 'Brisket Taco Trio', description: 'Smoked brisket, pickled onion, salsa verde, corn tortillas.', price: 14, category: 'mains' },
      ],
      announcement: 'Live music on the patio every Friday from 7 pm.',
    },
  },
  {
    slug: 'denver-rino',
    name: 'RiNo Denver',
    city: 'Denver, CO',
    address: '250 Sample Avenue, Denver, CO 80205',
    phone: '(303) 555-0187',
    hours: [
      { days: 'Mon - Fri', open: '4:00 pm - 10:00 pm' },
      { days: 'Sat - Sun', open: '10:00 am - 10:00 pm' },
    ],
    override: {
      unavailable: ['salmon'],
      hiddenPromotions: ['anniversary'],
      priceOverrides: { ribeye: 37 },
      localItems: [
        { id: 'den-elk-chili', name: 'Green Chili Elk Bowl', description: 'Slow-braised elk, roasted poblano, hominy, warm tortilla.', price: 19, category: 'mains', tags: ['spicy'] },
      ],
      announcement: 'Weekend brunch is served from 10 am.',
    },
  },
  {
    slug: 'portland-pearl',
    name: 'Pearl District Portland',
    city: 'Portland, OR',
    address: '75 Demo Way, Portland, OR 97209',
    phone: '(503) 555-0119',
    hours: [
      { days: 'Tue - Sun', open: '11:30 am - 9:30 pm' },
      { days: 'Mon', open: 'Closed' },
    ],
    override: {
      unavailable: ['wings'],
      priceOverrides: { salmon: 24 },
      localItems: [
        { id: 'pdx-chanterelle', name: 'Chanterelle Toast', description: 'Local chanterelles, whipped ricotta, thyme, sourdough.', price: 15, category: 'starters', tags: ['vegetarian'] },
        { id: 'pdx-pinot-float', name: 'Pinot Noir Sorbet Float', description: 'Pinot noir sorbet, sparkling water, orange zest.', price: 8, category: 'desserts', tags: ['vegetarian'] },
      ],
    },
  },
];
