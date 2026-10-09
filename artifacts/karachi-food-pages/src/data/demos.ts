export type SectorSlug = 'chai-hotel' | 'cafe' | 'restaurant' | 'bbq' | 'diner';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  pricePkr: number;
  photoIndex: number;
  featured?: boolean;
};

export type MenuCategory = {
  id: string;
  label: string;
  note: string;
  items: MenuItem[];
};

export type DemoPhoto = {
  src: string;
  alt: string;
  caption: string;
  sourceUrl: string;
};

export type FoodDemo = {
  slug: SectorSlug;
  sectorLabel: string;
  businessName: string;
  tagline: string;
  introduction: string;
  themeKey: SectorSlug;
  symbol: string;
  artCaption: string;
  artDescription: string;
  exampleArea: string;
  exampleHours: string;
  atmosphere: string;
  photos: DemoPhoto[];
  menu: MenuCategory[];
};

export const demos: FoodDemo[] = [
  {
    slug: 'chai-hotel', sectorLabel: 'Chai hotel · dhaba', businessName: 'Baithak Chai House',
    tagline: 'A pause, poured strong.', introduction: 'A neighborhood dhaba concept built around unhurried cups, hot parathas and the easy rhythm of a shared table.',
    themeKey: 'chai-hotel', symbol: 'چائے', artCaption: 'A little room to stay awhile', artDescription: 'A steaming glass of chai on a saucer', exampleArea: 'Example area: PECHS, Karachi', exampleHours: 'Example hours: 5 pm – 1 am',
    atmosphere: 'The visual direction takes its cue from a well-used wooden table: compact type, warm paper tones and a little hand-drawn character. It is a sample direction, not a real venue.',
    photos: [
      {
        src: '/images/chai-hotel/karachi-street-chai.jpg',
        alt: 'A tea seller pours steaming chai from a pot into cups at a street-side stove in Karachi.',
        caption: 'Chai poured fresh · Karachi',
        sourceUrl: 'https://www.pexels.com/photo/traditional-street-tea-making-in-karachi-38834852/',
      },
      {
        src: '/images/chai-hotel/faisalabad-chai-pour.jpg',
        alt: 'A tea seller pours chai through a strainer into cups at a stall in Faisalabad.',
        caption: 'The evening chai ritual · Faisalabad',
        sourceUrl: 'https://www.pexels.com/photo/person-pouring-tea-to-a-strainer-and-ceramic-cups-12122984/',
      },
      {
        src: '/images/chai-hotel/pakistani-parathas.jpg',
        alt: 'A stack of flaky parathas with butter and fresh herbs.',
        caption: 'Paratha, hot from the tawa',
        sourceUrl: 'https://www.pexels.com/photo/stack-of-parathas-with-butter-and-cilantro-garnish-39833413/',
      },
      {
        src: '/images/chai-hotel/chai-paratha-plate.jpg',
        alt: 'Paratha served with chutneys and cups of masala chai.',
        caption: 'A proper chai-break spread',
        sourceUrl: 'https://www.pexels.com/photo/delicious-indian-paratha-with-chutneys-28885201/',
      },
    ],
    menu: [
      { id: 'chai', label: 'Chai', note: 'Made for the next conversation', items: [
        { id: 'karak', name: 'Karak chai', description: 'Strong black tea with a full, milky finish.', pricePkr: 180, photoIndex: 0, featured: true },
        { id: 'doodh-patti', name: 'Doodh patti', description: 'A slow-simmered cup with a rounded taste.', pricePkr: 210, photoIndex: 1 },
        { id: 'elaichi', name: 'Elaichi chai', description: 'A familiar cup with a cardamom note.', pricePkr: 220, photoIndex: 0 },
      ] },
      { id: 'paratha', label: 'Paratha & eggs', note: 'Hot from the imagined tawa', items: [
        { id: 'anda-paratha', name: 'Anda paratha', description: 'Egg folded into a crisp, layered paratha.', pricePkr: 390, photoIndex: 3, featured: true },
        { id: 'plain-paratha', name: 'Plain paratha', description: 'Flaky layers, served straight from the pan.', pricePkr: 210, photoIndex: 2 },
        { id: 'masala-omelette', name: 'Masala omelette', description: 'A soft omelette with a little green chilli.', pricePkr: 280, photoIndex: 3 },
      ] },
      { id: 'snacks', label: 'Snacks & add-ons', note: 'Small plates for the table', items: [
        { id: 'pakora', name: 'Seasonal pakora plate', description: 'A crisp, shareable snack for a chai break.', pricePkr: 320, photoIndex: 3 },
        { id: 'bun-kabab', name: 'Bun kebab', description: 'A soft bun with a spiced patty and chutney.', pricePkr: 360, photoIndex: 2 },
      ] },
    ],
  },
  {
    slug: 'cafe', sectorLabel: 'Cafe', businessName: 'Little Fern Coffee Room',
    tagline: 'A slower kind of morning.', introduction: 'An airy cafe concept for long breakfasts, carefully made coffee and a pastry picked for the walk home.',
    themeKey: 'cafe', symbol: 'f', artCaption: 'Coffee, daylight, a little pause', artDescription: 'A coffee cup with a leaf drawn in its foam', exampleArea: 'Example area: Clifton, Karachi', exampleHours: 'Example hours: 8 am – 8 pm',
    atmosphere: 'Soft botanical greens, a generous margin and quietly confident menu typography make this concept feel light without losing its warmth.',
    photos: [
      {
        src: '/images/cafe/islamabad-cafe-interior.jpg',
        alt: 'Colorful seating and warm wood in a contemporary Islamabad cafe.',
        caption: 'A room made for lingering · Islamabad',
        sourceUrl: 'https://www.pexels.com/photo/restaurant-ambiance-photography-27605498/',
      },
      {
        src: '/images/cafe/islamabad-cafe-counter.jpg',
        alt: 'A modern cafe counter with coffee equipment and display shelves in Islamabad.',
        caption: 'Behind the coffee counter · Islamabad',
        sourceUrl: 'https://www.pexels.com/photo/restaurant-ambiance-photography-27605493/',
      },
      {
        src: '/images/cafe/islamabad-cafe-coffee.jpg',
        alt: 'A glass of milky tea on a marble cafe table beside a yellow chair.',
        caption: 'Tea at the table',
        sourceUrl: 'https://www.pexels.com/photo/cozy-coffee-shop-scene-with-lattes-and-pastries-37456461/',
      },
    ],
    menu: [
      { id: 'coffee-tea', label: 'Coffee & tea', note: 'A considered first cup', items: [
        { id: 'flat-white', name: 'Flat white', description: 'Double espresso with a smooth layer of milk.', pricePkr: 520, photoIndex: 1, featured: true },
        { id: 'iced-coffee', name: 'Iced coffee', description: 'Chilled coffee served over ice.', pricePkr: 480, photoIndex: 2 },
        { id: 'karak-matcha', name: 'Green tea', description: 'A clean, gently brewed loose-leaf cup.', pricePkr: 360, photoIndex: 2 },
      ] },
      { id: 'breakfast', label: 'Breakfast', note: 'For mornings without a rush', items: [
        { id: 'eggs-toast', name: 'Soft eggs & toast', description: 'Soft eggs with sourdough-style toast and herbs.', pricePkr: 780, photoIndex: 0, featured: true },
        { id: 'granola', name: 'House granola bowl', description: 'Toasted oats, seasonal fruit and yoghurt.', pricePkr: 690, photoIndex: 0 },
        { id: 'avocado', name: 'Mushroom toast', description: 'Warm mushrooms over thick-cut toast.', pricePkr: 740, photoIndex: 0 },
      ] },
      { id: 'bakery', label: 'Bakery & cold drinks', note: 'A little something for later', items: [
        { id: 'croissant', name: 'Butter croissant', description: 'A crisp, flaky pastry for the table.', pricePkr: 390, photoIndex: 0 },
        { id: 'lemonade', name: 'Citrus cooler', description: 'Bright citrus, sparkling water and ice.', pricePkr: 430, photoIndex: 2 },
      ] },
    ],
  },
  {
    slug: 'restaurant', sectorLabel: 'Restaurant', businessName: 'Saffron & Slate',
    tagline: 'A table for the whole evening.', introduction: 'A cuisine-neutral restaurant concept with room for a seasonal menu, shared plates and the details that make dinner feel considered.',
    themeKey: 'restaurant', symbol: 'S&S', artCaption: 'Thoughtful plates, shared slowly', artDescription: 'A composed shared dinner plate with vegetables', exampleArea: 'Example area: Bahadurabad, Karachi', exampleHours: 'Example hours: 12 pm – 11 pm',
    atmosphere: 'A composed, candlelit editorial layout and slate-blue accents give the sample a sense of occasion while keeping every practical detail easy to scan.',
    photos: [
      {
        src: '/images/restaurant/dining-room-setting.jpg',
        alt: 'A carefully set restaurant table with plated dishes in a softly lit dining room.',
        caption: 'A table set for the evening',
        sourceUrl: 'https://www.pexels.com/photo/elegant-dining-setup-with-gourmet-dishes-39388294/',
      },
      {
        src: '/images/restaurant/karachi-dinner-spread.jpg',
        alt: 'A dinner spread of Pakistani dishes, naan, curry, rice and pasta in Karachi.',
        caption: 'A Karachi table, generously laid',
        sourceUrl: 'https://www.pexels.com/photo/delicious-pakistani-cuisine-spread-for-dinner-37898505/',
      },
      {
        src: '/images/restaurant/pakistani-biryani.jpg',
        alt: 'Pakistani biryani served with raita and salad on a table.',
        caption: 'Biryani, raita & salad',
        sourceUrl: 'https://www.pexels.com/photo/pasta-and-soup-18601877/',
      },
    ],
    menu: [
      { id: 'starters', label: 'To begin', note: 'A few things for the middle of the table', items: [
        { id: 'lentil-fritters', name: 'Crisp lentil fritters', description: 'Golden fritters with a bright, herb-led dip.', pricePkr: 560, photoIndex: 1 },
        { id: 'tomato-salad', name: 'Tomato & cucumber salad', description: 'Fresh-cut vegetables with a light citrus dressing.', pricePkr: 640, photoIndex: 0, featured: true },
        { id: 'roasted-carrots', name: 'Warm spiced carrots', description: 'Slow-roasted carrots with toasted seeds.', pricePkr: 590, photoIndex: 1 },
      ] },
      { id: 'mains', label: 'Mains', note: 'A considered centrepiece', items: [
        { id: 'slow-cooked', name: 'Slow-cooked seasonal special', description: 'A changing braise with a deeply savoury sauce.', pricePkr: 1480, photoIndex: 1, featured: true },
        { id: 'charred-vegetables', name: 'Charred vegetables & grains', description: 'Grilled seasonal vegetables with dressed grains.', pricePkr: 1120, photoIndex: 0 },
        { id: 'pan-fish', name: 'Pan-seared fish', description: 'A crisp-edged fillet with a lemon pan sauce.', pricePkr: 1690, photoIndex: 1 },
      ] },
      { id: 'rice-bread', label: 'Rice, bread & drinks', note: 'Made for passing around', items: [
        { id: 'saffron-rice', name: 'Fragrant rice', description: 'Long-grain rice finished with warm spices.', pricePkr: 420, photoIndex: 2 },
        { id: 'flatbread', name: 'House flatbread', description: 'Soft flatbread, served warm.', pricePkr: 190, photoIndex: 1 },
      ] },
    ],
  },
  {
    slug: 'bbq', sectorLabel: 'BBQ', businessName: 'Coal & Copper',
    tagline: 'Fire, smoke, then supper.', introduction: 'A charcoal-led BBQ concept with generous platters, a focused sides list and the theatre of cooking over open heat.',
    themeKey: 'bbq', symbol: 'C', artCaption: 'An ember-lit table, imagined', artDescription: 'Grilled kebab skewers above glowing charcoal', exampleArea: 'Example area: North Nazimabad, Karachi', exampleHours: 'Example hours: 6 pm – 12 am',
    atmosphere: 'Deep charcoal, ember-orange details and strong menu contrast create a bold grill-house identity grounded in Karachi street-grill references.',
    photos: [
      {
        src: '/images/bbq/karachi-bbq-kebabs.jpg',
        alt: 'Pakistani seekh kebabs and grilled chicken cooking on skewers at an outdoor market in Karachi.',
        caption: 'Kebabs over the coals · Karachi',
        sourceUrl: 'https://www.pexels.com/photo/delicious-pakistani-barbecue-kebabs-and-grilled-chicken-33617969/',
      },
      {
        src: '/images/bbq/karachi-bbq-karahi.jpg',
        alt: 'Cooks prepare karahi over open flames at a night-time street food stall in Karachi.',
        caption: 'Open-flame cooking · Karachi',
        sourceUrl: 'https://www.pexels.com/photo/street-chefs-cooking-karahi-in-karachi-night-scene-33617984/',
      },
      {
        src: '/images/bbq/seekh-kebab-grill.jpg',
        alt: 'Close-up of seekh kebabs grilling on skewers.',
        caption: 'Seekh kebabs on the grill',
        sourceUrl: 'https://www.pexels.com/photo/grilled-seekh-kebabs-on-skewers-close-up-37080242/',
      },
    ],
    menu: [
      { id: 'from-grill', label: 'From the grill', note: 'Charcoal-led sample plates', items: [
        { id: 'seekh', name: 'Seekh kebab plate', description: 'Grilled minced kebabs with a bright onion relish.', pricePkr: 920, photoIndex: 2, featured: true },
        { id: 'chicken-tikka', name: 'Tikka pieces', description: 'Charred chicken pieces with a citrus finish.', pricePkr: 840, photoIndex: 0 },
        { id: 'smoked-paneer', name: 'Smoky paneer skewers', description: 'Grilled paneer with peppers and a warm spice rub.', pricePkr: 780, photoIndex: 0 },
      ] },
      { id: 'platters', label: 'Platters', note: 'Made for passing around', items: [
        { id: 'coal-platter', name: 'Coal & Copper platter', description: 'A mixed grill with flatbread and two sample sides.', pricePkr: 2480, photoIndex: 0, featured: true },
        { id: 'family-grill', name: 'Table grill for two', description: 'A pair of grill favourites with rice and salad.', pricePkr: 1960, photoIndex: 1 },
      ] },
      { id: 'sides-sauces', label: 'Sides & sauces', note: 'The useful extras', items: [
        { id: 'charred-corn', name: 'Charred corn', description: 'Grilled corn with a lightly spiced butter.', pricePkr: 390, photoIndex: 1 },
        { id: 'green-chutney', name: 'Green herb chutney', description: 'A lively herb and green chilli dip.', pricePkr: 160, photoIndex: 0 },
      ] },
    ],
  },
  {
    slug: 'diner', sectorLabel: 'Diner', businessName: 'Sunday Service Diner',
    tagline: 'Breakfast can take its time.', introduction: 'A bright, all-day diner concept built for familiar breakfasts, stacked sandwiches and one more shake for the road.',
    themeKey: 'diner', symbol: 'SS', artCaption: 'All-day comfort, with a little colour', artDescription: 'A classic stacked burger with fries and a drink', exampleArea: 'Example area: Gulshan-e-Iqbal, Karachi', exampleHours: 'Example hours: 9 am – 10 pm',
    atmosphere: 'Confident tomato-red, chunky display type and a familiar burger-and-fries photo story give this all-day diner concept its own easygoing rhythm.',
    photos: [
      {
        src: '/images/diner/cheeseburger-hero.jpg',
        alt: 'A close-up cheeseburger with lettuce, cheese and sauce on a table.',
        caption: 'The house cheeseburger',
        sourceUrl: 'https://www.pexels.com/photo/a-delicious-burger-on-the-table-9188670/',
      },
      {
        src: '/images/diner/chicken-burger.jpg',
        alt: 'A chicken burger with lettuce and cheese against a dark background.',
        caption: 'Crispy chicken, cold drink',
        sourceUrl: 'https://www.pexels.com/photo/close-up-of-mouthwatering-hamburger-on-black-background-6850423/',
      },
      {
        src: '/images/diner/burger-and-fries.jpg',
        alt: 'A cheeseburger with lettuce and onions served alongside fries.',
        caption: 'Burger & fries, no rush',
        sourceUrl: 'https://www.pexels.com/photo/cheeseburger-with-lettuce-and-red-onions-6045438/',
      },
      {
        src: '/images/diner/all-day-breakfast.jpg',
        alt: 'An all-day breakfast of eggs, beans, toast and coffee served at a cafe.',
        caption: 'A generous all-day breakfast',
        sourceUrl: 'https://www.pexels.com/photo/delicious-english-breakfast-with-latte-at-cozy-cafe-32929205/',
      },
    ],
    menu: [
      { id: 'breakfast', label: 'Breakfast all day', note: 'Order of the morning, whenever', items: [
        { id: 'stack-pancakes', name: 'Buttermilk pancake stack', description: 'Fluffy pancakes with butter and date syrup.', pricePkr: 790, photoIndex: 3, featured: true },
        { id: 'diner-eggs', name: 'Two eggs & toast', description: 'Two eggs your way with toast and breakfast potatoes.', pricePkr: 720, photoIndex: 3 },
        { id: 'breakfast-sandwich', name: 'Breakfast sandwich', description: 'Egg, melted cheese and tomato on a toasted bun.', pricePkr: 680, photoIndex: 3 },
      ] },
      { id: 'burgers', label: 'Burgers & sandwiches', note: 'Good things between bread', items: [
        { id: 'classic-burger', name: 'The classic burger', description: 'Beef patty, lettuce, tomato and house-style sauce.', pricePkr: 1120, photoIndex: 0, featured: true },
        { id: 'crispy-chicken', name: 'Crispy chicken sandwich', description: 'Crunchy chicken with slaw on a soft roll.', pricePkr: 990, photoIndex: 1 },
        { id: 'grilled-cheese', name: 'Grilled cheese', description: 'A crisp, buttery toastie with melted cheese.', pricePkr: 760, photoIndex: 0 },
      ] },
      { id: 'sides-shakes', label: 'Sides & shakes', note: 'A small celebration', items: [
        { id: 'fries', name: 'Seasoned fries', description: 'Golden fries with a peppery house seasoning.', pricePkr: 420, photoIndex: 2 },
        { id: 'vanilla-shake', name: 'Vanilla milkshake', description: 'A thick vanilla shake, served cold.', pricePkr: 590, photoIndex: 1 },
      ] },
    ],
  },
];

export const getDemo = (slug: string | undefined) => demos.find((demo) => demo.slug === slug);
export const formatPrice = (amount: number) => `Rs ${amount.toLocaleString('en-PK')}`;
