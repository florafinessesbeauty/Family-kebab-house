import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, ShoppingBasket, Utensils } from 'lucide-react';
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

  // Predefined meal components
  const mealComponents: MealComponent[] = [
    // Mains
    { id: 'doner-kebab', name: '🥙 Doner Kebab', category: 'main', price: 8.50, emoji: '🥙', description: 'Traditional doner meat with salad' },
    { id: 'chicken-kebab', name: '🍗 Chicken Kebab', category: 'main', price: 9.00, emoji: '🍗', description: 'Grilled chicken with fresh salad' },
    { id: 'mixed-kebab', name: '🥙 Mixed Kebab', category: 'main', price: 10.50, emoji: '🥙', description: 'Doner and chicken combination' },
    { id: 'chicken-burger', name: '🍔 Chicken Burger', category: 'main', price: 6.50, emoji: '🍔', description: 'Juicy chicken burger' },
    { id: 'quarter-pounder', name: '🍔 ¼ Pounder', category: 'main', price: 7.00, emoji: '🍔', description: 'Beef burger with cheese' },
    { id: 'fried-chicken-3pc', name: '🍗 3pc Fried Chicken', category: 'main', price: 8.00, emoji: '🍗', description: 'Crispy fried chicken pieces' },
    { id: 'pizza-margherita', name: '🍕 10" Margherita Pizza', category: 'main', price: 9.50, emoji: '🍕', description: 'Classic margherita pizza' },

    // Sides
    { id: 'chips', name: '🍟 Chips', category: 'side', price: 3.50, emoji: '🍟', description: 'Golden crispy chips' },
    { id: 'large-chips', name: '🍟 Large Chips', category: 'side', price: 4.50, emoji: '🍟', description: 'Extra large portion of chips' },
    { id: 'onion-rings', name: '🧅 Onion Rings (8pcs)', category: 'side', price: 4.00, emoji: '🧅', description: 'Crispy battered onion rings' },
    { id: 'mozzarella-sticks', name: '🧀 Mozzarella Sticks (6pcs)', category: 'side', price: 5.00, emoji: '🧀', description: 'Melted mozzarella sticks' },
    { id: 'coleslaw', name: '🥗 Coleslaw', category: 'side', price: 2.50, emoji: '🥗', description: 'Fresh homemade coleslaw' },
    { id: 'garlic-bread', name: '🧄 Garlic Bread', category: 'side', price: 3.00, emoji: '🧄', description: 'Toasted garlic bread' },

    // Drinks
    { id: 'coke-can', name: '🥤 Coke (Can)', category: 'drink', price: 1.50, emoji: '🥤', description: 'Refreshing Coca-Cola' },
    { id: 'pepsi-can', name: '🥤 Pepsi (Can)', category: 'drink', price: 1.50, emoji: '🥤', description: 'Pepsi Cola' },
    { id: 'sprite-can', name: '🥤 Sprite (Can)', category: 'drink', price: 1.50, emoji: '🥤', description: 'Lemon-lime soda' },
    { id: 'water-bottle', name: '💧 Water Bottle', category: 'drink', price: 1.00, emoji: '💧', description: 'Still water bottle' },
    { id: 'orange-juice', name: '🧃 Orange Juice', category: 'drink', price: 2.00, emoji: '🧃', description: 'Fresh orange juice' },

    // Extras
    { id: 'extra-sauce', name: '🥄 Extra Sauce', category: 'extra', price: 0.50, emoji: '🥄', description: 'Garlic, chili, or mayo sauce' },
    { id: 'extra-cheese', name: '🧀 Extra Cheese', category: 'extra', price: 1.50, emoji: '🧀', description: 'Additional cheese portion' },
    { id: 'extra-meat', name: '🥩 Extra Meat', category: 'extra', price: 2.50, emoji: '🥩', description: 'Additional meat portion' },
    { id: 'pitta-bread', name: '🫓 Pitta Bread', category: 'extra', price: 1.00, emoji: '🫓', description: 'Fresh pitta bread' },
    { id: 'extra-salad', name: '🥗 Extra Salad', category: 'extra', price: 1.00, emoji: '🥗', description: 'Additional fresh salad' },
  ];

  // Calculate total price whenever meal changes
  useEffect(() => {
    let total = 0;
    
    if (customMeal.main) total += customMeal.main.price;
    if (customMeal.drink) total += customMeal.drink.price;
    
    customMeal.sides.forEach(side => total += side.price);
    customMeal.extras.forEach(extra => total += extra.price);
    
    setTotalPrice(total);
  }, [customMeal]);

  const addComponent = (component: MealComponent) => {
    setCustomMeal(prev => {
      switch (component.category) {
        case 'main':
          return { ...prev, main: component };
        case 'drink':
          return { ...prev, drink: component };
        case 'side':
          if (prev.sides.length < 3) { // Max 3 sides
            return { ...prev, sides: [...prev.sides, component] };
          }
          return prev;
        case 'extra':
          if (prev.extras.length < 5) { // Max 5 extras
            return { ...prev, extras: [...prev.extras, component] };
          }
          return prev;
        default:
          return prev;
      }
    });
  };

  const removeComponent = (category: string, componentId?: string) => {
    setCustomMeal(prev => {
      switch (category) {
        case 'main':
          return { ...prev, main: null };
        case 'drink':
          return { ...prev, drink: null };
        case 'side':
          return { ...prev, sides: prev.sides.filter(side => side.id !== componentId) };
        case 'extra':
          return { ...prev, extras: prev.extras.filter(extra => extra.id !== componentId) };
        default:
          return prev;
      }
    });
  };

  const addToBasket = () => {
    if (!customMeal.main) {
      toast({
        title: "Please select a main item",
        description: "Your custom meal needs at least one main item.",
        variant: "destructive",
      });
      return;
    }

    const mealComponents = [
      customMeal.main.name,
      ...customMeal.sides.map(side => side.name),
      ...(customMeal.drink ? [customMeal.drink.name] : []),
      ...customMeal.extras.map(extra => extra.name)
    ];

    const basketItem = {
      id: `custom-meal-${Date.now()}`,
      name: '🍽️ Custom Meal',
      price: totalPrice,
      category: 'custom-meal',
      customizations: mealComponents,
      emoji: '🍽️',
    };

    addItem(basketItem);
    
    toast({
      title: "Custom meal added to basket!",
      description: `Your custom meal has been added for £${totalPrice.toFixed(2)}.`,
    });

    // Reset meal builder
    setCustomMeal({
      main: null,
      sides: [],
      drink: null,
      extras: []
    });
  };

  const clearMeal = () => {
    setCustomMeal({
      main: null,
      sides: [],
      drink: null,
      extras: []
    });
  };

  const getComponentsByCategory = (category: MealComponent['category']) => {
    return mealComponents.filter(component => component.category === category);
  };

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
        {/* Main Course Selection */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🍽️ Main Course
            <Badge variant="destructive" className="text-xs">Required</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('main').map(component => (
              <Button
                key={component.id}
                variant={customMeal.main?.id === component.id ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-start text-left"
                onClick={() => addComponent(component)}
              >
                <div className="font-medium">{component.name}</div>
                <div className="text-sm text-gray-600">{component.description}</div>
                <div className="font-bold text-primary mt-1">£{component.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.main && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center justify-between">
              <span className="font-medium">Selected: {customMeal.main.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeComponent('main')}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Sides Selection */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🍟 Sides
            <Badge variant="secondary" className="text-xs">Max 3</Badge>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getComponentsByCategory('side').map(component => (
              <Button
                key={component.id}
                variant="outline"
                className="h-auto p-3 flex flex-col items-start text-left"
                onClick={() => addComponent(component)}
                disabled={customMeal.sides.length >= 3}
              >
                <div className="font-medium">{component.name}</div>
                <div className="text-sm text-gray-600">{component.description}</div>
                <div className="font-bold text-primary mt-1">£{component.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.sides.length > 0 && (
            <div className="mt-3 space-y-2">
              {customMeal.sides.map((side, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{side.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeComponent('side', side.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Drink Selection */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            🥤 Drink
            <Badge variant="secondary" className="text-xs">Optional</Badge>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {getComponentsByCategory('drink').map(component => (
              <Button
                key={component.id}
                variant={customMeal.drink?.id === component.id ? "default" : "outline"}
                className="h-auto p-3 flex flex-col items-center text-center"
                onClick={() => addComponent(component)}
              >
                <div className="font-medium text-sm">{component.name}</div>
                <div className="font-bold text-primary mt-1">£{component.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.drink && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center justify-between">
              <span className="font-medium">Selected: {customMeal.drink.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeComponent('drink')}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Extras Selection */}
        <div>
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            ➕ Extras
            <Badge variant="secondary" className="text-xs">Max 5</Badge>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {getComponentsByCategory('extra').map(component => (
              <Button
                key={component.id}
                variant="outline"
                className="h-auto p-3 flex flex-col items-center text-center"
                onClick={() => addComponent(component)}
                disabled={customMeal.extras.length >= 5}
              >
                <div className="font-medium text-sm">{component.name}</div>
                <div className="font-bold text-primary mt-1">+£{component.price.toFixed(2)}</div>
              </Button>
            ))}
          </div>
          {customMeal.extras.length > 0 && (
            <div className="mt-3 space-y-2">
              {customMeal.extras.map((extra, index) => (
                <div key={index} className="p-3 bg-yellow-50 rounded-lg flex items-center justify-between">
                  <span className="font-medium">{extra.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeComponent('extra', extra.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Separator />

        {/* Total and Actions */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center text-2xl font-bold mb-4">
            <span>Total:</span>
            <span className="text-primary">£{totalPrice.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={addToBasket}
              disabled={!customMeal.main || totalPrice === 0}
              className="flex-1 bg-primary hover:bg-red-700"
            >
              <ShoppingBasket className="mr-2 h-4 w-4" />
              Add Custom Meal to Basket
            </Button>
            
            <Button
              variant="outline"
              onClick={clearMeal}
              disabled={totalPrice === 0}
            >
              Clear
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 mt-3 text-center">
            🕐 Preparation time: 15-20 minutes • 💰 Cash payment only
          </div>
        </div>
      </CardContent>
    </Card>
  );
}