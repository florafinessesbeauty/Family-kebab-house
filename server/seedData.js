const MenuItem = require('./models/MenuItem');
const sequelize = require('./config/database');

// Sample menu items for the kebab shop
const sampleMenuItems = [
  {
    name: "Doner Kebab",
    logoEmoji: "🥙",
    description: "Traditional lamb doner with fresh salad and sauce",
    category: "kebabs",
    isSpecial: false,
    priceMedium: 8.50,
    priceLarge: 10.50,
    priceXLarge: 12.50
  },
  {
    name: "Chicken Kebab", 
    logoEmoji: "🍗",
    description: "Grilled chicken breast with fresh vegetables",
    category: "kebabs",
    isSpecial: false,
    priceMedium: 9.00,
    priceLarge: 11.00,
    priceXLarge: 13.00
  },
  {
    name: "Margherita Pizza",
    logoEmoji: "🍕", 
    description: "Fresh tomato sauce, mozzarella and basil",
    category: "pizzas",
    isSpecial: false,
    priceSmall: 8.00,
    priceLarge: 12.00
  },
  {
    name: "Chicken Burger",
    logoEmoji: "🍔",
    description: "Grilled chicken breast with lettuce and mayo",
    category: "burgers", 
    isSpecial: false,
    singlePrice: 6.50
  },
  {
    name: "Family Feast",
    logoEmoji: "👨‍👩‍👧‍👦",
    description: "Large doner, chicken kebab, 2 pizzas, chips and drinks",
    category: "specials",
    isSpecial: true,
    singlePrice: 30.00
  },
  {
    name: "Chips",
    logoEmoji: "🍟",
    description: "Fresh cut potato chips",
    category: "sides",
    isSpecial: false,
    priceSmall: 2.50,
    priceLarge: 4.00
  },
  {
    name: "Can of Drink",
    logoEmoji: "🥤",
    description: "Coca Cola, Pepsi, Sprite, Orange",
    category: "drinks",
    isSpecial: false,
    singlePrice: 1.50
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    
    console.log('Syncing database models...');
    await sequelize.sync({ force: true }); // This will drop and recreate tables
    
    console.log('Seeding menu items...');
    await MenuItem.bulkCreate(sampleMenuItems);
    
    console.log('Database seeded successfully!');
    console.log(`Created ${sampleMenuItems.length} menu items`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();