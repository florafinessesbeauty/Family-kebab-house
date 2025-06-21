import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Heart, Zap, Clock, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface FoodPreference {
  id: string;
  label: string;
  icon: string;
  category: string;
}

interface RecommendedDish {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  emoji: string;
  tags: string[];
  preparationTime: string;
}

const foodPreferences: FoodPreference[] = [
  { id: "spicy", label: "Spicy Food", icon: "🌶️", category: "taste" },
  { id: "mild", label: "Mild Flavors", icon: "😌", category: "taste" },
  { id: "meat-lover", label: "Meat Lover", icon: "🥩", category: "protein" },
  { id: "chicken", label: "Chicken", icon: "🍗", category: "protein" },
  { id: "vegetarian", label: "Vegetarian", icon: "🥬", category: "diet" },
  { id: "seafood", label: "Seafood", icon: "🦐", category: "diet" },
  { id: "quick-bite", label: "Quick Bite", icon: "⚡", category: "time" },
  { id: "hearty-meal", label: "Hearty Meal", icon: "🍽️", category: "portion" },
  { id: "family-sharing", label: "Family Sharing", icon: "👨‍👩‍👧‍👦", category: "portion" },
  { id: "budget-friendly", label: "Budget Friendly", icon: "💰", category: "price" },
  { id: "premium", label: "Premium Choice", icon: "⭐", category: "price" },
  { id: "lunch-special", label: "Lunch Special", icon: "⏰", category: "price" },
  { id: "traditional", label: "Traditional", icon: "🏛️", category: "style" },
  { id: "modern", label: "Modern Twist", icon: "✨", category: "style" }
];

// Function to map menu items to AI recommendation format
const mapMenuItemToRecommendation = (item: any): RecommendedDish => {
  const category = item.category.toLowerCase();
  const name = item.name;
  const price = item.priceSmall ? `From £${item.priceSmall.toFixed(2)}` : 
               item.priceMedium ? `From £${item.priceMedium.toFixed(2)}` : 
               item.priceLarge ? `From £${item.priceLarge.toFixed(2)}` : 
               item.price ? `£${item.price.toFixed(2)}` : "Price on request";

  // Enhanced category-based tagging system
  const categoryTags: Record<string, string[]> = {
    "lunch-time-offers": ["budget-friendly", "quick-bite", "lunch-special"],
    "burgers": ["hearty-meal", "modern"],
    "fried-chicken": ["chicken", "hearty-meal", "spicy"],
    "chicken-bargain-meals": ["chicken", "budget-friendly", "hearty-meal"],
    "chicken-wings-strips": ["chicken", "spicy", "quick-bite"],
    "chicken-nuggets": ["chicken", "quick-bite", "budget-friendly", "mild"],
    "scampi": ["seafood", "quick-bite", "mild"],
    "desserts": ["vegetarian", "quick-bite", "budget-friendly"],
    "extras": ["quick-bite", "budget-friendly"],
    "drinks": ["quick-bite", "budget-friendly"],
    "kids-meals": ["chicken", "mild", "budget-friendly"],
    "pizzas": ["vegetarian", "traditional", "hearty-meal"],
    "garlic-bread-pizza-extras": ["vegetarian", "quick-bite"],
    "pizza-offers": ["budget-friendly", "hearty-meal", "traditional"],
    "family-deals": ["family-sharing", "premium", "hearty-meal"],
    "chicken-combo-meals": ["chicken", "hearty-meal", "budget-friendly"],
    "kebabs": ["meat-lover", "traditional", "hearty-meal"],
    "kebab-feast": ["meat-lover", "premium", "hearty-meal", "family-sharing"],
    "wraps": ["quick-bite", "budget-friendly"],
    "combination-kebabs": ["meat-lover", "premium", "hearty-meal"]
  };

  // Name-based additional tags
  const nameTags = [];
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('spicy') || lowerName.includes('hot')) nameTags.push('spicy');
  else nameTags.push('mild');
  
  if (lowerName.includes('chicken')) nameTags.push('chicken');
  if (lowerName.includes('lamb') || lowerName.includes('doner') || lowerName.includes('kebab')) nameTags.push('meat-lover');
  if (lowerName.includes('vegetarian') || lowerName.includes('margherita') || lowerName.includes('cheese')) nameTags.push('vegetarian');
  if (price.includes('From £') && parseFloat(price.replace('From £', '')) > 15) nameTags.push('premium');
  else if (price.includes('From £') && parseFloat(price.replace('From £', '')) < 8) nameTags.push('budget-friendly');

  const tags = [...(categoryTags[category] || []), ...nameTags];

  // Category-based emojis and images
  const getEmoji = (category: string, name: string): string => {
    if (name.toLowerCase().includes('doner')) return '🥙';
    if (name.toLowerCase().includes('pizza')) return '🍕';
    if (name.toLowerCase().includes('burger')) return '🍔';
    if (name.toLowerCase().includes('wing')) return '🔥';
    if (name.toLowerCase().includes('wrap')) return '🌯';
    if (name.toLowerCase().includes('kebab')) return '🍢';
    if (name.toLowerCase().includes('family')) return '👨‍👩‍👧‍👦';
    if (name.toLowerCase().includes('chicken')) return '🍗';
    if (name.toLowerCase().includes('scampi')) return '🦐';
    if (name.toLowerCase().includes('donut')) return '🍩';
    if (name.toLowerCase().includes('garlic')) return '🧄';
    
    // Fallback by category
    switch (category) {
      case 'kebabs': return '🥙';
      case 'pizzas': return '🍕';
      case 'burgers': return '🍔';
      case 'wraps': return '🌯';
      case 'fried-chicken': return '🍗';
      case 'chicken-wings-strips': return '🔥';
      case 'desserts': return '🍩';
      case 'drinks': return '🥤';
      case 'family-deals': return '👨‍👩‍👧‍👦';
      default: return '🍽️';
    }
  };

  const getImage = (category: string, name: string): string => {
    const images: Record<string, string> = {
      'doner': 'https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'wings': 'https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'wrap': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'kebab': 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'chicken': 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'scampi': 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'family': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400',
      'dessert': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
    };

    const lowerName = name.toLowerCase();
    for (const [key, url] of Object.entries(images)) {
      if (lowerName.includes(key)) return url;
    }
    
    // Default image
    return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400';
  };

  return {
    id: `menu-${item.id}`,
    name: name,
    description: item.description || `Delicious ${name.toLowerCase()} made fresh with authentic ingredients`,
    price: price,
    image: getImage(category, name),
    category: category,
    emoji: getEmoji(category, name),
    tags: [...new Set(tags)], // Remove duplicates
    preparationTime: tags.includes('quick-bite') ? '8 min' : tags.includes('family-sharing') ? '20 min' : '12 min'
  };
};

