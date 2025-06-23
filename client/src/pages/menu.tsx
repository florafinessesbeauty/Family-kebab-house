import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuCategory from "@/components/menu-category";
import NutritionalInfoTooltip from "@/components/nutritional-info-tooltip";
import { categories } from "@/data/menu-data";
import type { MenuItemData } from "@/data/menu-data";
import { Phone } from "lucide-react";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("kebabs");
  const [menuData, setMenuData] = useState<MenuItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("/api/menu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.error("Expected array but got:", data);
          setMenuData([]);
          return;
        }
        
        // Transform database items to match frontend interface
        const transformedData: MenuItemData[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          category: item.category,
          price: item.singlePrice,
          priceSmall: item.priceSmall,
          priceMedium: item.priceMedium,
          priceLarge: item.priceLarge,
          priceXLarge: item.priceXLarge,
          singlePrice: item.singlePrice,
          isSpecial: Boolean(item.isSpecial),
          calories: item.calories,
          protein: item.protein,
          carbs: item.carbs,
          fat: item.fat,
          fiber: item.fiber,
          sodium: item.sodium,
          allergens: item.allergens,
          ingredients: item.ingredients
        }));
        
        setMenuData(transformedData);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const getItemsByCategory = (category: string) =>
    menuData.filter(item => item.category === category);

  const getCategoryInfo = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category || { name: categoryId, icon: "" };
  };

  const menuImages = {
    kebabs: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "combination-kebabs": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    pizzas: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "fried-chicken": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "chicken-bargain-meals": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "chicken-wings-strips": "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    wings: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    wraps: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "lunch-offers": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "lunch-time-offers": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "family-deals": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    extras: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    desserts: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    nuggets: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "combo-meals": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  };

  const specialDeals = menuData.filter(item => item.isSpecial);
  
  console.log("All menu data:", menuData);
  console.log("Special deals found:", specialDeals);
  console.log("Kebab Feast in data:", menuData.find(item => item.name === "Kebab Feast"));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading delicious menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-poppins text-5xl font-bold text-charcoal mb-4">Our Delicious Menu</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fresh ingredients, authentic flavors, and unbeatable prices. Every dish made with love and care.</p>
          </div>

          {/* Special Deals First */}
          {specialDeals.length > 0 && (
            <div className="mb-16">
              <h2 className="font-poppins text-3xl font-bold text-charcoal mb-8 text-center">🌟 Special Offers</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {specialDeals.map((deal) => {
                  const isKebabFeast = deal.name === "Kebab Feast";
                  const isFamilyDeal = deal.name.includes("Family Deal");
                  const isChickenCombo = deal.name.includes("3 Pcs Chicken + 4 Spicy Wings");
                  console.log(`Deal: ${deal.name}, isKebabFeast: ${isKebabFeast}, isFamilyDeal: ${isFamilyDeal}`); // Debug log
                  return (
                    <div 
                      key={deal.id} 
                      className={`relative rounded-2xl p-6 text-white text-center transition-all duration-500 cursor-pointer group ${
                        isKebabFeast 
                          ? "bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 animate-pulse shadow-2xl transform scale-105 border-4 border-yellow-300" 
                          : isFamilyDeal
                          ? "bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 hover:scale-105 shadow-xl border-2 border-pink-300"
                          : isChickenCombo
                          ? "bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 hover:scale-105 shadow-xl border-2 border-orange-300"
                          : "bg-gradient-to-br from-accent to-orange-600 hover:scale-105"
                      }`}
                    >
                      {/* Special Animation for Kebab Feast */}
                      {isKebabFeast && (
                        <>
                          {/* Rotating ring animation */}
                          <div className="absolute inset-0 rounded-2xl border-4 border-yellow-300 animate-spin" style={{ animationDuration: '3s' }}></div>
                          
                          {/* Floating sparkles */}
                          <div className="absolute top-2 right-2 text-yellow-300 animate-bounce" style={{ animationDelay: '0s' }}>✨</div>
                          <div className="absolute top-4 left-2 text-yellow-300 animate-bounce" style={{ animationDelay: '0.5s' }}>⭐</div>
                          <div className="absolute bottom-4 right-4 text-yellow-300 animate-bounce" style={{ animationDelay: '1s' }}>💫</div>
                          
                          {/* Premium badge */}
                          <div className="absolute -top-3 -right-3 bg-yellow-400 text-red-800 px-3 py-1 rounded-full text-xs font-bold animate-pulse border-2 border-white">
                            PREMIUM FEAST
                          </div>
                        </>
                      )}

                      {/* Interactive Family Deal Highlights */}
                      {isFamilyDeal && (
                        <>
                          {/* Pulsing border on hover */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-pink-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                          
                          {/* Family icons */}
                          <div className="absolute top-2 left-2 text-pink-200 group-hover:animate-bounce">👨‍👩‍👧‍👦</div>
                          <div className="absolute top-2 right-2 text-pink-200 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}>🍽️</div>
                          
                          {/* Savings badge */}
                          <div className="absolute -top-2 -left-2 bg-green-400 text-green-900 px-2 py-1 rounded-full text-xs font-bold transform -rotate-12 group-hover:animate-pulse">
                            FAMILY SAVINGS
                          </div>
                          
                          {/* Price highlight overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </>
                      )}

                      {/* Interactive Chicken Combo Highlights */}
                      {isChickenCombo && (
                        <>
                          {/* Pulsing border on hover */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-orange-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                          
                          {/* Chicken icons */}
                          <div className="absolute top-2 left-2 text-orange-200 group-hover:animate-bounce">🍗</div>
                          <div className="absolute top-2 right-2 text-orange-200 group-hover:animate-bounce" style={{ animationDelay: '0.2s' }}>🔥</div>
                          <div className="absolute bottom-2 left-2 text-orange-200 group-hover:animate-bounce" style={{ animationDelay: '0.4s' }}>🍟</div>
                          
                          {/* Spicy badge */}
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold transform rotate-12 group-hover:animate-pulse">
                            SPICY COMBO
                          </div>
                          
                          {/* Price highlight overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </>
                      )}
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <h3 className={`font-bold text-lg transition-all duration-300 ${
                            isKebabFeast ? 'text-yellow-100 text-xl' : 
                            isFamilyDeal ? 'text-pink-100 group-hover:text-white group-hover:text-xl' : 
                            isChickenCombo ? 'text-orange-100 group-hover:text-white group-hover:text-xl' : ''
                          }`}>
                            {deal.name}
                          </h3>
                          <div 
                            className="text-white/70 hover:text-white flex-shrink-0"
                            style={{ 
                              position: 'relative',
                              zIndex: 99998
                            }}
                          >
                            <NutritionalInfoTooltip 
                              itemName={deal.name} 
                              category={deal.category}
                              nutritionalData={{
                                calories: deal.calories,
                                protein: deal.protein,
                                carbs: deal.carbs,
                                fat: deal.fat,
                                fiber: deal.fiber,
                                sodium: deal.sodium,
                                allergens: deal.allergens,
                                ingredients: deal.ingredients
                              }}
                            />
                          </div>
                        </div>
                        <p className={`text-sm mb-4 transition-all duration-300 ${
                          isKebabFeast ? 'text-yellow-100' : 
                          isFamilyDeal ? 'text-pink-100 group-hover:text-white' : 
                          isChickenCombo ? 'text-orange-100 group-hover:text-white' : 'text-orange-100'
                        }`}>
                          {deal.description}
                        </p>
                        <div className={`font-bold mb-3 transition-all duration-300 ${
                          isKebabFeast ? 'text-3xl text-yellow-200 animate-pulse' : 
                          isFamilyDeal ? 'text-2xl text-pink-100 group-hover:text-3xl group-hover:text-white group-hover:animate-pulse' : 
                          isChickenCombo ? 'text-2xl text-orange-100 group-hover:text-3xl group-hover:text-white group-hover:animate-pulse' :
                          'text-2xl'
                        }`}>
                          {(() => {
                            // Create a hardcoded price mapping for special offers based on your menu specification
                            const specialOfferPrices: { [key: string]: number } = {
                              "Chicken Burger + Chips & Drink": 7.90,
                              "¼ Pounder with Cheese + Chips & Drink": 7.90,
                              "½ Pounder with Double Cheese + Chips & Drink": 9.50,
                              "Medium Doner Meat + Chips & Drink": 7.90,
                              "Large Doner Meat + Chips & Drink": 9.50,
                              "10\" Margherita with 3 Toppings + Drink": 9.50,
                              "12\" Margherita with 3 Toppings + Drink": 12.50,
                              "2× 10\" Pizzas from Set-Menu": 17.20,
                              "2× 12\" Pizzas from Set-Menu": 22.50,
                              "Family Deal (10\" Pizza)": 26.90,
                              "Family Deal (12\" Pizza)": 28.90,
                              "Kebab Feast": 30.00,
                              "3 Pcs Chicken + 4 Spicy Wings + Chips & Drink": 11.50
                            };
                            
                            const price = specialOfferPrices[deal.name] || deal.singlePrice || deal.priceSmall || deal.priceMedium || deal.priceLarge;
                            const originalPrice = price ? price * 1.25 : null; // Show savings
                            
                            return (
                              <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-3xl">£{price ? price.toFixed(2) : "0.00"}</span>
                                  {originalPrice && (
                                    <span className="text-lg text-white/60 line-through">
                                      £{originalPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                                {originalPrice && (
                                  <div className="text-sm bg-white/20 rounded-full px-3 py-1 inline-block">
                                    Save £{(originalPrice - price!).toFixed(2)}
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                        <a href="tel:01692584100">
                          <Button className={`w-full transition-all duration-300 ${
                            isKebabFeast 
                              ? "bg-yellow-400 text-red-800 hover:bg-yellow-300 font-bold transform hover:scale-105 shadow-lg" 
                              : isFamilyDeal
                              ? "bg-pink-400 text-purple-900 hover:bg-pink-300 font-bold transform group-hover:scale-105 shadow-lg group-hover:animate-bounce"
                              : isChickenCombo
                              ? "bg-orange-400 text-red-900 hover:bg-orange-300 font-bold transform group-hover:scale-105 shadow-lg group-hover:animate-bounce"
                              : "bg-white text-accent hover:bg-gray-100"
                          }`}>
                            {isKebabFeast ? "🔥 Order Premium Feast!" : 
                             isFamilyDeal ? "👨‍👩‍👧‍👦 Order Family Deal!" : 
                             isChickenCombo ? "🍗 Order Spicy Combo!" :
                             "Order Now"}
                          </Button>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Menu Categories Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => {
              const itemCount = getItemsByCategory(category.id).length;
              if (itemCount === 0) return null;
              
              return (
                <Button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    // Smooth scroll to menu content section
                    setTimeout(() => {
                      const menuSection = document.getElementById('menu-content');
                      if (menuSection) {
                        menuSection.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start'
                        });
                      }
                    }, 100);
                  }}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 ${
                    activeCategory === category.id
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-charcoal hover:bg-gray-100 hover:shadow-md"
                  }`}
                >
                  <span className="mr-2 text-lg">{category.icon}</span>
                  {category.name}
                  <Badge variant="secondary" className="ml-2 bg-accent text-white">
                    {itemCount}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section id="menu-content" className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 relative">
              <MenuCategory
                title={getCategoryInfo(activeCategory).name}
                description={
                  activeCategory === "kebabs" 
                    ? "🥙 All kebabs come with fresh salad & delicious sauce"
                    : activeCategory === "combination-kebabs"
                    ? "🥩 Choose any two kebab types - all £13.00 + extras available"
                    : activeCategory === "pizzas"
                    ? "🍕 Made with 100% fresh daily dough"
                    : activeCategory === "lunch-offers"
                    ? "⏰ Available 12:00 - 14:30 daily"
                    : activeCategory === "family-deals"
                    ? "👨‍👩‍👧‍👦 Perfect for sharing with loved ones"
                    : activeCategory === "wraps"
                    ? "🌯 Fresh wraps with your choice of fillings, salad & sauce"
                    : activeCategory === "chicken-bargain-meals"
                    ? "🍱 Great value chicken meals with chips & coleslaw"
                    : activeCategory === "chicken-wings-strips"
                    ? "🔥 Spicy wings and tender strips - Single, With Chips, or Meal options"
                    : undefined
                }
                items={getItemsByCategory(activeCategory)}
                icon={getCategoryInfo(activeCategory).icon}
              />
            </div>

            <div className="space-y-6">
              {/* Category Image */}
              {menuImages[activeCategory as keyof typeof menuImages] && (
                <img 
                  src={menuImages[activeCategory as keyof typeof menuImages]}
                  alt={`${getCategoryInfo(activeCategory).name} dishes`}
                  className="rounded-2xl shadow-lg w-full h-80 object-cover"
                />
              )}

              {/* Order Now Card */}
              <div className="bg-gradient-to-br from-accent to-orange-600 p-8 rounded-2xl text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 text-6xl opacity-20">🍽️</div>
                <h3 className="font-poppins text-2xl font-bold mb-4">🔥 Ready to Order?</h3>
                <p className="mb-6 text-orange-100">Call us now and your delicious meal will be ready in just 15 minutes! ⏱️</p>
                <a href="tel:01692584100">
                  <Button className="bg-white text-accent hover:bg-gray-100 w-full transform hover:scale-105 transition-transform">
                    <Phone className="mr-2 h-4 w-4" />
                    📞 Call 01692 584100
                  </Button>
                </a>
              </div>

              {/* Important Info */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-primary">
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-4">📋 Important Information</h3>
                <ul className="space-y-4 text-gray-700 text-sm">
                  <li className="flex items-start p-3 bg-red-50 rounded-lg">
                    <span className="text-2xl mr-3">💰</span>
                    <span><strong className="text-primary">Cash payment only</strong></span>
                  </li>
                  <li className="flex items-start p-3 bg-orange-50 rounded-lg">
                    <span className="text-2xl mr-3">🎉</span>
                    <span><strong className="text-primary">Party orders welcome</strong> - Call ahead for large orders</span>
                  </li>
                  <li className="flex items-start p-3 bg-yellow-50 rounded-lg">
                    <span className="text-2xl mr-3">⚠️</span>
                    <span>Please speak to our staff about <strong className="text-primary">food allergies and intolerances</strong> in your meal when making your order</span>
                  </li>
                  <li className="flex items-start p-3 bg-green-50 rounded-lg">
                    <span className="text-2xl mr-3">🕐</span>
                    <span><strong className="text-primary">Lunch offers:</strong> Special pricing 12:00 - 14:30</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
