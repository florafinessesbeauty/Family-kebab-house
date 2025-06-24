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

  // 1) All possible meal parts
  const mealComponents: MealComponent[] = [
    // -- Mains --
    { id: 'doner-kebab',       name: '🥙 Doner Kebab',       category: 'main', price: 8.50, emoji: '🥙', description: 'Traditional doner meat with salad' },
    { id: 'chicken-kebab',     name: '🍗 Chicken Kebab',     category: 'main', price: 9.00, emoji: '🍗', description: 'Grilled chicken with fresh salad' },
    { id: 'mixed-kebab',       name: '🥙 Mixed Kebab',       category: 'main', price: 10.50, emoji: '🥙', description: 'Doner and chicken combination' },
    { id: 'chicken-burger',    name: '🍔 Chicken Burger',    category: 'main', price: 6.50, emoji: '🍔', description: 'Juicy chicken burger' },
    { id: 'quarter-pounder',   name: '🍔 ¼ Pounder',         category: 'main', price: 7.00, emoji: '🍔', description: 'Beef burger with cheese' },
    { id: 'fried-chicken-3pc', name: '🍗 3pc Fried Chicken', category: 'main', price: 8.00, emoji: '🍗', description: 'Crispy fried chicken pieces' },
    { id: 'pizza-margherita',  name: '🍕 10" Margherita Pizza', category: 'main', price: 9.50, emoji: '🍕', description: 'Classic margherita pizza' },

    // -- Sides --
    { id: 'chips',             name: '🍟 Chips',                    category: 'side', price: 3.50, emoji: '🍟', description: 'Golden crispy chips' },
    { id: 'large-chips',       name: '🍟 Large Chips',             category: 'side', price: 4.50, emoji: '🍟', description: 'Extra large portion of chips' },
    { id: 'onion-rings',       name: '🧅 Onion Rings (8pcs)',      category: 'side', price: 4.00, emoji: '🧅', description: 'Crispy battered onion rings' },
    { id: 'mozzarella-sticks', name: '🧀 Mozzarella Sticks (6pcs)',category: 'side', price: 5.00, emoji: '🧀', description: 'Melted mozzarella sticks' },
    { id: 'coleslaw',          name: '🥗 Coleslaw',                category: 'side', price: 2.50, emoji: '🥗', description: 'Fresh homemade coleslaw' },
    { id: 'garlic-bread',      name: '🧄 Garlic Bread',            category: 'side', price: 3.00, emoji: '🧄', description: 'Toasted garlic bread' },

    // -- Drinks --
    { id: 'coke-can',    name: '🥤 Coke (Can)',     category: 'drink', price: 1.50, emoji: '🥤', description: 'Refreshing Coca-Cola' },
    { id: 'pepsi-can',   name: '🥤 Pepsi (Can)',    category: 'drink', price: 1.50, emoji: '🥤', description: 'Pepsi Cola' },
    { id: 'sprite-can',  name: '🥤 Sprite (Can)',   category: 'drink', price: 1.50, emoji: '🥤', description: 'Lemon-lime soda' },
    { id: 'water-bottle',name: '💧 Water Bottle',   category: 'drink', price: 1.00, emoji: '💧', description: 'Still water bottle' },
    { id: 'orange-juice',name: '🧃 Orange Juice',   category: 'drink', price: 2.00, emoji: '🧃', description: 'Fresh orange juice' },

    // -- Extras --
    { id: 'extra-sauce', name: '🥄 Extra Sauce', category: 'extra', price: 0.50, emoji: '🥄', description: 'Garlic, chili, or mayo sauce' },
    { id: 'extra-cheese',name: '🧀 Extra Cheese', category: 'extra', price: 1.50, emoji: '🧀', description: 'Additional cheese portion' },
    { id: 'extra-meat',  name: '🥩 Extra Meat',   category: 'extra', price: 2.50, emoji: '🥩', description: 'Additional meat portion' },
    { id: 'pitta-bread', name: '🫓 Pitta Bread', category: 'extra', price: 1.00, emoji: '🫓', description: 'Fresh pitta bread' },
    { id: 'extra-salad', name: '🥗 Extra Salad',  category: 'extra', price: 1.00, emoji: '🥗', description: 'Additional fresh salad' }
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
  const removeComponent = (category: CustomMeal['main'] extends null ? never : keyof CustomMeal, id?: string) => {
    setCustomMeal(prev => {
      if (category === 'main')  return { ...prev, main: null };
      if (category === 'drink') return { ...prev, drink: null };
      if (category === 'side')  return { ...prev, sides: prev.sides.filter(s => s.id !== id) };
      if (category === 'extra') return { ...prev, extras: prev.extras.filter(x => x.id !== id) };
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
              <Button variant="ghost" size="sm" onClick={() =>