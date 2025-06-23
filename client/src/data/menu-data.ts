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
  extraPrice10inches?: number;
  extraPrice12inches?: number;
  singlePrice?: number;
  withChips?: number;
  mealPrice?: number;
  isSpecial?: boolean;
  extras?: {
    [key: string]: number;
  };
  // Nutritional information
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
  allergens?: string;
  ingredients?: string;
}

export const menuData: MenuItemData[] = [
  // LUNCH TIME OFFERS (Available 12:00 - 14:30)
  {
    id: "lunch-chicken-burger",
    name: "Chicken Burger + Chips & Drink",
    category: "lunch-offers",
    singlePrice: 7.90,
    isSpecial: true,
  },
  {
    id: "lunch-quarter-pounder",
    name: "1/4 Pounder with Cheese + Chips & Drink",
    category: "lunch-offers",
    singlePrice: 7.90,
    isSpecial: true,
  },
  {
    id: "lunch-half-pounder",
    name: "1/2 Pounder with Double Cheese + Chips & Drink",
    category: "lunch-offers",
    singlePrice: 9.50,
    isSpecial: true,
  },
  {
    id: "lunch-medium-doner",
    name: "Medium Doner Meat + Chips & Drink",
    category: "lunch-offers",
    singlePrice: 7.90,
    isSpecial: true,
  },
  {
    id: "lunch-large-doner",
    name: "Large Doner Meat + Chips & Drink",
    category: "lunch-offers",
    singlePrice: 9.50,
    isSpecial: true,
  },
  {
    id: "lunch-12inch-pizza",
    name: "12\" Margherita with 3 Toppings & Drink",
    category: "lunch-offers",
    singlePrice: 12.50,
    isSpecial: true,
  },
  {
    id: "lunch-10inch-pizza",
    name: "10\" Margherita with 3 Toppings & Drink",
    category: "lunch-offers",
    singlePrice: 9.50,
    isSpecial: true,
  },
  // BURGERS
  {
    id: "half-pounder-double-cheese",
    name: "½ Pound with Double Cheese",
    category: "burgers",
    singlePrice: 7.40,
    mealPrice: 10.70,
  },
  {
    id: "quarter-pounder-cheese",
    name: "¼ Pounder with Cheese",
    category: "burgers",
    singlePrice: 5.50,
    mealPrice: 8.90,
  },
  {
    id: "chicken-fillet-burger",
    name: "Chicken Fillet Burger",
    category: "burgers",
    singlePrice: 6.00,
    mealPrice: 9.40,
  },
  {
    id: "vegetable-burger",
    name: "Vegetable Burger",
    category: "burgers",
    singlePrice: 5.50,
    mealPrice: 8.90,
  },
  {
    id: "2oz-burger-cheese",
    name: "2 oz Burger with Cheese",
    category: "burgers",
    singlePrice: 3.50,
  },
  {
    id: "chicken-fillet-wrap",
    name: "Chicken Fillet Wrap",
    category: "burgers",
    singlePrice: 6.50,
    mealPrice: 9.90,
  },
  {
    id: "half-chicken-fillet-burger",
    name: "½ Chicken Fillet Burger",
    category: "burgers",
    singlePrice: 8.00,
    mealPrice: 11.50,
  },

  // FRIED CHICKEN
  {
    id: "1pc-chicken",
    name: "1 pc",
    category: "fried-chicken",
    singlePrice: 1.90,
    withChips: 4.90,
    mealPrice: 5.90,
  },
  {
    id: "2pc-chicken",
    name: "2 pc",
    category: "fried-chicken",
    singlePrice: 3.80,
    withChips: 6.50,
    mealPrice: 7.50,
  },
  {
    id: "3pc-chicken",
    name: "3 pc",
    category: "fried-chicken",
    singlePrice: 5.60,
    withChips: 8.00,
    mealPrice: 9.00,
  },
  {
    id: "4pc-chicken",
    name: "4 pc",
    category: "fried-chicken",
    singlePrice: 6.50,
    withChips: 9.00,
    mealPrice: 10.00,
  },

  // CHICKEN BARGAIN MEALS
  {
    id: "6pc-chicken-bargain",
    name: "6 pcs Chicken + 2 Chips & Coleslaw",
    category: "chicken-bargain",
    mealPrice: 14.00,
  },
  {
    id: "8pc-chicken-bargain",
    name: "8 pcs Chicken + 3 Chips & Coleslaw",
    category: "chicken-bargain",
    mealPrice: 17.50,
  },

  // CHICKEN WINGS & STRIPS
  {
    id: "4pc-spicy-wings",
    name: "4 pcs Spicy Wings",
    category: "wings",
    singlePrice: 4.40,
    withChips: 6.90,
    mealPrice: 7.90,
  },
  {
    id: "8pc-spicy-wings",
    name: "8 pcs Spicy Wings",
    category: "wings",
    singlePrice: 7.20,
    withChips: 9.70,
    mealPrice: 10.70,
  },
  {
    id: "6pc-chicken-strips",
    name: "6 pcs Chicken Strips",
    category: "wings",
    singlePrice: 6.90,
    withChips: 9.40,
    mealPrice: 10.40,
  },

  // CHICKEN NUGGETS
  {
    id: "6pc-nuggets",
    name: "6 pcs NUGGETS",
    category: "nuggets",
    singlePrice: 4.00,
    withChips: 6.90,
    mealPrice: 7.90,
  },
  {
    id: "9pc-nuggets",
    name: "9 pcs NUGGETS",
    category: "nuggets",
    singlePrice: 5.20,
    withChips: 7.90,
    mealPrice: 8.90,
  },

  // SCAMPI
  {
    id: "6pc-scampi",
    name: "6 pcs Scampi",
    category: "scampi",
    singlePrice: 4.00,
    withChips: 6.90,
    mealPrice: 7.90,
  },
  {
    id: "9pc-scampi",
    name: "9 pcs Scampi",
    category: "scampi",
    singlePrice: 5.20,
    withChips: 7.90,
    mealPrice: 8.90,
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

  // EXTRAS
  {
    id: "sauce-small",
    name: "Small pot of sauce",
    description: "Chilli, Garlic, Ketchup, BBQ, Burger Sauce, Mayonnaise",
    category: "extras",
    singlePrice: 0.70,
  },
  {
    id: "sauce-large",
    name: "Large pot of sauce",
    description: "Chilli, Garlic, Ketchup, BBQ, Burger Sauce, Mayonnaise",
    category: "extras",
    singlePrice: 1.50,
  },
  {
    id: "chips-small",
    name: "Chips",
    category: "extras",
    priceSmall: 3.00,
    priceLarge: 4.00,
  },
  {
    id: "chips-cheese",
    name: "Chips & Cheese",
    category: "extras",
    priceSmall: 4.50,
    priceLarge: 5.50,
  },
  {
    id: "chips-pitta",
    name: "Chips in Pitta",
    category: "extras",
    singlePrice: 4.20,
  },
  {
    id: "chips-pitta-cheese",
    name: "Chips in Pitta & Cheese",
    category: "extras",
    singlePrice: 5.90,
  },
  {
    id: "onion-rings",
    name: "8 pcs Onion Rings",
    category: "extras",
    singlePrice: 3.50,
  },
  {
    id: "mozzarella-sticks",
    name: "6pcs MOZZARELLA STICKS",
    category: "extras",
    singlePrice: 5.20,
  },
  {
    id: "salad-pitta",
    name: "Salad in Pitta",
    category: "extras",
    priceSmall: 4.50,
    priceLarge: 5.50,
  },
  {
    id: "box-salad",
    name: "Box Salad",
    category: "extras",
    priceSmall: 3.50,
    priceLarge: 4.50,
  },
  {
    id: "pitta-bread",
    name: "Pitta Bread",
    category: "extras",
    singlePrice: 1.00,
  },
  {
    id: "coleslaw",
    name: "Coleslaw",
    category: "extras",
    singlePrice: 2.50,
  },
  {
    id: "potato-wedges",
    name: "Potato Wedges",
    category: "extras",
    singlePrice: 3.50,
  },
  {
    id: "garlic-mushroom",
    name: "Garlic Mushroom",
    category: "extras",
    singlePrice: 4.50,
  },

  // DRINKS
  {
    id: "cans",
    name: "Cans",
    category: "drinks",
    singlePrice: 1.40,
  },
  {
    id: "bottle-drinks",
    name: "Bottle of Drinks",
    category: "drinks",
    singlePrice: 3.50,
  },
  {
    id: "water",
    name: "Water",
    category: "drinks",
    singlePrice: 1.00,
  },

  // KIDS MEAL
  {
    id: "kids-nuggets",
    name: "4 Nuggets + Chips & Drink",
    category: "kids",
    singlePrice: 6.20,
  },
  {
    id: "kids-burger",
    name: "2 oz Burger + Chips & Drink",
    category: "kids",
    singlePrice: 6.20,
  },

  // PIZZAS
  {
    id: "margherita",
    name: "Margherita",
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
    name: "Ham & Mushroom",
    description: "Mozzarella cheese, tomato sauce, ham & mushroom",
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
    id: "chicken-sweetcorn",
    name: "Chicken & Sweetcorn",
    description: "Mozzarella cheese, tomato sauce, chicken & sweetcorn",
    category: "pizzas",
    price10inches: 9.40,
    price12inches: 12.40,
  },
  {
    id: "americano",
    name: "Americano",
    description: "Mozzarella cheese, tomato sauce, salami & sweetcorn",
    category: "pizzas",
    price10inches: 9.40,
    price12inches: 12.40,
  },
  {
    id: "pepperoni-plus",
    name: "Pepperoni Plus",
    description: "Mozzarella cheese, tomato sauce, pepperoni, red onion & jalapeño",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "ham-supreme",
    name: "Ham Supreme",
    description: "Mozzarella cheese, tomato sauce, mushroom, ham & red onion",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "chicken-supreme",
    name: "Chicken Supreme",
    description: "Mozzarella cheese, tomato sauce, mushroom, chicken & red onion",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "vegetarian",
    name: "Vegetarian V",
    description: "Mozzarella cheese, tomato sauce, onion, mushroom, peppers, sweetcorn & pineapple",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "spicy-vegetarian",
    name: "Spicy Vegetarian V",
    description: "Mozzarella cheese, tomato sauce, onion, mushroom, jalapeño, sweetcorn & fresh tomato",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "spicy-hot-one",
    name: "Spicy Hot One",
    description: "Mozzarella cheese, tomato sauce, pepperoni, spicy beef, onion, mushroom & jalapeño",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "seafood",
    name: "Seafood",
    description: "Mozzarella cheese, tomato sauce, prawns, tuna & anchovies",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "meat-specials",
    name: "Meat Specials",
    description: "Mozzarella cheese, tomato sauce, ham, pepperoni, spicy beef & chicken",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "bbq-pizza",
    name: "BBQ Pizza",
    description: "Mozzarella cheese, BBQ sauce, bacon, onion, chicken & green peppers",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },
  {
    id: "doner-pizza",
    name: "Doner Pizza",
    description: "Mozzarella cheese, tomato sauce, onion, doner meat & fresh tomato",
    category: "pizzas",
    price10inches: 9.90,
    price12inches: 13.20,
  },

  // GARLIC BREAD & EXTRAS
  {
    id: "garlic-bread",
    name: "Garlic Bread V",
    category: "garlic-bread",
    price10inches: 5.00,
    price12inches: 7.00,
  },
  {
    id: "garlic-bread-cheese",
    name: "Garlic Bread with Cheese",
    category: "garlic-bread",
    price10inches: 7.00,
    price12inches: 9.00,
  },
  {
    id: "stuffed-crust-cheese",
    name: "Stuffed Crust Cheese",
    category: "garlic-bread",
    price10inches: 2.00,
    price12inches: 3.00,
  },
  {
    id: "extra-topping",
    name: "Extra Topping (each)",
    category: "garlic-bread",
    price10inches: 1.40,
    price12inches: 1.80,
  },

  // PIZZA OFFERS
  {
    id: "pizza-offer-1",
    name: "Offer 1: 2× 10″ pizzas from set-menu",
    category: "pizza-offers",
    singlePrice: 17.20,
    isSpecial: true,
  },
  {
    id: "pizza-offer-2",
    name: "Offer 2: 2× 12″ pizzas from set-menu",
    category: "pizza-offers",
    singlePrice: 22.50,
    isSpecial: true,
  },

  // FAMILY DEAL
  {
    id: "family-deal-10",
    name: "Family Deal (10″ Pizza)",
    description: "10″ pizza with 3 toppings + 6 pcs chicken nuggets + 1 chicken fillet burger + 2 pcs fried chicken + 2× chips + 1 bottle of soft drink",
    category: "family-deals",
    singlePrice: 26.90,
    isSpecial: true,
  },
  {
    id: "family-deal-12",
    name: "Family Deal (12″ Pizza)",
    description: "12″ pizza with 3 toppings + 6 pcs chicken nuggets + 1 chicken fillet burger + 2 pcs fried chicken + 2× chips + 1 bottle of soft drink",
    category: "family-deals",
    singlePrice: 28.90,
    isSpecial: true,
  },

  // CHICKEN COMBO MEAL
  {
    id: "chicken-combo-meal",
    name: "Chicken Combo Meal",
    description: "3 pcs chicken + 4 spicy wings + chips & drink",
    category: "combo-meals",
    singlePrice: 11.50,
    isSpecial: true,
  },

  // KEBABS
  {
    id: "doner-kebab",
    name: "Doner Kebab",
    description: "Fresh lamb, specially seasoned and grilled on an upright spit",
    category: "kebabs",
    priceMedium: 8.50,
    priceLarge: 10.50,
    priceXLarge: 12.50,
  },
  {
    id: "shish-kebab",
    name: "Shish Kebab",
    description: "Fresh fillet of diced lamb, marinated in oriental herbs, barbecued on a flame grill",
    category: "kebabs",
    priceMedium: 9.50,
    priceLarge: 13.50,
    priceXLarge: 17.50,
  },
  {
    id: "chicken-kebab",
    name: "Chicken Kebab",
    description: "Breast of chicken, marinated & barbecued on a flame grill",
    category: "kebabs",
    priceMedium: 9.00,
    priceLarge: 12.50,
    priceXLarge: 16.50,
  },
  {
    id: "kofte-kebab",
    name: "Kofte Kebab",
    description: "Minced fresh lamb with parsley & oriental herbs, barbecued on a flame grill",
    category: "kebabs",
    priceMedium: 9.00,
    priceLarge: 12.50,
    priceXLarge: 16.50,
  },
  {
    id: "arda-mix",
    name: "Arda Mix",
    description: "Chicken, lamb shish, doner & kofte",
    category: "kebabs",
    priceXLarge: 19.00,
  },
  {
    id: "mixed-kebab",
    name: "Mixed Kebab",
    description: "Consisting of doner kebab, shish kebab & kofte kebab",
    category: "kebabs",
    priceXLarge: 16.50,
  },
  {
    id: "special-lamb-shish",
    name: "Special Lamb Shish",
    description: "Specially cut fresh diced lamb, marinated & barbecued with green pepper, onion & mushroom",
    category: "kebabs",
    priceLarge: 15.00,
  },
  {
    id: "special-chicken-kebab",
    name: "Special Chicken Kebab",
    description: "Specially cut chicken breast, marinated & barbecued with green peppers, onion & mushroom",
    category: "kebabs",
    priceLarge: 14.00,
  },
  {
    id: "halep-kebab",
    name: "Half Kebab",
    description: "Doner kebab served in a takeaway container over hot sliced pitta with onion, topped with special sauce",
    category: "kebabs",
    priceLarge: 11.50,
  },
  {
    id: "adana",
    name: "Adana",
    description: "Kofte kebab served in a takeaway container over hot sliced pitta bread with onion, topped with special sauce",
    category: "kebabs",
    priceLarge: 13.50,
  },
  {
    id: "bursa",
    name: "Bursa",
    description: "Doner kebab served in a takeaway container over hot sliced pitta bread with yoghurt, topped with special sauce",
    category: "kebabs",
    singlePrice: 11.50,
  },
  {
    id: "doner-meat-chips",
    name: "Doner Meat & Chips",
    category: "kebabs",
    priceMedium: 8.50,
    priceLarge: 10.50,
  },
  {
    id: "doner-meat-chips-cheese",
    name: "Doner Meat & Chips with Cheese",
    category: "kebabs",
    priceMedium: 10.00,
    priceLarge: 12.00,
  },
  {
    id: "doner-meat-chips-salad",
    name: "Doner Meat & Chips & Salad",
    category: "kebabs",
    priceMedium: 9.50,
    priceLarge: 11.50,
  },
  {
    id: "doner-in-bun",
    name: "Doner in Bun",
    category: "kebabs",
    priceMedium: 6.50,
  },
  {
    id: "box-doner",
    name: "Box Doner",
    category: "kebabs",
    priceMedium: 7.00,
    priceLarge: 9.00,
  },

  // KEBAB FEAST
  {
    id: "kebab-feast",
    name: "Kebab Feast",
    description: "Doner kebab, shish kebab, chicken & kofte kebabs in a large container, plus box salad, 3× pitta, 2× sauce pots & 1× large chips",
    category: "kebab-specials",
    singlePrice: 30.00,
    isSpecial: true,
  },

  // WRAPS
  {
    id: "lamb-doner-wrap",
    name: "Lamb Doner Wrap",
    category: "wraps",
    priceMedium: 8.50,
    priceLarge: 10.50,
  },
  {
    id: "chicken-kebab-wrap",
    name: "Chicken Kebab Wrap",
    category: "wraps",
    priceMedium: 9.00,
    priceLarge: 12.50,
  },
  {
    id: "kofte-kebab-wrap",
    name: "Kofte Kebab Wrap",
    category: "wraps",
    priceMedium: 9.00,
    priceLarge: 12.50,
  },
  {
    id: "shish-kebab-wrap",
    name: "Shish Kebab Wrap",
    category: "wraps",
    priceMedium: 9.50,
    priceLarge: 13.50,
  },
  {
    id: "combined-wrap",
    name: "Combined Wrap",
    description: "Chicken & Shish/ Kofte & Shish/ Chicken & Kofte/ Chicken & Doner/ Doner & Shish/ Kofte & Doner (choose any two fillings)",
    category: "wraps",
    singlePrice: 13.00,
  },
  {
    id: "lamb-doner-chips-wrap",
    name: "Lamb Doner & Chips Wrap",
    category: "wraps",
    priceMedium: 9.00,
    priceLarge: 11.00,
  },
  {
    id: "lamb-doner-cheese-wrap",
    name: "Lamb Doner & Cheese Wrap",
    category: "wraps",
    priceMedium: 9.50,
    priceLarge: 11.50,
  },
  {
    id: "cheese-chips-wrap",
    name: "Cheese & Chips Wrap",
    category: "wraps",
    priceMedium: 5.90,
    priceLarge: 6.90,
  },

  // COMBINATION KEBABS
  {
    id: "chicken-shish-combo",
    name: "Chicken & Shish",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "kofte-shish-combo",
    name: "Kofte & Shish",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "chicken-kofte-combo",
    name: "Chicken & Kofte",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "chicken-doner-combo",
    name: "Chicken & Lamb Doner",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "lamb-doner-shish-combo",
    name: "Lamb Doner & Shish",
    category: "combination-kebabs",
    singlePrice: 13.00,
  },
  {
    id: "kofte-doner-combo",
    name: "Kofte & Lamb Doner",
    category: "combination-kebabs",
    singlePrice: 13.00,
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
    description: "2 x 10\" from set menu",
    category: "meal-deals",
    singlePrice: 17.20,
    isSpecial: true,
  },
  {
    id: "pizza-offer-2",
    name: "Pizza Offer 2",
    description: "2 x 12\" from set menu",
    category: "meal-deals",
    singlePrice: 22.50,
    isSpecial: true,
  },
  {
    id: "family-deal",
    name: "Family Deal",
    description:
      "Family Deal 10\"/12\" inches pizza with 3 toppings, 6 pcs chicken nuggets, 1 chicken fillet burger, 2 pcs fried chicken, 2x chips, bottle of soft drink",
    category: "meal-deals",
    price10inches: 24.90,
    price12inches: 26.90,
    isSpecial: true,
  },
  {
    id: "chicken-combo-meal",
    name: "Chicken Combo Meal",
    description:
      "Chicken Combo Meal 3 pcs chicken, 4 spicy wings, with chips & drink",
    category: "meal-deals",
    singlePrice: 10.20,
    isSpecial: true,
  }
];

export const categories = [
  { id: "kebabs", name: "Kebabs", icon: "🔥" },
  { id: "combination-kebabs", name: "Combination Kebabs", icon: "🥩" },
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
