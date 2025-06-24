// client/src/components/meal-builder.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, ShoppingBasket, Utensils } from 'lucide-react';
import { useBasket } from '@/hooks/use-basket';
import { toast } from '@/hooks/use-toast';
import { parsePrice, safeToFixed } from '@/utils/price-utils';

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

  // 1) All possible meal parts
  const mealComponents: MealComponent[] = [
    // -- Mains --
    { id: 'doner-kebab',       name: '🥙 Doner Kebab',       category: 'main', price: 8.50, emoji: '🥙', description: 'Traditional doner meat with salad' },
    { id: 'chicken-kebab',     name: '🍗 Chicken Kebab',     category: 'main', price: 9.00, emoji: '🍗', description: 'Grilled chicken with fresh salad' },
    { id: 'mixed-kebab',       name: '🥙 Mixed Kebab',       category: 'main', price: 10.50, emoji: '🥙', description: 'Doner and chicken combination' },
    { id: 'chicken-burger',    name: '🍔 Chicken Burger',    category: 'main', price: 6.50, emoji: '🍔', description: 'Juicy chicken burger' },
    { id: 'quarter-pounder',   name: '🍔 ¼ Pounder',         category: 'main', price: 7.00, emoji: '🍔', description: 'Beef burger with cheese' },
    { id: 'fried-chicken-3pc', name: '🍗 3pc Fried Chicken', category: 'main', price: 8.00, emoji: '🍗', description: 'Crispy fried chicken pieces' },
    { id: 'pizza-margherita',  name: '🍕 10" Margherita Pizza', category: 'main', price: 9.50, emoji: '🍕', description: 'Classic pizza with fresh basil' },
    
    // -- Sides --
    { id: 'chips-regular',     name: '🍟 Regular Chips',     category: 'side', price: 3.00, emoji: '🍟', description: 'Golden crispy chips' },
    { id: 'chips-large',       name: '🍟 Large Chips',       category: 'side', price: 4.50, emoji: '🍟', description: 'Extra portion of chips' },
    { id: 'coleslaw',          name: '🥗 Coleslaw',          category: 'side', price: 2.50, emoji: '🥗', description: 'Fresh homemade coleslaw' },
    { id: 'onion-rings',       name: '🧅 Onion Rings',       category: 'side', price: 3.50, emoji: '🧅', description: 'Crispy battered onion rings' },
    { id: 'garlic-bread',      name: '🍞 Garlic Bread',      category: 'side', price: 3.00, emoji: '🍞', description: 'Warm garlic bread slices' },
    
    // -- Drinks --
    { id: 'coke-can',          name: '🥤 Coca Cola (Can)',   category: 'drink', price: 1.50, emoji: '🥤', description: 'Classic Coca Cola' },
    { id: 'pepsi-can',         name: '🥤 Pepsi (Can)',       category: 'drink', price: 1.50, emoji: '🥤', description: 'Refreshing Pepsi' },
    { id: 'sprite-can',        name: '🥤 Sprite (Can)',      category: 'drink', price: 1.50, emoji: '🥤', description: 'Lemon-lime soda' },
    { id: 'water-bottle',      name: '💧 Water Bottle',      category: 'drink', price: 1.20, emoji: '💧', description: 'Fresh bottled water' },
    
    // -- Extras --
    { id: 'extra-sauce',       name: '🥫 Extra Sauce',       category: 'extra', price: 0.50, emoji: '🥫', description: 'Choice of sauce' },
    { id: 'extra-cheese',      name: '🧀 Extra Cheese',      category: 'extra', price: 1.00, emoji: '🧀', description: 'Additional cheese' },
    { id: 'extra-salad',       name: '🥗 Extra Salad',       category: 'extra', price: 1.00, emoji: '🥗', description: 'Additional fresh salad' }
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
      description: `Your custom meal has been added for £${parsePrice(totalPrice).toFixed(2)}.`
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
                className="flex flex-col items-start p-3"
                onClick={() => addComponent(comp)}
              >
                <div className="font-medium">{comp.name}</div>
                <div className="text-sm text-gray-600">{comp.description}</div>
                <div className="font-bold text-primary">£{comp.price.toFixed(2)}</div>
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
                className="flex flex-col items-start p-3"
                onClick={() => addComponent(comp)}
                disabled={customMeal.sides.length >= 3 && !customMeal.sides.some(s => s.id === comp.id)}
              >
                <div className="font-medium">{comp.name}</div>
                <div className="text-sm text-gray-600">{comp.description}</div>
                <div className="font-bold text-primary">£{parsePrice(comp.price).toFixed(2)}</div>
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
                className="flex flex-col items-start p-3"
                onClick={() => addComponent(comp)}
              >
                <div className="font-medium">{comp.name}</div>
                <div className="text-sm text-gray-600">{comp.description}</div>
                <div className="font-bold text-primary">£{comp.price.toFixed(2)}</div>
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
                className="flex flex-col items-start p-3"
                onClick={() => addComponent(comp)}
                disabled={customMeal.extras.length >= 5 && !customMeal.extras.some(x => x.id === comp.id)}
              >
                <div className="font-medium">{comp.name}</div>
                <div className="text-sm text-gray-600">{comp.description}</div>
                <div className="font-bold text-primary">£{parsePrice(comp.price).toFixed(2)}</div>
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
            <div className="text-2xl font-bold text-primary">£{parsePrice(totalPrice).toFixed(2)}</div>
          </div>
          
          <div className="space-y-2 mb-4">
            {customMeal.main && (
              <div className="flex justify-between">
                <span>{customMeal.main.name}</span>
                <span>£{parsePrice(customMeal.main.price).toFixed(2)}</span>
              </div>
            )}
            {customMeal.sides.map(side => (
              <div key={side.id} className="flex justify-between">
                <span>{side.name}</span>
                <span>£{parsePrice(side.price).toFixed(2)}</span>
              </div>
            ))}
            {customMeal.drink && (
              <div className="flex justify-between">
                <span>{customMeal.drink.name}</span>
                <span>£{parsePrice(customMeal.drink.price).toFixed(2)}</span>
              </div>
            )}
            {customMeal.extras.map(extra => (
              <div key={extra.id} className="flex justify-between">
                <span>{extra.name}</span>
                <span>£{parsePrice(extra.price).toFixed(2)}</span>
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