export default function FoodRecommendation() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedDish[]>([]);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [additionalRecommendations, setAdditionalRecommendations] = useState<RecommendedDish[]>([]);

  // Fetch menu data from your database
  const { data: menuItems = [], isLoading } = useQuery({
    queryKey: ['/api/menu'],
    queryFn: async () => {
      const response = await fetch('/api/menu');
      if (!response.ok) throw new Error('Failed to fetch menu');
      return response.json();
    }
  });

  // Convert menu items to recommendation format
  const allDishes = menuItems.map(mapMenuItemToRecommendation);

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const getRecommendations = () => {
    if (allDishes.length === 0) return [];
    
    if (selectedPreferences.length === 0) {
      // Show popular dishes when no preferences selected - pick variety from different categories
      const popularDishes = allDishes.filter(dish => 
        dish.name.toLowerCase().includes('doner') ||
        dish.name.toLowerCase().includes('margherita') ||
        dish.name.toLowerCase().includes('chicken burger') ||
        dish.name.toLowerCase().includes('wings') ||
        dish.name.toLowerCase().includes('family') ||
        dish.name.toLowerCase().includes('mixed kebab')
      ).slice(0, 6);
      
      return popularDishes.length >= 4 ? popularDishes : allDishes.slice(0, 6);
    }

    const scoredDishes = allDishes.map(dish => {
      const matchingTags = dish.tags.filter(tag => selectedPreferences.includes(tag)).length;
      return { ...dish, score: matchingTags };
    });

    // Return top 4-8 recommendations based on preferences
    const topMatches = scoredDishes
      .sort((a, b) => b.score - a.score)
      .filter(dish => dish.score > 0);
    
    // If we have good matches, return 6-8, otherwise return top 6
    return topMatches.length >= 6 ? topMatches.slice(0, 8) : topMatches.slice(0, 6);
  };

  const recommendations = getRecommendations();

  const handleGetRecommendations = () => {
    if (selectedPreferences.length === 0) {
      alert("Please select at least one preference to get recommendations!");
      return;
    }

    // Smart recommendation based on preferences
    const scoredDishes = allDishes.map(dish => {
      const matchingTags = dish.tags.filter(tag => selectedPreferences.includes(tag));
      const score = matchingTags.length + (Math.random() * 0.1);
      return { ...dish, score };
    }).filter(dish => dish.score > 0);
    
    const sortedDishes = scoredDishes.sort((a, b) => b.score - a.score);
    const topRecommendations = sortedDishes.slice(0, 8);
    const moreOptions = sortedDishes.slice(8, 20);

    setRecommendations(topRecommendations);
    setAdditionalRecommendations(moreOptions);
    setShowRecommendations(true);
    setShowMoreOptions(false);
  };

  const resetPreferences = () => {
    setSelectedPreferences([]);
    setShowRecommendations(false);
    setShowMoreOptions(false);
    setRecommendations([]);
    setAdditionalRecommendations([]);
  };

  const handleShowMoreOptions = () => {
    setShowMoreOptions(true);
  };

  const handleHideMoreOptions = () => {
    setShowMoreOptions(false);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl">🤖 Loading AI Recommendations...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
            🤖 AI Food Recommendations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us your preferences and we'll recommend the perfect dishes from our authentic menu of {allDishes.length} real items
          </p>
          <div className="mt-4 text-sm text-primary font-semibold">
            🔄 Live data from Family Kebab House menu database
          </div>
        </div>

        {!showRecommendations ? (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-charcoal mb-6 text-center">
              What are you in the mood for? 🤔
            </h3>

            {/* Preference Categories */}
            <div className="space-y-6 mb-8">
              {["taste", "protein", "diet", "time", "portion", "price", "style"].map(category => (
                <div key={category}>
                  <h4 className="text-lg font-semibold text-charcoal mb-3 capitalize">
                    {category === "time" ? "Dining Style" : category === "portion" ? "Appetite" : category}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {foodPreferences
                      .filter(pref => pref.category === category)
                      .map(preference => (
                        <Button
                          key={preference.id}
                          variant={selectedPreferences.includes(preference.id) ? "default" : "outline"}
                          onClick={() => togglePreference(preference.id)}
                          className={`transition-all duration-300 ${
                            selectedPreferences.includes(preference.id)
                              ? "bg-primary text-white transform scale-105"
                              : "hover:bg-primary/10 hover:scale-105"
                          }`}
                        >
                          <span className="mr-2">{preference.icon}</span>
                          {preference.label}
                        </Button>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Get Recommendations Button */}
            <div className="text-center">
              <Button
                onClick={handleGetRecommendations}
                size="lg"
                className="bg-primary hover:bg-red-700 text-white font-bold px-8 py-4 transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="mr-2 h-5 w-5" />
                Get My Perfect Recommendations
              </Button>
              {selectedPreferences.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectedPreferences.length} preference{selectedPreferences.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-charcoal mb-4">
                🎯 Perfect Matches For You!
              </h3>
              <p className="text-gray-600 mb-6">
                Based on your preferences, here are our top recommendations
              </p>
              <Button
                onClick={resetPreferences}
                variant="outline"
                className="mb-8"
              >
                🔄 Try Different Preferences
              </Button>
            </div>

            {/* Top Recommendations Grid */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-charcoal mb-6 text-center">
                🌟 Top Matches For You
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommendations.map((dish, index) => (
                  <Card key={dish.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="relative">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-white">
                        #{index + 1} Match
                      </Badge>
                      <div className="absolute top-3 right-3 text-2xl">
                        {dish.emoji}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <h4 className="font-bold text-xl text-charcoal mb-2">{dish.name}</h4>
                      <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-bold text-primary">{dish.price}</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {dish.preparationTime}
                        </div>
                      </div>

                      {/* Matching Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {dish.tags
                          .filter(tag => selectedPreferences.includes(tag))
                          .slice(0, 3)
                          .map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-accent/20 text-accent">
                              {foodPreferences.find(p => p.id === tag)?.icon}
                            </Badge>
                          ))}
                      </div>

                      <a href="tel:01692584100">
                        <Button className="w-full bg-primary hover:bg-red-700 text-white">
                          <Phone className="mr-2 h-4 w-4" />
                          Order Now
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* More Options Section */}
            {additionalRecommendations.length > 0 && (
              <div className="mb-8">
                <div className="text-center mb-6">
                  {!showMoreOptions ? (
                    <Button
                      onClick={handleShowMoreOptions}
                      variant="outline"
                      size="lg"
                      className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:border-primary hover:bg-primary/10 text-charcoal font-semibold px-8 py-4"
                    >
                      <span className="mr-2">🍽️</span>
                      Show More Options ({additionalRecommendations.length} more dishes)
                      <span className="ml-2">⬇️</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleHideMoreOptions}
                      variant="outline"
                      className="border-gray-300 hover:border-gray-400 text-gray-600"
                    >
                      <span className="mr-2">⬆️</span>
                      Show Less
                    </Button>
                  )}
                </div>

                {showMoreOptions && (
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-charcoal text-center">
                      🔍 More Great Options For You
                    </h4>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {additionalRecommendations.map((dish, index) => (
                        <Card key={dish.id} className="overflow-hidden hover:shadow-xl transition-shadow group border-accent/20">
                          <div className="relative">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <Badge className="absolute top-3 left-3 bg-accent text-white">
                              Option #{index + 9}
                            </Badge>
                            <div className="absolute top-3 right-3 text-2xl">
                              {dish.emoji}
                            </div>
                          </div>
                          
                          <CardContent className="p-6">
                            <h4 className="font-bold text-lg text-charcoal mb-2">{dish.name}</h4>
                            <p className="text-gray-600 text-sm mb-4">{dish.description}</p>
                            
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-lg font-bold text-primary">{dish.price}</div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="h-4 w-4 mr-1" />
                                {dish.preparationTime}
                              </div>
                            </div>

                            {/* Matching Tags */}
                            <div className="flex flex-wrap gap-1 mb-4">
                              {dish.tags
                                .filter(tag => selectedPreferences.includes(tag))
                                .slice(0, 3)
                                .map(tag => (
                                  <Badge key={tag} variant="secondary" className="text-xs bg-accent/20 text-accent">
                                    {foodPreferences.find(p => p.id === tag)?.icon}
                                  </Badge>
                                ))}
                            </div>

                            <a href="tel:01692584100">
                              <Button className="w-full bg-accent hover:bg-orange-600 text-white">
                                <Phone className="mr-2 h-4 w-4" />
                                Order Now
                              </Button>
                            </a>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Browse Full Menu Link */}
                    <div className="text-center mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl">
                      <h5 className="font-bold text-lg text-charcoal mb-2">
                        🍴 Want Even More Choices?
                      </h5>
                      <p className="text-gray-600 mb-4">
                        Explore our complete menu with {allDishes.length} authentic dishes from Family Kebab House
                      </p>
                      <a href="#menu-content">
                        <Button className="bg-primary hover:bg-red-700 text-white font-semibold px-6 py-3">
                          <span className="mr-2">📋</span>
                          Browse Full Menu
                          <span className="ml-2">→</span>
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Why These Recommendations */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-lg text-charcoal mb-2">
                  🧠 Why These Recommendations?
                </h4>
                <p className="text-gray-700 mb-4">
                  Our AI analyzed all {allDishes.length} authentic dishes from Family Kebab House's live menu database and matched your preferences with 
                  flavor profiles, preparation styles, and customer favorites. Each recommendation shows real prices and items 
                  you can order right now by calling 01692 584 100!
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="text-lg mb-1">🎯</div>
                    <div className="font-semibold">Smart Matching</div>
                    <div className="text-gray-600">Preferences + Menu Analysis</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="text-lg mb-1">🔄</div>
                    <div className="font-semibold">Live Database</div>
                    <div className="text-gray-600">Real-time Menu Data</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <div className="text-lg mb-1">📞</div>
                    <div className="font-semibold">Ready to Order</div>
                    <div className="text-gray-600">Call 01692 584 100</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}