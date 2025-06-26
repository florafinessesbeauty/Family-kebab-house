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
  withChips?: number;
  mealPrice?: number;
  isSpecial?: boolean;
  extras?: { [key: string]: number };

  // Optional nutrition fields:
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
  allergens?: string[] | string;
  ingredients?: string[] | string;
}

export const menuData: MenuItemData[] = [
  // 1) LUNCH TIME OFFERS (12:00–14:30)
  {
    id: "chicken-burger-chips-drink",
    name: "🍔 Chicken Burger – Chips & Drink",
    description: "Lunch Time Offer – includes chips & drink",
    category: "lunch-time-offers",
    singlePrice: 7.90,
    isSpecial: true,
  },
  {
    id: "quarter-pounder-cheese-chips-drink",
    name: "🍔 ¼ Pounder with Cheese – Chips & Drink",
    description: "Lunch Time Offer – includes chips & drink",
    category: "lunch-time-offers",
    singlePrice: 7.90,
    isSpecial: true,
  },
  {
    id: "half-pound-double-cheese-chips-drink",
    name: "🍔 ½ Pounder with Double Cheese – Chips & Drink",
    description: "Lunch Time Offer – includes chips & drink",
    category: "lunch-time-offers",
    singlePrice: 9.50,
    isSpecial: true,
  },
  {
    id: "medium-doner-meat-chips-drink",
    name: "🥙 Medium Doner Meat – Chips & Drink",
    description: "Lunch Time Offer – includes chips & drink",
    category: "lunch-time-offers",
    singlePrice: 7.90,
    isSpecial: true,
  },
  {
    id: "large-doner-meat-chips-drink",
    name: "🥙 Large Doner Meat – Chips & Drink",
    description: "Lunch Time Offer – includes chips & drink",
    category: "lunch-time-offers",
    singlePrice: 9.50,
    isSpecial: true,
  },
  {
    id: "pizza-12in-3toppings-drink",
    name: "🍕 12\" Margherita with 3 Toppings & Drink",
    description: "Lunch Time Offer – includes drink",
    category: "lunch-time-offers",
    price12inches: 12.50,
    isSpecial: true,
  },
  {
    id: "pizza-10in-3toppings-drink",
    name: "🍕 10\" Margherita with 3 Toppings & Drink",
    description: "Lunch Time Offer – includes drink",
    category: "lunch-time-offers",
    price10inches: 9.50,
    isSpecial: true,
  },

  // 2) BURGERS
  {
    id: "half-pound-double-cheese",
    name: "🍔 ½ Pound with Double Cheese",
    description: "Premium beef burger with double cheese and fresh salad",
    category: "burgers",
    priceSmall: 7.40,
    priceMedium: 10.70,
  },
  {
    id: "quarter-pounder-cheese",
    name: "🍔 ¼ Pounder with Cheese",
    description: "Fresh beef burger with cheese and choice of salad",
    category: "burgers",
    priceSmall: 5.50,
    priceMedium: 8.90,
  },
  {
    id: "chicken-fillet-burger",
    name: "🍔 Chicken Fillet Burger",
    description: "Tender chicken fillet with fresh salad",
    category: "burgers",
    priceSmall: 6.00,
    priceMedium: 9.40,
  },
  {
    id: "vegetable-burger",
    name: "🍔 Vegetable Burger",
    description: "Fresh vegetarian patty with salad",
    category: "burgers",
    priceSmall: 5.50,
    priceMedium: 8.90,
  },
  {
    id: "2oz-burger-cheese",
    name: "🍔 2 oz Burger with Cheese",
    description: "Small beef burger with cheese and fresh salad",
    category: "burgers",
    singlePrice: 3.50,
  },
  {
    id: "chicken-filled-wrap",
    name: "🌯 Chicken Filled Wrap",
    description: "Chicken wrap with fresh salad and sauce",
    category: "burgers",
    priceSmall: 6.50,
    priceMedium: 9.90,
  },
  {
    id: "half-chicken-filled-burger",
    name: "🍔 ½ Chicken Filled Burger",
    description: "Premium chicken burger with fresh ingredients",
    category: "burgers",
    priceSmall: 8.00,
    priceMedium: 11.50,
  },
  {
    id: "add-doner-on-burger",
    name: "🥙 Add Doner on Burger",
    description: "Extra doner meat for your burger",
    category: "burgers",
    singlePrice: 3.00,
  },

  // 3) FRIED CHICKEN
  {
    id: "1pc-chicken",
    name: "🍗 1 pc Chicken",
    description: "Crispy fried chicken piece",
    category: "fried-chicken",
    priceSmall: 1.90,
    priceMedium: 4.90,
    priceLarge: 5.90,
  },
  {
    id: "2pc-chicken",
    name: "🍗 2 pcs Chicken",
    description: "Two crispy fried chicken pieces",
    category: "fried-chicken",
    priceSmall: 3.80,
    priceMedium: 6.50,
    priceLarge: 7.50,
  },
  {
    id: "3pc-chicken",
    name: "🍗 3 pcs Chicken",
    description: "Three crispy fried chicken pieces",
    category: "fried-chicken",
    priceSmall: 5.60,
    priceMedium: 8.00,
    priceLarge: 9.00,
  },
  {
    id: "4pc-chicken",
    name: "🍗 4 pcs Chicken",
    description: "Four crispy fried chicken pieces",
    category: "fried-chicken",
    priceSmall: 6.50,
    priceMedium: 9.00,
    priceLarge: 10.00,
  },

  // 4) CHICKEN BARGAIN MEALS
  {
    id: "6pc-chicken-bargain",
    name: "🍗 6 pcs Chicken + 2 Chips & Coleslaw",
    description: "Value meal with chicken, chips and coleslaw",
    category: "chicken-bargain-meals",
    singlePrice: 14.00,
  },
  {
    id: "8pc-chicken-bargain",
    name: "🍗 8 pcs Chicken + 3 Chips & Coleslaw",
    description: "Large value meal with chicken, chips and coleslaw",
    category: "chicken-bargain-meals",
    singlePrice: 17.50,
  },

  // 5) CHICKEN WINGS & STRIPS
  {
    id: "4pc-spicy-wings",
    name: "🔥 4 pcs Spicy Wings",
    description: "Hot and spicy chicken wings",
    category: "chicken-wings-strips",
    priceSmall: 4.40,
    priceMedium: 6.90,
    priceLarge: 7.90,
  },
  {
    id: "8pc-spicy-wings",
    name: "🔥 8 pcs Spicy Wings",
    description: "Eight hot and spicy chicken wings",
    category: "chicken-wings-strips",
    priceSmall: 7.20,
    priceMedium: 9.70,
    priceLarge: 10.70,
  },
  {
    id: "6pc-chicken-strips",
    name: "🔥 6 pcs Chicken Strips",
    description: "Crispy chicken strips",
    category: "chicken-wings-strips",
    priceSmall: 6.90,
    priceMedium: 9.40,
    priceLarge: 10.40,
  },

  // 6) CHICKEN NUGGETS
  {
    id: "6pc-nuggets",
    name: "🍿 6 pcs Chicken Nuggets",
    description: "Golden crispy chicken nuggets",
    category: "chicken-nuggets",
    priceSmall: 4.00,
    priceMedium: 6.90,
    priceLarge: 7.90,
  },
  {
    id: "9pc-nuggets",
    name: "🍿 9 pcs Chicken Nuggets",
    description: "Nine golden crispy chicken nuggets",
    category: "chicken-nuggets",
    priceSmall: 5.20,
    priceMedium: 7.90,
    priceLarge: 8.90,
  },

  // 7) SCAMPI
  {
    id: "6pc-scampi",
    name: "🍤 6 pcs Scampi",
    description: "Breaded scampi pieces",
    category: "scampi",
    priceSmall: 4.00,
    priceMedium: 6.90,
    priceLarge: 7.90,
  },
  {
    id: "9pc-scampi",
    name: "🍤 9 pcs Scampi",
    description: "Nine breaded scampi pieces",
    category: "scampi",
    priceSmall: 5.20,
    priceMedium: 7.90,
    priceLarge: 8.90,
  },

  // 8) DESSERTS
  {
    id: "cheesecake",
    name: "🍰 Cheese Cake",
    description: "Rich and creamy cheesecake",
    category: "desserts",
    singlePrice: 3.00,
  },
  {
    id: "fudge-cake",
    name: "🍰 Fudge Cake",
    description: "Decadent chocolate fudge cake",
    category: "desserts",
    singlePrice: 3.00,
  },

  // 9) EXTRAS & SIDES
  {
    id: "small-sauce-pot",
    name: "🥄 Small Sauce Pot",
    description: "Small pot of sauce",
    category: "extras",
    singlePrice: 0.70,
  },
  {
    id: "large-sauce-pot",
    name: "🥄 Large Sauce Pot",
    description: "Large pot of sauce",
    category: "extras",
    singlePrice: 1.50,
  },
  {
    id: "chips-small",
    name: "🍟 Chips (Small)",
    description: "Small portion of chips",
    category: "extras",
    singlePrice: 3.00,
  },
  {
    id: "chips-large",
    name: "🍟 Chips (Large)",
    description: "Large portion of chips",
    category: "extras",
    singlePrice: 4.00,
  },
  {
    id: "chips-cheese-small",
    name: "🍟 Chips & Cheese (Small)",
    description: "Small chips with melted cheese",
    category: "extras",
    singlePrice: 4.50,
  },
  {
    id: "chips-cheese-large",
    name: "🍟 Chips & Cheese (Large)",
    description: "Large chips with melted cheese",
    category: "extras",
    singlePrice: 5.50,
  },
  {
    id: "onion-rings",
    name: "🍟 Onion Rings",
    description: "Crispy battered onion rings",
    category: "extras",
    singlePrice: 3.50,
  },
  {
    id: "mozzarella-sticks",
    name: "🧀 Mozzarella Sticks",
    description: "Breaded mozzarella cheese sticks",
    category: "extras",
    singlePrice: 4.50,
  },
  {
    id: "mixed-salad",
    name: "🥗 Mixed Salad",
    description: "Fresh mixed salad",
    category: "extras",
    singlePrice: 3.00,
  },
  {
    id: "pitta-bread",
    name: "🥙 Pitta Bread",
    description: "Fresh pitta bread",
    category: "extras",
    singlePrice: 1.50,
  },
  {
    id: "coleslaw",
    name: "🥗 Coleslaw",
    description: "Fresh coleslaw",
    category: "extras",
    singlePrice: 2.50,
  },
  {
    id: "potato-wedges",
    name: "🍟 Potato Wedges",
    description: "Seasoned potato wedges",
    category: "extras",
    singlePrice: 4.00,
  },
  {
    id: "garlic-mushrooms",
    name: "🍄 Garlic Mushrooms",
    description: "Sautéed garlic mushrooms",
    category: "extras",
    singlePrice: 3.50,
  },

  // 10) DRINKS
  {
    id: "soft-drink-can",
    name: "🥤 Soft Drink (Can)",
    description: "330ml can of soft drink",
    category: "drinks",
    singlePrice: 1.50,
  },
  {
    id: "soft-drink-bottle",
    name: "🥤 Soft Drink (Bottle)",
    description: "500ml bottle of soft drink",
    category: "drinks",
    singlePrice: 2.00,
  },
  {
    id: "water-bottle",
    name: "💧 Water (Bottle)",
    description: "500ml bottle of water",
    category: "drinks",
    singlePrice: 1.50,
  },

  // 11) KIDS MEALS
  {
    id: "kids-chicken-nuggets",
    name: "👶 Kids Chicken Nuggets",
    description: "4 nuggets with chips and drink",
    category: "kids-meals",
    singlePrice: 5.50,
  },
  {
    id: "kids-chicken-strips",
    name: "👶 Kids Chicken Strips",
    description: "3 chicken strips with chips and drink",
    category: "kids-meals",
    singlePrice: 6.00,
  },

  // 12) PIZZAS
  {
    id: "margherita-pizza",
    name: "🍕 Margherita",
    description: "Classic tomato and mozzarella pizza",
    category: "pizzas",
    price10inches: 8.00,
    price12inches: 10.00,
  },
  {
    id: "pepperoni-pizza",
    name: "🍕 Pepperoni",
    description: "Pepperoni and mozzarella pizza",
    category: "pizzas",
    price10inches: 9.40,
    price12inches: 12.40,
  },
  {
    id: "hawaiian-pizza",
    name: "🍕 Hawaiian",
    description: "Ham, pineapple and mozzarella pizza",
    category: "pizzas",
    price10inches: 9.40,
    price12inches: 12.40,
  },
  {
    id: "chicken-pizza",
    name: "🍕 Chicken",
    description: "Chicken pieces and mozzarella pizza",
    category: "pizzas",
    price10inches: 9.40,
    price12inches: 12.40,
  },
  {
    id: "meat-feast-pizza",
    name: "🍕 Meat Feast",
    description: "Pepperoni, ham, chicken and mozzarella pizza",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "vegetarian-pizza",
    name: "🍕 Vegetarian",
    description: "Mixed vegetables and mozzarella pizza",
    category: "pizzas",
    price10inches: 9.40,
    price12inches: 12.40,
  },

  // 13) GARLIC BREAD & PIZZA EXTRAS
  {
    id: "garlic-bread-small",
    name: "🧄 Garlic Bread (10\")",
    description: "Fresh garlic bread",
    category: "garlic-bread-pizza-extras",
    price10inches: 5.00,
  },
  {
    id: "garlic-bread-large",
    name: "🧄 Garlic Bread (12\")",
    description: "Large fresh garlic bread",
    category: "garlic-bread-pizza-extras",
    price12inches: 7.00,
  },
  {
    id: "pizza-topping",
    name: "🍕 Extra Pizza Topping",
    description: "Add any topping to your pizza",
    category: "garlic-bread-pizza-extras",
    price10inches: 1.40,
    price12inches: 1.80,
  },

  // 14) PIZZA OFFERS
  {
    id: "pizza-meal-deal",
    name: "🍕 Pizza Meal Deal",
    description: "Any 12\" pizza + chips + drink",
    category: "pizza-offers",
    singlePrice: 15.50,
    isSpecial: true,
  },

  // 15) FAMILY DEALS
  {
    id: "family-pizza-deal",
    name: "👨‍👩‍👧‍👦 Family Pizza Deal",
    description: "Two 12\" pizzas + large chips + 2 drinks",
    category: "family-deals",
    singlePrice: 28.90,
    isSpecial: true,
  },

  // 16) CHICKEN COMBO MEALS
  {
    id: "chicken-combo-3pc",
    name: "🍱 Chicken Combo (3 pcs + 4 Wings)",
    description: "3 pcs chicken + 4 spicy wings + chips + drink",
    category: "chicken-combo-meals",
    singlePrice: 11.50,
  },

  // 17) KEBABS
  {
    id: "doner-kebab",
    name: "🥙 Doner Kebab",
    description: "Traditional doner meat with fresh salad and sauce",
    category: "kebabs",
    priceMedium: 8.50,
    priceLarge: 10.50,
    priceXLarge: 12.50,
  },
  {
    id: "chicken-kebab",
    name: "🍗 Chicken Kebab",
    description: "Grilled chicken with fresh salad and sauce",
    category: "kebabs",
    priceMedium: 9.00,
    priceLarge: 11.00,
    priceXLarge: 13.00,
  },
  {
    id: "shish-kebab",
    name: "🍢 Shish Kebab",
    description: "Grilled lamb cubes with fresh salad and sauce",
    category: "kebabs",
    priceMedium: 9.50,
    priceLarge: 11.50,
    priceXLarge: 13.50,
  },
  {
    id: "kofte-kebab",
    name: "🥩 Kofte Kebab",
    description: "Spiced meatballs with fresh salad and sauce",
    category: "kebabs",
    priceMedium: 9.00,
    priceLarge: 11.00,
    priceXLarge: 13.00,
  },
  {
    id: "mixed-kebab",
    name: "🥙 Mixed Kebab",
    description: "Combination of doner and chicken with salad and sauce",
    category: "kebabs",
    priceMedium: 10.00,
    priceLarge: 12.50,
    priceXLarge: 16.50,
  },

  // 18) KEBAB EXTRAS
  {
    id: "kebab-feast",
    name: "🥙 Kebab Feast",
    description: "Doner, Shish, Chicken & Kofte kebabs with salad, pitta, sauces & chips",
    category: "kebab-extras",
    singlePrice: 30.00,
    isSpecial: true,
  },

  // 19) WRAPS
  {
    id: "doner-wrap",
    name: "🌯 Doner Wrap",
    description: "Doner meat wrapped with fresh salad and sauce",
    category: "wraps",
    priceMedium: 7.50,
    priceLarge: 9.50,
  },
  {
    id: "chicken-wrap",
    name: "🌯 Chicken Wrap",
    description: "Grilled chicken wrapped with fresh salad and sauce",
    category: "wraps",
    priceMedium: 8.00,
    priceLarge: 10.00,
  },
  {
    id: "shish-wrap",
    name: "🌯 Shish Wrap",
    description: "Grilled lamb wrapped with fresh salad and sauce",
    category: "wraps",
    priceMedium: 8.50,
    priceLarge: 10.50,
  },
  {
    id: "kofte-wrap",
    name: "🌯 Kofte Wrap",
    description: "Spiced meatballs wrapped with fresh salad and sauce",
    category: "wraps",
    priceMedium: 8.00,
    priceLarge: 10.00,
  },

  // 20) COMBINATION KEBABS
  {
    id: "doner-chicken-combo",
    name: "🥩 Doner & Chicken Combo",
    description: "Combination of doner and chicken kebab",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "doner-shish-combo",
    name: "🥩 Doner & Shish Combo",
    description: "Combination of doner and shish kebab",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "chicken-shish-combo",
    name: "🥩 Chicken & Shish Combo",
    description: "Combination of chicken and shish kebab",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "doner-kofte-combo",
    name: "🥩 Doner & Kofte Combo",
    description: "Combination of doner and kofte kebab",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "chicken-kofte-combo",
    name: "🥩 Chicken & Kofte Combo",
    description: "Combination of chicken and kofte kebab",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "shish-kofte-combo",
    name: "🥩 Shish & Kofte Combo",
    description: "Combination of shish and kofte kebab",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
];
