import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Star, Clock, Sparkles, X } from 'lucide-react';
import AddToBasketButton from '@/components/add-to-basket-button';

interface DailySpecial {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  specialPrice: number;
  category: string;
  emoji: string;
  reason: string;
  preparationTime: string;
  isLimited: boolean;
  ingredients: string[];
}

export default function ChefsRecommendationPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSpecial, setCurrentSpecial] = useState<DailySpecial | null>(null);

  // Daily specials based on day of the week
  const getDailySpecials = (): DailySpecial[] => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    const weeklySpecials: { [key: number]: DailySpecial[] } = {
      0: [ // Sunday - Family Day
        {
          id: 'sunday-feast',
          name: '🎉 Sunday Family Feast',
          description: 'Perfect for family gathering - Kebab Feast with extra sides',
          originalPrice: 35.00,
          specialPrice: 28.00,
          category: 'family-special',
          emoji: '👨‍👩‍👧‍👦',
          reason: 'Chef Ahmed recommends this for Sunday family dinners',
          preparationTime: '20-25 minutes',
          isLimited: true,
          ingredients: ['Doner Meat', 'Shish Kebab', 'Chicken Kebab', 'Kofte', 'Fresh Salad', 'Pitta Bread', 'Sauces', 'Chips']
        }
      ],
      1: [ // Monday - Fresh Start
        {
          id: 'monday-fresh',
          name: '🌟 Chef\'s Monday Special',
          description: 'Fresh Chicken Shish with seasonal vegetables',
          originalPrice: 12.50,
          specialPrice: 10.00,
          category: 'chef-special',
          emoji: '🍗',
          reason: 'Made with chicken marinated overnight in Chef\'s secret spices',
          preparationTime: '15-18 minutes',
          isLimited: false,
          ingredients: ['Marinated Chicken', 'Grilled Vegetables', 'Garlic Sauce', 'Fresh Herbs']
        }
      ],
      2: [ // Tuesday - Pizza Day
        {
          id: 'tuesday-pizza',
          name: '🍕 Tuesday Pizza Perfection',
          description: 'Chef\'s signature pizza with premium toppings',
          originalPrice: 16.50,
          specialPrice: 13.50,
          category: 'pizza-special',
          emoji: '🍕',
          reason: 'Made with our 100% fresh daily dough and premium mozzarella',
          preparationTime: '12-15 minutes',
          isLimited: false,
          ingredients: ['Fresh Dough', 'Premium Mozzarella', 'Italian Tomato Sauce', 'Chef\'s Selection Toppings']
        }
      ],
      3: [ // Wednesday - Wrap Day
        {
          id: 'wednesday-wrap',
          name: '🌯 Wednesday Wrap Wonder',
          description: 'Gourmet wrap with chef\'s special sauce',
          originalPrice: 9.50,
          specialPrice: 7.50,
          category: 'wrap-special',
          emoji: '🌯',
          reason: 'Features our house-made wrap sauce and premium fillings',
          preparationTime: '8-10 minutes',
          isLimited: false,
          ingredients: ['Fresh Tortilla', 'Grilled Chicken', 'Special Sauce', 'Fresh Vegetables']
        }
      ],
      4: [ // Thursday - Grill Day
        {
          id: 'thursday-grill',
          name: '🔥 Thursday Grill Master',
          description: 'Mixed grill with chef\'s selection of meats',
          originalPrice: 18.00,
          specialPrice: 15.00,
          category: 'grill-special',
          emoji: '🥩',
          reason: 'Chef personally selects the finest cuts for this special',
          preparationTime: '20-22 minutes',
          isLimited: true,
          ingredients: ['Premium Lamb', 'Chicken Breast', 'Beef Kofta', 'Grilled Vegetables']
        }
      ],
      5: [ // Friday - Fish Day
        {
          id: 'friday-fish',
          name: '🐟 Friday Fresh Fish',
          description: 'Crispy scampi with chef\'s tartar sauce',
          originalPrice: 11.50,
          specialPrice: 9.00,
          category: 'seafood-special',
          emoji: '🍤',
          reason: 'Fresh catch prepared with Chef\'s Mediterranean-style seasoning',
          preparationTime: '12-15 minutes',
          isLimited: false,
          ingredients: ['Fresh Scampi', 'Chef\'s Batter', 'Homemade Tartar Sauce', 'Lemon']
        }
      ],
      6: [ // Saturday - Weekend Special
        {
          id: 'saturday-combo',
          name: '🎉 Saturday Night Combo',
          description: 'Ultimate combination meal for weekend celebration',
          originalPrice: 16.50,
          specialPrice: 13.50,
          category: 'weekend-special',
          emoji: '🎊',
          reason: 'Chef\'s weekend celebration combo with extra portions',
          preparationTime: '18-20 minutes',
          isLimited: false,
          ingredients: ['Mixed Kebab', 'Chicken Wings', 'Chips', 'Coleslaw', 'Drink']
        }
      ]
    };

    return weeklySpecials[today] || weeklySpecials[0];
  };

  useEffect(() => {
    const specials = getDailySpecials();
    if (specials.length > 0) {
      setCurrentSpecial(specials[0]);
    }

    // Show popup after 15 seconds if user hasn't seen it today
    const lastShown = localStorage.getItem('chefsRecommendationShown');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem('chefsRecommendationShown', today);
      }, 15000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!currentSpecial) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              Chef's Daily Recommendation
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with special badge */}
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-3">
              <Badge className="bg-accent text-charcoal">
                <Sparkles className="mr-1 h-3 w-3" />
                Today's Special
              </Badge>
              {currentSpecial.isLimited && (
                <Badge variant="destructive">
                  Limited Time
                </Badge>
              )}
            </div>
            
            <div className="text-4xl mb-2">{currentSpecial.emoji}</div>
            <h3 className="text-2xl font-bold text-charcoal">
              {currentSpecial.name}
            </h3>
          </div>

          {/* Price section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl font-bold text-primary">
                £{currentSpecial.specialPrice.toFixed(2)}
              </span>
              <span className="text-lg text-gray-500 line-through">
                £{currentSpecial.originalPrice.toFixed(2)}
              </span>
            </div>
            <Badge className="bg-green-100 text-green-800">
              Save £{(currentSpecial.originalPrice - currentSpecial.specialPrice).toFixed(2)}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <p className="text-gray-700 mb-3">{currentSpecial.description}</p>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <ChefHat className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 italic">
                  "{currentSpecial.reason}"
                </p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <span>{currentSpecial.preparationTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" />
              <span>Chef's Choice</span>
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <h4 className="font-semibold mb-2">What's included:</h4>
            <div className="flex flex-wrap gap-1">
              {currentSpecial.ingredients.map((ingredient, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <AddToBasketButton
              item={{
                id: currentSpecial.id,
                name: currentSpecial.name,
                category: currentSpecial.category,
                singlePrice: currentSpecial.specialPrice,
                description: currentSpecial.description,
              }}
              className="w-full"
            />
            
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            This special is available today only. Call 01692 584 100 to order!
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}