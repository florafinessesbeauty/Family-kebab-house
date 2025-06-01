export interface MenuItemData {
  id: string;
  name: string;
  description?: string;
  category: string;
  priceSmall?: number;
  priceMedium?: number;
  priceLarge?: number;
  priceXLarge?: number;
  price10inches?: number;
  price12inches?: number;
  singlePrice?: number;
  isSpecial?: boolean;
  withChips?: number;
  withDrink?: number;
  extras?: {
    skewer?: number;
    mozzarella?: number;
    special?: number;
    [key: string]: number | undefined;
  };
  extraPrice10inches?: number;
  extraPrice12inches?: number;
}

export const menuData: MenuItemData[] = [
  // KEBABS
  {
    id: "doner-kebab",
    name: "Doner Kebab",
    description: "FRESH Lamb doner SPECIALLY seasoned and Grilledon an upright spit",
    category: "kebabs",
    priceMedium: 7.90,
    priceLarge: 9.50,
    priceXLarge: 11.00,
  },
  {
    id: "shish-kebab",
    name: "Shish Kebab",
    description: "Tender lamb pieces marinated & grilled",
    category: "kebabs",
    priceMedium: 8.60,
    priceLarge: 12.00,
    priceXLarge: 15.50,
  },
  {
    id: "chicken-kebab",
    name: "Chicken Kebab",
    description: "Grilled chicken pieces",
    category: "kebabs",
    priceMedium: 8.20,
    priceLarge: 11.00,
    priceXLarge: 14.50,
  },
  {
    id: "kofte-kebab",
    name: "Kofte Kebab",
    description: "Seasoned mince lamb curry & herbs charcoal grill",
    category: "kebabs",
    priceMedium: 8.20,
    priceLarge: 11.00,
    priceXLarge: 14.50,
  },
  {
    id: "arda-mix",
    name: "Arda Mix",
    description: "Doner, chicken, shish kebab & kofte kebab",
    category: "kebabs",
    singlePrice: 17.50,
  },
  {
    id: "mixed-kebab",
    name: "Mixed Kebab",
    description: "Any 2 - shish kebab, kofte kebab",
    category: "kebabs",
    singlePrice: 15.00,
  },
  {
    id: "special-lamb-shish",
    name: "Special Lamb Shish",
    description: "Large lamb shish with fresh salad, onion & mushroom",
    category: "kebabs",
    singlePrice: 13.50,
  },
  {
    id: "special-chicken-kebab",
    name: "Special Chicken Kebab",
    description: "Large chicken kebab with fresh salad, onion & mushroom",
    category: "kebabs",
    singlePrice: 12.50,
  },
  {
    id: "halep-kebab",
    name: "Halep Kebab",
    description: "Chicken served with in a takeaway container over hot sliced pitta bread, covered with specially prepared sauce",
    category: "kebabs",
    singlePrice: 10.00,
  },
  {
    id: "adana",
    name: "Adana",
    description: "Minced meat served with in a takeaway container over hot sliced pitta bread, covered with specially prepared sauce",
    category: "kebabs",
    singlePrice: 12.00,
  },
  {
    id: "bursa",
    name: "Bursa",
    description: "Doner served with in a takeaway container over hot sliced pitta bread, covered with specially prepared sauce",
    category: "kebabs",
    singlePrice: 10.00,
  },
  {
    id: "kebab-feast",
    name: "Kebab Feast",
    description: "Doner Kebab + Shish Kebab + Chicken Kebab + Kofte Kebab in Large Container + Box Salad + 2x Pitta + 2x Sauces + 2x Drinks",
    category: "kebabs",
    singlePrice: 28.00,
    isSpecial: true,
  },  
{
  id: "doner-meat-chips",
  name: "Doner Meat & Chips",
  description: "Doner meat served with crispy chips",
  category: "kebabs",
  priceMedium: 7.90,
  priceLarge: 9.50,
},
{
  id: "doner-meat-chips-with-cheese",
  name: "Doner Meat & Chips with Cheese",
  description: "Doner meat & chips topped with melted cheese",
  category: "kebabs",
  priceMedium: 9.40,
  priceLarge: 11.00,
},
{
  id: "doner-meat-chips-salad",
  name: "Doner Meat Chips & Salad",
  description: "Doner meat & chips served with fresh salad",
  category: "kebabs",
  priceMedium: 8.60,
  priceLarge: 10.20,
},
{
  id: "doner-in-bun",
  name: "Doner in Bun",
  description: "Doner meat served in a freshly baked bun",
  category: "kebabs",
  priceMedium: 5.90,
},
{
  id: "box-doner",
  name: "Box Doner",
  description: "Doner served in a box with sides",
  category: "kebabs",
  priceMedium: 6.90,
  priceLarge: 8.90,
},


  // WRAPS
  {
    id: "lamb-doner-wrap",
    name: "Lamb Doner Wrap",
    category: "wraps",
    priceMedium: 7.90,
    priceLarge: 9.50,
  },
  {
    id: "chicken-kebab-wrap",
    name: "Chicken Kebab Wrap",
    category: "wraps",
    priceMedium: 8.20,
    priceLarge: 11.00,
  },
  {
    id: "kofte-kebab-wrap",
    name: "Kofte Kebab Wrap",
    category: "wraps",
    priceMedium: 8.20,
    priceLarge: 11.00,
  },
  {
    id: "shish-kebab-wrap",
    name: "Shish Kebab Wrap",
    category: "wraps",
    priceMedium: 8.60,
    priceLarge: 12.00,
  },
  {
    id: "combined-wrap",
    name: "Combined Wrap",
    description: "Any 2 - Chicken & shish / Kofte & Shish / Chicken & Kofte / Chicken & Doner / Doner & Shish / Kofte & Doner",
    category: "wraps",
    singlePrice: 11.50,
  },
  {
    id: "lamb-doner-chips-wrap",
    name: "Lamb Doner & Chips Wrap",
    category: "wraps",
    singlePrice: 8.50,
  },
  {
    id: "lamb-doner-cheese-wrap",
    name: "Lamb Doner & Cheese Wrap",
    category: "wraps",
    singlePrice: 9.50,
  },
  {
    id: "cheese-chips-wrap",
    name: "Cheese & Chips Wrap",
    category: "wraps",
    singlePrice: 5.20,
  },

 // COMBINATION KEBABS
{
  id: "chicken-shish",
  name: "Chicken & Shish",
  category: "combination-kebabs",
  singlePrice: 11.50,
  extras: {
    skewer: 6.00,       // Add 1 skewer for £6.00
    mozzarella: 1.50,   // Add mozzarella cheese extra for £1.50
    special: 1.50,      // Add special (mushroom, onion & green pepper) extra for £1.50
  },
},
{
  id: "kofte-shish",
  name: "Kofte & Shish",
  category: "combination-kebabs",
  singlePrice: 11.50,
  extras: {
    skewer: 6.00,
    mozzarella: 1.50,
    special: 1.50,
  },
},
{
  id: "chicken-kofte",
  name: "Chicken & Kofte",
  category: "combination-kebabs",
  singlePrice: 11.50,
  extras: {
    skewer: 6.00,
    mozzarella: 1.50,
    special: 1.50,
  },
},
{
  id: "chicken-doner",
  name: "Chicken & Doner",
  category: "combination-kebabs",
  singlePrice: 11.50,
  extras: {
    skewer: 6.00,
    mozzarella: 1.50,
    special: 1.50,
  },
},
{
  id: "doner-shish",
  name: "Doner & Shish",
  category: "combination-kebabs",
  singlePrice: 11.50,
  extras: {
    skewer: 6.00,
    mozzarella: 1.50,
    special: 1.50,
  },
},
{
  id: "kofte-doner",
  name: "Kofte & Doner",
  category: "combination-kebabs",
  singlePrice: 11.50,
  extras: {
    skewer: 6.00,
    mozzarella: 1.50,
    special: 1.50,
  },
},

  // PIZZAS
{
  id: "margherita-v",
  name: "Margherita V",
  description: "Mozzarella cheese & tomato sauce",
  category: "pizzas",
  price10inches: 8.00,
  price12inches: 10.00,
},
{
  id: "pepperoni",
  name: "Pepperoni",
  description: "Mozzarella cheese, tomato sauce & double pepperoni",
  category: "pizzas",
  price10inches: 9.40,
  price12inches: 12.40,
},
{
  id: "ham-pineapple",
  name: "Ham & Pineapple",
  description: "Mozzarella cheese, tomato sauce, ham & pineapple",
  category: "pizzas",
  price10inches: 9.40,
  price12inches: 12.40,
},
{
  id: "ham-mushroom",
  name: "ham & Mushroom",
  description: "Mozzarella cheese, tomato sauce, ham & mushroom",
  category: "pizzas",
  price10inches: 9.40,
  price12inches: 12.40,
},
{
  id: "chicken-sweetcorn",
  name: "Chicken & Sweetcorn",
  description: "Mozzarella cheese, tomato sauce, chicken & sweetcorn",
  category: "pizzas",
  price10inches: 9.40,
  price12inches: 12.40,
},
{
  id: "chicken-mushroom",
  name: "Chicken & Mushroom",
  description: "Mozzarella cheese, tomato sauce, chicken & mushroom",
  category: "pizzas",
  price10inches: 9.40,
  price12inches: 12.40,
},
{
  id: "americano",
  name: "Americano",
  description: "mozzarella cheese, tomato sauce, salami & sweetcorn",
  category: "pizzas",
  price10inches: 9.40,
  price12inches: 12.40,
},
{
  id: "pepperoni-plus",
  name: "pepperoni Plus",
  description: "Pepperoni, red onion & jalapeno",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "ham-supreme",
  name: "Ham supreme",  
  description: "ham, red onion & mushroom",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "chicken-supreme",
  name: "Chicken Supreme",
  description: "Chicken, red onion & mushroom",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "vegetarian-v",
  name: "Vegetarian V",
  description: "Mozzarella cheese, tomato sauce, onion, mushrooms, peppers, sweetcorn & pineapple",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "spicy-vegetarian-v",
  name: "Spicy Vegetarian V",
  description: "Mozzarella cheese, tomato sauce, onion, mushrooms, sweetcorn, jalapeno & fresh tomato",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "spicy-hot-one",
  name: "Spicy Hot One",
  description:
    "Mozzarella cheese & tomato sauce, pepperoni, spicy beef, onion, mushroom & jalapeno",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "seafood",
  name: "Seafood",
  description:
    "Mozzarella cheese, tomato sauce, prawns, tuna & anchovias",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "meat-specials",
  name: "Meat Special",
  description:
    "Mozzarella cheese, tomato sauce, ham, pepperoni, spicy beef & chicken",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "BBQ-pizza",
  name: "BBQ pizza",
  description:
    "mozzarella chesse,BBQ sauce, bacon, onion, chicken & green pepper",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "doner-pizza",
  name: "Doner Pizza",
  description:
    "mozzarella chesse, tomato sauce, onion, doner meat, fresh tomato",
  category: "pizzas",
  price10inches: 9.90,
  price12inches: 13.20,
},
{
  id: "garlic-bread-v",
  name: "Garlic Bread V",
  category: "pizzas",
  price10inches: 5.00,
  price12inches: 7.00
},
{
  id: "garlic-bread-cheese",
  name: "Garlic Bread with Cheese",
  category: "pizzas",
  price10inches: 7.00,
  price12inches: 9.00,
},
{
  id: "extra-toppings",
  name: "Extra Toppings",
  description:
    "Ham, chicken, pepperoni, spicy beef, tuna, prawns, olives, salami, sweetcorn, green peppers, mushroom, fresh tomato, red onion, pineapple",
  category: "pizzas",
  price10inches: 1.40,
  price12inches: 1.80,
},
{
  id: "stuffed-crust-extra",
  name: "Add Stuffed Crust",
  description:
    "Add extra cheese around the edges. For 10-inch pizzas, add £2.00 extra; for 12-inch pizzas, add £3.00 extra.",
  category: "pizza-extras",
  extraPrice10inches: 2.00,
  extraPrice12inches: 3.00,
},  

  // BURGERS
  {
    id: "half-pounder-double-cheese",
    name: "1/2 Pounder with Double Cheese",
    category: "burgers",
    singlePrice: 7.00,
    withChips: 9.70,
  },
  {
    id: "quarter-pounder-cheese",
    name: "1/4 Pounder with Cheese",
    category: "burgers",
    singlePrice: 5.20,
    withChips: 8.20,
  },
  {
    id: "chicken-fillet-burger",
    name: "Chicken Fillet Burger",
    category: "burgers",
    singlePrice: 5.20,
    withChips: 8.20,
  },
  {
    id: "vegetable-burger",
    name: "Vegetable Burger",
    category: "burgers",
    singlePrice: 5.20,
    withChips: 8.20,
  },
  {
    id: "6oz-burger-cheese",
    name: "2oz burger with cheese",
    category: "burgers",
    singlePrice: 3.50,
  },

  // FRIED CHICKEN
{
  id: "1pc-chicken",
  name: "1pc Chicken",
  category: "fried-chicken",
  singlePrice: 1.80,
  withChips: 4.20,
  withDrink: 5.20,
},
{
  id: "2pc-chicken",
  name: "2pc Chicken",
  category: "fried-chicken",
  singlePrice: 3.60,
  withChips: 6.00,
  withDrink: 7.00,
},
{
  id: "3pc-chicken",
  name: "3pc Chicken",
  category: "fried-chicken",
  singlePrice: 5.20,
  withChips: 7.20,
  withDrink: 8.20,
},
{
  id: "4pc-chicken",
  name: "4pc Chicken",
  category: "fried-chicken",
  singlePrice: 6.50,
  withChips: 8.50,
  withDrink: 9.50,
},

  // CHICKEN BARGAIN MEALS
  {
    id: "6pc-chicken-2chips-coleslaw",
    name: "6pc Chicken, 2 Chips & Coleslaw",
    category: "chicken-bargain",
    singlePrice: 13.00,
  },
  {
    id: "8pc-chicken-3chips-coleslaw",
    name: "8pc Chicken, 3 Chips & Coleslaw",
    category: "chicken-bargain",
    singlePrice: 16.00,
  },
  {
    id: "10pc-chicken-4chips-coleslaw",
    name: "10pc Chicken, 4 Chips & Coleslaw",
    category: "chicken-bargain",
    singlePrice: 19.00,
  },

  // CHICKEN WINGS
  {
    id: "4pc-spicy-wings",
    name: "4pcs Spicy wings",
    category: "wings",
    singlePrice: 3.80,
    withChips: 6.00,
  },
  {
    id: "8pcs-spicy-wings",
    name: "8pc Spicy Wings",
    category: "wings",
    singlePrice: 6.50,
    withChips: 8.70,
  },

  // CHICKEN NUGGETS
  {
    id: "6pcs-nuggets",
    name: "6pcs Nuggets",
    category: "nuggets",
    singlePrice: 3.80,
    withChips: 6.20,
  },
  {
    id: "9pcs-nuggets",
    name: "9pcs Nuggets",
    category: "nuggets",
    singlePrice: 4.90,
    withChips: 7.20,
  },

  // SCAMPI
  {
    id: "6pcs-scampi",
    name: "6pcs Scampi",
    category: "scampi",
    singlePrice: 3.80,
    withChips: 6.20,
  },
  {
    id: "9pcs-scampi",
    name: "9pcs Scampi",
    category: "scampi",
    singlePrice: 4.90,
    withChips: 7.20,
  },

  // EXTRAS
  {
    id: "pot-sauce",
    name: "Pot of Sauce",
    description: "Chili, Garlic, Ketchup, BBQ, Burger Sauce, Mayonnaise",
    category: "extras",
    priceSmall: 0.70,
    priceLarge: 1.50,
  },
  {
    id: "chips",
    name: "Chips",
    category: "extras",
    priceSmall: 2.50,
    priceLarge: 4.90,
  },
  {
    id: "chips-cheese",
    name: "Chips & Cheese",
    category: "extras",
    singlePrice: 3.90,
  },
  {
    id: "chips-pitta-cheese",
    name: "Chips in Pitta & Cheese",
    category: "extras",
    singlePrice: 3.20,
  },
  {
    id: "chips-doner-cheese",
    name: "Chips in Doner & Cheese",
    category: "extras",
    singlePrice: 5.50,
  },
  {
    id: "6pc-mozzarella-sticks",
    name: "6pc Mozzarella Sticks",
    category: "extras",
    singlePrice: 4.50,
  },
  {
    id: "salad-pitta",
    name: "Salad in Pitta",
    category: "extras",
    singlePrice: 2.50,
  },
  {
    id: "pitta-bread",
    name: "Pitta Bread",
    category: "extras",
    singlePrice: 2.50,
  },
  {
    id: "coleslaw",
    name: "Coleslaw",
    category: "extras",
    singlePrice: 2.00,
  },
  {
    id: "potato-wedges",
    name: "Potato Wedges",
    category: "extras",
    singlePrice: 1.20,
  },
  {
    id: "garlic-mushroom",
    name: "Garlic Mushroom",
    category: "extras",
    singlePrice: 3.50,
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    category: "extras",
    singlePrice: 1.20,
  },
  {
    id: "bottle-drinks",
    name: "Bottle of Drinks",
    category: "extras",
    singlePrice: 1.00,
  },
  {
    id: "water",
    name: "Water",
    category: "extras",
    singlePrice: 1.00,
  },

  // DESSERTS
  {
    id: "cheese-cake",
    name: "Cheese Cake",
    category: "desserts",
    singlePrice: 3.00,
  },
  {
    id: "fudge-cake",
    name: "Fudge Cake",
    category: "desserts",
    singlePrice: 3.00,
  },
  {
    id: "kids-meal",
    name: "Kids Meal",
    description: "4 Nuggets, Chips & Drink or 2oz Burger, Chips & Drink",
    category: "desserts",
    singlePrice: 5.50,
  },

  // MEAL DEALS
  {
    id: "pizza-offer-1",
    name: "Pizza Offer 1",
    description: "12\" Pizza from set menu",
    category: "meal-deals",
    singlePrice: 17.20,
    isSpecial: true,
  },
  {
    id: "pizza-offer-2",
    name: "Pizza Offer 2",
    description: "12\" Pizza from set menu",
    category: "meal-deals",
    singlePrice: 22.50,
    isSpecial: true,
  },
  // MEAL DEALS
{
  id: "family-deal-10",
  name: "Family Deal 10\"",
  description: "Family Deal 10\" inches pizza with 3 toppings, 6 pcs chicken nuggets, 1 chicken fillet burger, 2 pcs fried chicken, 2x chips, bottle of soft drink",
  category: "meal-deals",
  singlePrice: 24.90,
  isSpecial: true,
},
{
  id: "family-deal-12",
  name: "Family Deal 12\"",
  description: "Family Deal 12\" inches pizza with 3 toppings, 6 pcs chicken nuggets, 1 chicken fillet burger, 2 pcs fried chicken, 2x chips, bottle of soft drink",
  category: "meal-deals",
  singlePrice: 26.90,
  isSpecial: true,
},
{
  id: "chicken-combo-meal",
  name: "Chicken Combo Meal",
  description: "Chicken Combo Meal 3 pcs chicken, 4 spicy wings, with chips & drink",
  category: "meal-deals",
  singlePrice: 10.20,
  isSpecial: true,
},  
];

export const categories = [
  { id: "kebabs", name: "Kebabs", icon: "🔥" },
  { id: "wraps", name: "Wraps", icon: "🌯" },
  { id: "pizzas", name: "Pizzas", icon: "🍕" },
  { id: "burgers", name: "Burgers", icon: "🍔" },
  { id: "fried-chicken", name: "Fried Chicken", icon: "🍗" },
  { id: "wings", name: "Wings", icon: "🔥" },
  { id: "nuggets", name: "Nuggets", icon: "🍗" },
  { id: "scampi", name: "Scampi", icon: "🦐" },
  { id: "extras", name: "Extras", icon: "🍟" },
  { id: "desserts", name: "Desserts", icon: "🍰" },
  { id: "meal-deals", name: "Meal Deals", icon: "💝" },
];
