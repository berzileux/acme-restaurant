import type { Brand } from './schema';

// Fictional brand used for demonstration only.
export const brand: Brand = {
  name: 'Acme Grill',
  tagline: 'Wood-fired plates, neighborhood tables.',
  story: [
    'Acme Grill started with one wood-fired oven and a simple rule: cook everything the same way, in every kitchen.',
    'Each location is run by a local owner who knows the block. The recipes, the look and the welcome stay the same wherever you sit down.',
  ],
  menu: [
    { id: 'charred-corn', name: 'Charred Street Corn', description: 'Grilled corn, lime crema, cotija, smoked chili salt.', price: 9, category: 'starters', tags: ['vegetarian'], featured: true },
    { id: 'burrata', name: 'Ember Burrata', description: 'Burrata, blistered tomatoes, basil oil, grilled sourdough.', price: 13, category: 'starters', tags: ['vegetarian'] },
    { id: 'wings', name: 'Smoked Chili Wings', description: 'Twelve-hour brined, wood-smoked, finished with honey chili glaze.', price: 12, category: 'starters', tags: ['spicy'] },
    { id: 'ribeye', name: 'Acme Ribeye', description: '12 oz ribeye, herb butter, charred lemon, roasted potatoes.', price: 34, category: 'mains', tags: ['gluten-free'], featured: true },
    { id: 'salmon', name: 'Cedar Plank Salmon', description: 'Cedar-roasted salmon, farro, citrus greens, dill yogurt.', price: 26, category: 'mains', featured: true },
    { id: 'mushroom', name: 'Wild Mushroom Flatbread', description: 'Wood-fired flatbread, roasted mushrooms, thyme, fontina.', price: 18, category: 'mains', tags: ['vegetarian'] },
    { id: 'burger', name: 'The House Burger', description: 'Double patty, aged cheddar, pickled onion, house sauce, brioche.', price: 17, category: 'mains' },
    { id: 'cheesecake', name: 'Burnt Honey Cheesecake', description: 'Basque-style cheesecake with honey and sea salt.', price: 9, category: 'desserts', tags: ['vegetarian'] },
    { id: 'lemonade', name: 'Smoked Lemonade', description: 'Fresh lemon, smoked simple syrup, sparkling water.', price: 5, category: 'drinks', tags: ['vegetarian'] },
    { id: 'cold-brew', name: 'Cold Brew Tonic', description: 'Cold brew over tonic, orange peel.', price: 6, category: 'drinks', tags: ['vegetarian'] },
  ],
  promotions: [
    {
      id: 'fall-menu',
      title: 'The Fall Menu is here',
      description: 'Wood-fired favorites with roasted mushrooms and burnt honey. Same recipes in every kitchen.',
      dates: 'Sep 25 - Nov 30',
      audience: 'all',
      featuredItemIds: ['mushroom', 'cheesecake', 'salmon'],
    },
    {
      id: 'patio-nights',
      title: 'Patio Nights',
      description: 'Smoked lemonade and shared plates outside, Thursday to Saturday.',
      dates: 'Through Oct 31',
      audience: ['austin-downtown', 'denver-rino'],
      featuredItemIds: ['lemonade', 'wings'],
    },
    {
      id: 'anniversary',
      title: 'Ten years of Acme Grill',
      description: 'A free burnt honey cheesecake with any main, all week.',
      dates: 'Oct 6 - Oct 12',
      audience: 'all',
      featuredItemIds: ['cheesecake'],
    },
  ],
};
