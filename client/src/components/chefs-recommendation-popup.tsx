import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Star, Clock, Sparkles, X, Award, TrendingUp, Heart, Phone } from 'lucide-react';
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
  const [showAnimation, setShowAnimation] = useState(false);

  // Enhanced daily specials based on day of the week
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
          reason: 'Chef Soner and Bayram recommend this for Sunday family dinners',
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
          reason: 'Made with chicken marinated overnight in Chef Soner and Bayram\'s secret spices',
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
          reason: 'Chef Soner and Bayram personally select the finest cuts for this special',
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
          reason: 'Fresh catch prepared with Chef Soner and Bayram\'s Mediterranean-style seasoning',
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
          reason: 'Chef Soner and Bayram\'s weekend celebration combo with extra portions',
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

    // Show popup after 8 seconds if user hasn't seen it today
    const lastShown = localStorage.getItem('chefsRecommendationShown');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      const timer = setTimeout(() => {
        setShowAnimation(true);
        setTimeout(() => {
          setIsOpen(true);
          localStorage.setItem('chefsRecommendationShown', today);
        }, 500);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowAnimation(false);
  };

  if (!currentSpecial) return null;

  return (
    <>
      {/* Floating animation before popup */}
      {showAnimation && !isOpen && (
        <div className="fixed top-20 right-6 z-50 animate-bounce">
          <div className="bg-primary text-white p-3 rounded-full shadow-2xl animate-pulse">
            <ChefHat className="h-8 w-8" />
          </div>
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          {/* Enhanced Header with gradient background */}
          <div className="relative bg-gradient-to-br from-primary via-red-600 to-accent p-6 -m-6 mb-4 text-white rounded-t-lg">
            <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
            <div className="relative">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="relative">
                      <ChefHat className="h-8 w-8 animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
                    </div>
                    Chef Soner and Bayram's Daily Special
                  </DialogTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="h-8 w-8 p-0 text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>
              
              {/* Chef's message */}
              <div className="mt-4 text-center">
                <p className="text-lg opacity-90">
                  "Today's special creation, made with love and authentic spices"
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Enhanced header with special badges */}
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-4">
                <Badge className="bg-accent text-charcoal animate-pulse">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Today's Special
                </Badge>
                {currentSpecial.isLimited && (
                  <Badge variant="destructive" className="animate-bounce">
                    <Clock className="mr-1 h-3 w-3" />
                    Limited Time
                  </Badge>
                )}
                <Badge className="bg-blue-100 text-blue-800">
                  <Award className="mr-1 h-3 w-3" />
                  Chef's Choice
                </Badge>
              </div>
              
              <div className="relative mb-4">
                <div className="text-6xl mb-2 animate-bounce">{currentSpecial.emoji}</div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-accent/20 rounded-full animate-ping"></div>
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-charcoal mb-2">
                {currentSpecial.name}
              </h3>
              <p className="text-gray-600 text-lg">
                {currentSpecial.description}
              </p>
            </div>

            {/* Enhanced price section with animations */}
            <Card className="border-2 border-accent">
              <CardContent className="p-6">
                <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-lg p-6 text-center">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="text-4xl font-bold text-primary animate-pulse">
                      £{currentSpecial.specialPrice.toFixed(2)}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      £{currentSpecial.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="flex justify-center gap-2 mb-3">
                    <Badge className="bg-green-100 text-green-800 animate-pulse">
                      <TrendingUp className="mr-1 h-3 w-3" />
                      Save £{(currentSpecial.originalPrice - currentSpecial.specialPrice).toFixed(2)}
                    </Badge>
                    <Badge className="bg-orange-100 text-orange-800">
                      <Heart className="mr-1 h-3 w-3" />
                      Customer Favorite
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600 font-medium">
                    🔥 {Math.round(((currentSpecial.originalPrice - currentSpecial.specialPrice) / currentSpecial.originalPrice) * 100)}% OFF Today Only!
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced chef's message */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <ChefHat className="h-6 w-6 text-primary" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Chef Soner and Bayram say:</p>
                    <p className="text-gray-700 italic">
                      "{currentSpecial.reason}"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced details grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border border-gray-200">
                <CardContent className="p-4 text-center">
                  <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Prep Time</p>
                  <p className="text-lg font-bold text-charcoal">{currentSpecial.preparationTime}</p>
                </CardContent>
              </Card>
              
              <Card className="border border-gray-200">
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 text-accent mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Rating</p>
                  <p className="text-lg font-bold text-charcoal">★★★★★</p>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced ingredients section */}
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  What's included:
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentSpecial.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-gray-700">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced action buttons */}
            <div className="space-y-3">
              <div className="relative">
                <AddToBasketButton
                  item={{
                    id: currentSpecial.id,
                    name: currentSpecial.name,
                    category: currentSpecial.category,
                    singlePrice: currentSpecial.specialPrice,
                    description: currentSpecial.description,
                  }}
                  className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white font-bold py-3 animate-pulse"
                />
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-25 animate-pulse"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="w-full"
                >
                  Maybe Later
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open('tel:01692584100')}
                  className="w-full"
                >
                  <Phone className="mr-1 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </div>

            {/* Enhanced footer */}
            <div className="text-center p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
              <div className="text-sm font-medium text-charcoal mb-1">
                🕐 Available today only • 💰 Cash payment only
              </div>
              <div className="text-xs text-gray-500">
                Call 01692 584 100 to order this special creation!
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}