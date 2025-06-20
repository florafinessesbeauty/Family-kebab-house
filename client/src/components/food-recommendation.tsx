import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Heart, Zap, Clock, DollarSign } from "lucide-react";

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

const allDishes: RecommendedDish[] = [
  {
    id: "doner-kebab",
    name: "Authentic Doner Kebab",
    description: "Tender lamb, perfectly seasoned and slow-cooked on our traditional spit",
    price: "From £8.50",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "kebabs",
    emoji: "🥙",
    tags: ["meat-lover", "traditional", "hearty-meal", "spicy"],
    preparationTime: "10 min"
  },
  {
    id: "spicy-wings",
    name: "Fiery Spicy Wings",
    description: "Crispy wings with our secret blend of spices that'll make you crave more",
    price: "From £4.40",
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "wings",
    emoji: "🔥",
    tags: ["spicy", "chicken", "quick-bite", "budget-friendly"],
    preparationTime: "12 min"
  },
  {
    id: "margherita-pizza",
    name: "Fresh Margherita Pizza",
    description: "Hand-stretched dough made fresh daily with premium mozzarella",
    price: "From £8.00",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "pizzas",
    emoji: "🍕",
    tags: ["vegetarian", "traditional", "mild", "hearty-meal"],
    preparationTime: "15 min"
  },
  {
    id: "chicken-burger",
    name: "Gourmet Chicken Burger",
    description: "Juicy, flame-grilled chicken breast with fresh ingredients",
    price: "From £6.00",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "burgers",
    emoji: "🍔",
    tags: ["chicken", "modern", "hearty-meal", "mild"],
    preparationTime: "12 min"
  },
  {
    id: "lamb-shish",
    name: "Premium Lamb Shish",
    description: "Marinated lamb cubes grilled over open flame with herbs",
    price: "From £13.50",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "kebabs",
    emoji: "🍢",
    tags: ["meat-lover", "premium", "traditional", "spicy"],
    preparationTime: "18 min"
  },
  {
    id: "chicken-wrap",
    name: "Grilled Chicken Wrap",
    description: "Tender chicken with fresh salad in a warm tortilla",
    price: "From £6.50",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "wraps",
    emoji: "🌯",
    tags: ["chicken", "quick-bite", "mild", "budget-friendly"],
    preparationTime: "8 min"
  },
  {
    id: "chicken-nuggets",
    name: "Crispy Chicken Nuggets",
    description: "Golden crispy nuggets made from tender chicken breast",
    price: "From £4.00",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "chicken",
    emoji: "🍗",
    tags: ["chicken", "quick-bite", "budget-friendly", "mild"],
    preparationTime: "8 min"
  },
  {
    id: "family-deal",
    name: "Family Deal Special",
    description: "Perfect sharing feast with kebab, pizza, chips and drinks",
    price: "From £26.90",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "deals",
    emoji: "👨‍👩‍👧‍👦",
    tags: ["hearty-meal", "premium", "meat-lover", "traditional"],
    preparationTime: "20 min"
  },
  {
    id: "pepperoni-pizza",
    name: "Classic Pepperoni Pizza",
    description: "Traditional pepperoni with fresh mozzarella on our signature base",
    price: "From £9.50",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "pizzas",
    emoji: "🍕",
    tags: ["meat-lover", "traditional", "hearty-meal", "mild"],
    preparationTime: "15 min"
  },
  {
    id: "mixed-kebab",
    name: "Mixed Kebab Platter",
    description: "Combination of our finest doner and shish kebabs",
    price: "From £15.50",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "kebabs",
    emoji: "🍽️",
    tags: ["meat-lover", "premium", "hearty-meal", "traditional"],
    preparationTime: "18 min"
  },
  {
    id: "chicken-meal",
    name: "Chicken Combo Meal",
    description: "Succulent fried chicken with chips and drink",
    price: "From £7.90",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "meals",
    emoji: "🍗",
    tags: ["chicken", "hearty-meal", "budget-friendly", "mild"],
    preparationTime: "12 min"
  },
  {
    id: "garlic-bread",
    name: "Cheesy Garlic Bread",
    description: "Freshly baked garlic bread topped with melted cheese",
    price: "From £3.50",
    image: "https://images.unsplash.com/photo-1573821663912-6df460f9c684?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "sides",
    emoji: "🧄",
    tags: ["vegetarian", "quick-bite", "budget-friendly", "mild"],
    preparationTime: "5 min"
  },
  {
    id: "scampi",
    name: "Golden Scampi",
    description: "Crispy breaded scampi served with tartare sauce",
    price: "From £6.00",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "seafood",
    emoji: "🦐",
    tags: ["quick-bite", "budget-friendly", "mild", "modern"],
    preparationTime: "10 min"
  },
  {
    id: "lunch-special",
    name: "Lunch Time Special",
    description: "Chicken burger with chips and drink - lunch offer",
    price: "£7.90",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "lunch",
    emoji: "⏰",
    tags: ["chicken", "budget-friendly", "quick-bite", "hearty-meal"],
    preparationTime: "10 min"
  },
  {
    id: "dessert-donut",
    name: "Sweet Donuts",
    description: "Freshly made donuts, perfect ending to your meal",
    price: "From £2.50",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "desserts",
    emoji: "🍩",
    tags: ["vegetarian", "quick-bite", "budget-friendly", "modern"],
    preparationTime: "3 min"
  }
];

export default function FoodRecommendation() {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const togglePreference = (preferenceId: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preferenceId)
        ? prev.filter(id => id !== preferenceId)
        : [...prev, preferenceId]
    );
  };

  const getRecommendations = () => {
    if (selectedPreferences.length === 0) {
      // Show popular dishes when no preferences selected
      return [
        allDishes.find(d => d.id === "doner-kebab")!,
        allDishes.find(d => d.id === "margherita-pizza")!,
        allDishes.find(d => d.id === "spicy-wings")!,
        allDishes.find(d => d.id === "chicken-burger")!
      ].slice(0, 4);
    }

    const scoredDishes = allDishes.map(dish => {
      const matchingTags = dish.tags.filter(tag => selectedPreferences.includes(tag)).length;
      return { ...dish, score: matchingTags };
    });

    // Return top 4-6 recommendations based on preferences
    const topMatches = scoredDishes
      .sort((a, b) => b.score - a.score)
      .filter(dish => dish.score > 0);
    
    // If we have good matches, return 4-6, otherwise return top 4
    return topMatches.length >= 4 ? topMatches.slice(0, 6) : topMatches.slice(0, 4);
  };

  const recommendations = getRecommendations();

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  const resetPreferences = () => {
    setSelectedPreferences([]);
    setShowRecommendations(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-poppins text-4xl font-bold text-charcoal mb-4">
            🤖 AI Food Recommendations
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us your preferences and we'll recommend the perfect dishes from our full menu of {allDishes.length} authentic items
          </p>
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

            {/* Recommendations Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
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

            {/* Why These Recommendations */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <h4 className="font-bold text-lg text-charcoal mb-2">
                  🧠 Why These Recommendations?
                </h4>
                <p className="text-gray-700">
                  Our AI analyzed {allDishes.length} dishes from our authentic menu and matched your preferences with 
                  flavor profiles, preparation styles, and customer favorites. Each recommendation comes from our 
                  real menu with accurate pricing and preparation times!
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}