// client/src/components/meal-builder.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, ShoppingBasket, Utensils } from 'lucide-react';
import { useBasket } from '@/hooks/use-basket';
import { toast } from '@/hooks/use-toast';

interface MealComponent {
  id: string;
  name: string;
  category: 'main' | 'side' | 'drink' | 'extra';
  price: number;
  emoji: string;
  description?: string;
}

interface CustomMeal {
  main: MealComponent | null;
  sides: MealComponent[];
  drink: MealComponent | null;
  extras: MealComponent[];
}

export default function MealBuilder() {
  const [customMeal, setCustomMeal] = useState<CustomMeal>({
    main: null,
    sides: [],
    drink: null,
    extras: []
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const { addItem } = useBasket();

  // 1) All possible meal parts - Authentic Family Kebab House Menu
  const mealComponents: MealComponent[] = [
    // -- Main Courses --
    // Kebabs
    { id: 'doner-kebab-med',    name: '🥙 Doner Kebab (Medium)',    category: 'main', price: 8.50, emoji: '🥙', description: 'Traditional doner meat with salad' },
    { id: 'doner-kebab-large',  name: '🥙 Doner Kebab (Large)',     category: 'main', price: 10.50, emoji: '🥙', description: 'Large portion doner with salad' },
    { id: 'chicken-kebab-med',  name: '🍗 Chicken Kebab (Medium)',  category: 'main', price: 9.00, emoji: '🍗', description: 'Grilled chicken with fresh salad' },
    { id: 'chicken-kebab-large', name: '🍗 Chicken Kebab (Large)',  category: 'main', price: 10.50, emoji: '🍗', description: 'Large grilled chicken with salad' },
    { id: 'mixed-kebab-med',    name: '🥙 Mixed Kebab (Medium)',     category: 'main', price: 10.00, emoji: '🥙', description: 'Doner and chicken combination' },
    { id: 'mixed-kebab-large',  name: '🥙 Mixed Kebab (Large)',     category: 'main', price: 12.50, emoji: '🥙', description: 'Large mixed doner and chicken' },
    { id: 'shish-kebab',        name: '🍢 Shish Kebab',             category: 'main', price: 11.50, emoji: '🍢', description: 'Grilled lamb shish with salad' },
    { id: 'kofte-kebab',        name: '🥩 Kofte Kebab',             category: 'main', price: 11.00, emoji: '🥩', description: 'Spiced lamb kofte with salad' },
    { id: 'adana-kebab',        name: '🌶️ Adana Kebab',             category: 'main', price: 12.00, emoji: '🌶️', description: 'Spicy minced lamb kebab' },
    
    // Burgers
    { id: 'chicken-burger',     name: '🍔 Chicken Burger',          category: 'main', price: 3.50, emoji: '🍔', description: '2oz chicken burger with cheese' },
    { id: 'quarter-pounder',    name: '🍔 ¼ Pounder with Cheese',   category: 'main', price: 4.20, emoji: '🍔', description: 'Beef burger with cheese' },
    { id: 'beef-burger-cheese', name: '🍔 Beef Burger with Cheese', category: 'main', price: 4.50, emoji: '🍔', description: 'Classic beef burger with cheese' },
    
    // Fried Chicken
    { id: 'fried-chicken-1pc',  name: '🍗 1pc Fried Chicken',       category: 'main', price: 2.00, emoji: '🍗', description: 'Single piece fried chicken' },
    { id: 'fried-chicken-2pc',  name: '🍗 2pc Fried Chicken',       category: 'main', price: 3.50, emoji: '🍗', description: 'Two pieces fried chicken' },
    { id: 'fried-chicken-3pc',  name: '🍗 3pc Fried Chicken',       category: 'main', price: 5.00, emoji: '🍗', description: 'Three pieces fried chicken' },
    { id: 'fried-chicken-4pc',  name: '🍗 4pc Fried Chicken',       category: 'main', price: 6.50, emoji: '🍗', description: 'Four pieces fried chicken' },
    
    // Wings & Strips
    { id: 'chicken-wings-6pc',  name: '🔥 6pc Chicken Wings',       category: 'main', price: 4.50, emoji: '🔥', description: 'Spicy chicken wings' },
    { id: 'chicken-strips-3pc', name: '🍗 3pc Chicken Strips',      category: 'main', price: 4.00, emoji: '🍗', description: 'Crispy chicken strips' },
    
    // Nuggets
    { id: 'nuggets-6pc',        name: '🍿 6pc Nuggets',             category: 'main', price: 3.50, emoji: '🍿', description: 'Crispy chicken nuggets' },
    { id: 'nuggets-9pc',        name: '🍿 9pc Nuggets',             category: 'main', price: 4.50, emoji: '🍿', description: 'Nine piece nuggets' },
    
    // Pizzas
    { id: 'pizza-margherita-10', name: '🍕 10" Margherita Pizza',    category: 'main', price: 9.50, emoji: '🍕', description: 'Classic pizza with fresh basil' },
    { id: 'pizza-margherita-12', name: '🍕 12" Margherita Pizza',    category: 'main', price: 11.90, emoji: '🍕', description: 'Large margherita pizza' },
    { id: 'pizza-pepperoni-10', name: '🍕 10" Pepperoni Pizza',     category: 'main', price: 10.90, emoji: '🍕', description: 'Pepperoni pizza' },
    { id: 'pizza-pepperoni-12', name: '🍕 12" Pepperoni Pizza',     category: 'main', price: 13.70, emoji: '🍕', description: 'Large pepperoni pizza' },
    
    // Scampi
    { id: 'scampi-5pc',         name: '🍤 5pc Scampi',              category: 'main', price: 4.50, emoji: '🍤', description: 'Breaded scampi pieces' },
    { id: 'scampi-9pc',         name: '🍤 9pc Scampi',              category: 'main', price: 7.50, emoji: '🍤', description: 'Nine piece scampi' },
    
    // Wraps
    { id: 'chicken-wrap',       name: '🌯 Chicken Wrap',            category: 'main', price: 6.50, emoji: '🌯', description: 'Grilled chicken wrap with salad' },
    { id: 'doner-wrap',         name: '🌯 Doner Wrap',              category: 'main', price: 6.00, emoji: '🌯', description: 'Doner meat wrap with salad' },
    
    // -- Sides --
    { id: 'chips-regular',      name: '🍟 Regular Chips',           category: 'side', price: 3.00, emoji: '🍟', description: 'Golden crispy chips' },
    { id: 'chips-large',        name: '🍟 Large Chips',             category: 'side', price: 4.50, emoji: '🍟', description: 'Extra portion of chips' },
    { id: 'chips-extra-large',  name: '🍟 Extra Large Chips',       category: 'side', price: 5.50, emoji: '🍟', description: 'Family size portion' },
    { id: 'coleslaw',           name: '🥗 Coleslaw',                category: 'side', price: 2.50, emoji: '🥗', description: 'Fresh homemade coleslaw' },
    { id: 'onion-rings-4pc',    name: '🧅 4pc Onion Rings',         category: 'side', price: 2.50, emoji: '🧅', description: 'Crispy battered onion rings' },
    { id: 'garlic-bread',       name: '🍞 Garlic Bread',            category: 'side', price: 3.00, emoji: '🍞', description: 'Warm garlic bread slices' },
    { id: 'pitta-bread',        name: '🫓 Pitta Bread',             category: 'side', price: 1.50, emoji: '🫓', description: 'Fresh pitta bread' },
    
    // -- Drinks --
    { id: 'coke-can',           name: '🥤 Coca Cola (Can)',         category: 'drink', price: 1.50, emoji: '🥤', description: 'Classic Coca Cola' },
    { id: 'pepsi-can',          name: '🥤 Pepsi (Can)',             category: 'drink', price: 1.50, emoji: '🥤', description: 'Refreshing Pepsi' },
    { id: 'sprite-can',         name: '🥤 Sprite (Can)',            category: 'drink', price: 1.50, emoji: '🥤', description: 'Lemon-lime soda' },
    { id: 'fanta-can',          name: '🥤 Fanta (Can)',             category: 'drink', price: 1.50, emoji: '🥤', description: 'Orange flavored soda' },
    { id: 'water-bottle',       name: '💧 Water Bottle',            category: 'drink', price: 1.20, emoji: '💧', description: 'Fresh bottled water' },
    { id: 'juice-apple',        name: '🧃 Apple Juice',             category: 'drink', price: 1.80, emoji: '🧃', description: 'Fresh apple juice' },
    { id: 'juice-orange',       name: '🧃 Orange Juice',            category: 'drink', price: 1.80, emoji: '🧃', description: 'Fresh orange juice' },
    
    // -- Extras --
    { id: 'extra-sauce',        name: '🥫 Extra Sauce',             category: 'extra', price: 0.50, emoji: '🥫', description: 'Choice of sauce' },
    { id: 'extra-cheese',       name: '🧀 Extra Cheese',            category: 'extra', price: 1.00, emoji: '🧀', description: 'Additional cheese' },
    { id: 'extra-salad',        name: '🥗 Extra Salad',             category: 'extra', price: 1.00, emoji: '🥗', description: 'Additional fresh salad' },
    { id: 'extra-meat',         name: '🥩 Extra Meat',              category: 'extra', price: 2.50, emoji: '🥩', description: 'Additional portion of meat' },
    { id: 'extra-chicken',      name: '🍗 Extra Chicken',           category: 'extra', price: 2.50, emoji: '🍗', description: 'Additional chicken portion' },
    { id: 'jalapenos',          name: '🌶️ Jalapeños',               category: 'extra', price: 0.75, emoji: '🌶️', description: 'Spicy jalapeño peppers' },
    { id: 'pickles',            name: '🥒 Pickles',                 category: 'extra', price: 0.50, emoji: '🥒', description: 'Tangy pickle slices' },
    { id: 'mushrooms',          name: '🍄 Mushrooms',               category: 'extra', price: 1.00, emoji: '🍄', description: 'Fresh grilled mushrooms' },
    { id: 'peppers',            name: '🫑 Peppers',                 category: 'extra', price: 0.75, emoji: '🫑', description: 'Mixed bell peppers' }
  ];

  // 2) Recalculate total when selection changes
  useEffect(() => {
    let total = 0;
    if (customMeal.main)   total += customMeal.main.price;
    if (customMeal.drink)  total += customMeal.drink.price;
    customMeal.sides.forEach(side => total += side.price);
    customMeal.extras.forEach(xtra => total += xtra.price);
    setTotalPrice(total);
  }, [customMeal]);

  // 3) Add or replace a component
  const addComponent = (component: MealComponent) => {
    setCustomMeal(prev => {
      switch (component.category) {
        case 'main':  return { ...prev, main: component };
        case 'drink': return { ...prev, drink: component };
        case 'side':
          return prev.sides.length < 3
            ? { ...prev, sides: [...prev.sides, component] }
            : prev;
        case 'extra':
          return prev.extras.length < 5
            ? { ...prev, extras: [...prev.extras, component] }
            : prev;
      }
    });
  };

  // 4) Remove a selected component
  const removeComponent = (category: keyof CustomMeal | MealComponent['category'], id?: string) => {
    setCustomMeal(prev => {
      if (category === 'main')  return { ...prev, main: null };
      if (category === 'drink') return { ...prev, drink: null };
      if (category === 'side' || category === 'sides')  return { ...prev, sides: prev.sides.filter(s => s.id !== id) };
      if (category === 'extra' || category === 'extras') return { ...prev, extras: prev.extras.filter(x => x.id !== id) };
      return prev;
    });
  };

  // 5) Helpers for rendering
  const getComponentsByCategory = (cat: MealComponent['category']) =>
    mealComponents.filter(c => c.category === cat);

  // 6) Finalize meal into the basket
  const addToBasket = () => {
    if (!customMeal.main) {
      toast({
        title: "Please select a main item",
        description: "Your custom meal needs at least one main item.",
        variant: "destructive"
      });
      return;
    }
    const basketItem = {
      id: `custom-meal-${Date.now()}`,
      name: '🍽️ Custom Meal',
      price: totalPrice,
      category: 'custom-meal',
      customizations: [
        customMeal.main.name,
        ...customMeal.sides.map(s => s.name),
        ...(customMeal.drink ? [customMeal.drink.name] : []),
        ...customMeal.extras.map(x => x.name)
      ],
      emoji: '🍽️'
    };
    addItem(basketItem);
    toast({
      title: "Custom meal added to basket!",
      description: `Your custom meal has been added for £${totalPrice.toFixed(2)}.`
    });
    // Reset
    setCustomMeal({ main: null, sides: [], drink: null, extras: [] });
  };

  const clearMeal = () =>
    setCustomMeal({ main: null, sides: [], drink: null, extras: [] });

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary" />
          Build Your Perfect Meal
        </CardTitle>
        <p className="text-gray-600">
          Create your custom meal by selecting from our fresh ingredients and dishes.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* -- Main Course -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🍽️ Main Course
            <Badge variant="destructive" className="text-xs">Required</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('main').map(comp => (
              <Button
                key={comp.id}
                variant={customMeal.main?.id === comp.id ? 'default' : 'outline'}
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.main && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center justify-between">
              <span className="font-medium">Selected: {customMeal.main.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeComponent('main')}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* -- Sides -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🍟 Sides
            <Badge variant="secondary" className="text-xs">Max 3</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('side').map(comp => (
              <Button
                key={comp.id}
                variant="outline"
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
                disabled={customMeal.sides.length >= 3 && !customMeal.sides.some(s => s.id === comp.id)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.sides.length > 0 && (
            <div className="mt-3 space-y-2">
              {customMeal.sides.map(side => (
                <div key={side.id} className="p-2 bg-blue-50 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{side.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeComponent('sides', side.id)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* -- Drinks -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🥤 Drink
            <Badge variant="secondary" className="text-xs">Optional</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('drink').map(comp => (
              <Button
                key={comp.id}
                variant={customMeal.drink?.id === comp.id ? 'default' : 'outline'}
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.drink && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
              <span className="font-medium">Selected: {customMeal.drink.name}</span>
              <Button variant="ghost" size="sm" onClick={() => removeComponent('drink')}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* -- Extras -- */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            ➕ Extras
            <Badge variant="secondary" className="text-xs">Max 5</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('extra').map(comp => (
              <Button
                key={comp.id}
                variant="outline"
                className="flex flex-col items-start p-3 h-auto min-h-[80px] justify-start text-left whitespace-normal"
                onClick={() => addComponent(comp)}
                disabled={customMeal.extras.length >= 5 && !customMeal.extras.some(x => x.id === comp.id)}
              >
                <div className="font-medium text-sm mb-1 leading-tight">{comp.name}</div>
                <div className="text-xs text-gray-600 mb-1 leading-tight">{comp.description}</div>
                <div className="font-bold text-primary text-sm">£{comp.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.extras.length > 0 && (
            <div className="mt-3 space-y-2">
              {customMeal.extras.map(extra => (
                <div key={extra.id} className="p-2 bg-orange-50 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{extra.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeComponent('extras', extra.id)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* -- Summary & Actions -- */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Your Custom Meal</h3>
            <div className="text-2xl font-bold text-primary">£{totalPrice.toFixed(2)}</div>
          </div>
          
          <div className="space-y-2 mb-4">
            {customMeal.main && (
              <div className="flex justify-between">
                <span>{customMeal.main.name}</span>
                <span>£{customMeal.main.price.toFixed(2)}</span>
              </div>
            )}
            {customMeal.sides.map(side => (
              <div key={side.id} className="flex justify-between">
                <span>{side.name}</span>
                <span>£{side.price.toFixed(2)}</span>
              </div>
            ))}
            {customMeal.drink && (
              <div className="flex justify-between">
                <span>{customMeal.drink.name}</span>
                <span>£{customMeal.drink.price.toFixed(2)}</span>
              </div>
            )}
            {customMeal.extras.map(extra => (
              <div key={extra.id} className="flex justify-between">
                <span>{extra.name}</span>
                <span>£{extra.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={addToBasket}
              className="flex-1"
              disabled={!customMeal.main}
            >
              <ShoppingBasket className="h-4 w-4 mr-2" />
              Add to Basket
            </Button>
            <Button variant="outline" onClick={clearMeal}>
              Clear Meal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}