import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuCategory from "@/components/menu-category";
import NutritionalInfoTooltip from "@/components/nutritional-info-tooltip";
import VoiceControlButton from "@/components/voice-control-button";
import { parsePrice, safeToFixed } from '@/utils/price-utils';

import AccessibilityHelpModal from "@/components/accessibility-help-modal";

import AddToBasketButton from "@/components/add-to-basket-button";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useScreenReaderAnnouncements } from "@/components/screen-reader-announcements";

import type { MenuItemData } from "@/data/menu-data";
import { categoryNames } from "@/data/categoryNames";
import { Phone, Keyboard, Eye } from "lucide-react";

// Unified category mapping that aligns with actual API data
const UNIFIED_CATEGORIES = {
  "burgers": { name: "Burgers", icon: "🍔" },
  "drinks": { name: "Drinks", icon: "🥤" },
  "kebabs": { name: "Kebabs", icon: "🥙" }, 
  "pizzas": { name: "Pizzas", icon: "🍕" },
  "sides": { name: "Sides & Extras", icon: "🍟" },
  "specials": { name: "Special Offers", icon: "⭐" }
} as const;

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("");
  const [menuData, setMenuData] = useState<MenuItemData[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const { announce } = useScreenReaderAnnouncements();

  // Define helper functions first
  const getItemsByCategory = (category: string) => {
    const items = menuData.filter(item => item.category === category);
    return items;
  };

  const getCategoryInfo = (categoryId: string) => {
    // First try categoryNames.ts for consistent naming
    const categoryName = categoryNames[categoryId as keyof typeof categoryNames];
    if (categoryName) {
      const unifiedCategory = UNIFIED_CATEGORIES[categoryId as keyof typeof UNIFIED_CATEGORIES];
      return {
        id: categoryId,
        name: categoryName,
        icon: unifiedCategory?.icon || "🍽️",
        count: getItemsByCategory(categoryId).length
      };
    }
    
    // Fallback to unified categories
    const unifiedCategory = UNIFIED_CATEGORIES[categoryId as keyof typeof UNIFIED_CATEGORIES];
    if (unifiedCategory) {
      return {
        id: categoryId,
        name: unifiedCategory.name,
        icon: unifiedCategory.icon,
        count: getItemsByCategory(categoryId).length
      };
    }
    
    return { 
      id: categoryId,
      name: categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), 
      icon: "🍽️",
      count: getItemsByCategory(categoryId).length
    };
  };

  const currentCategoryItems = getItemsByCategory(activeCategory);

  // Keyboard navigation
  useKeyboardNavigation({
    onNavigateUp: () => {
      if (focusedItemIndex > 0) {
        setFocusedItemIndex(focusedItemIndex - 1);
      }
    },
    onNavigateDown: () => {
      if (focusedItemIndex < currentCategoryItems.length - 1) {
        setFocusedItemIndex(focusedItemIndex + 1);
      }
    },
    onNavigateLeft: () => {
      const currentIndex = availableCategories.findIndex(catId => catId === activeCategory);
      if (currentIndex > 0) {
        setActiveCategory(availableCategories[currentIndex - 1]);
        setFocusedItemIndex(0);
      }
    },
    onNavigateRight: () => {
      const currentIndex = availableCategories.findIndex(catId => catId === activeCategory);
      if (currentIndex < availableCategories.length - 1) {
        setActiveCategory(availableCategories[currentIndex + 1]);
        setFocusedItemIndex(0);
      }
    },
    onSelect: () => {
      if (focusedItemIndex >= 0 && currentCategoryItems[focusedItemIndex]) {
        window.location.href = 'tel:01692584100';
      }
    },
    onHome: () => {
      setFocusedItemIndex(0);
    },
    onEnd: () => {
      setFocusedItemIndex(currentCategoryItems.length - 1);
    },
    disabled: !accessibilityMode
  });

  // Voice control handlers
  const handleNavigateToCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'kebabs': 'kebabs',
      'pizzas': 'pizzas', 
      'burgers': 'burgers',
      'chicken': 'fried-chicken',
      'drinks': 'drinks',
      'lunch': 'lunch-time-offers',
      'offers': 'lunch-time-offers'
    };
    
    const targetCategory = categoryMap[category] || category;
    if (availableCategories.includes(targetCategory)) {
      setActiveCategory(targetCategory);
      setFocusedItemIndex(0);
      announce(`Navigated to ${getCategoryInfo(targetCategory).name} menu`);
    }
  };

  const handleReadMenu = () => {
    const items = currentCategoryItems;
    if (items.length > 0) {
      const menuText = items.map(item => 
        `${item.name}, ${item.description}, Price: ${item.singlePrice ? `£${parsePrice(item.singlePrice).toFixed(2)}` : 'varies'}`
      ).join('. ');
      
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(`Menu items in ${getCategoryInfo(activeCategory).name}: ${menuText}`);
        utterance.rate = 0.8;
        speechSynthesis.speak(utterance);
      }
    }
  };

  const handleOrderItem = () => {
    window.location.href = 'tel:01692584100';
  };

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
          // Handle non-array data gracefully
          setMenuData([]);
          return;
        }
        
        // Transform database items to match frontend interface
        const transformedData: MenuItemData[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          category: item.category,
          // Convert all price strings to numbers, using undefined instead of null
          singlePrice: item.singlePrice ? parseFloat(item.singlePrice) : undefined,
          priceSmall: item.priceSmall ? parseFloat(item.priceSmall) : undefined,
          priceMedium: item.priceMedium ? parseFloat(item.priceMedium) : undefined,
          priceLarge: item.priceLarge ? parseFloat(item.priceLarge) : undefined,
          priceXLarge: item.priceXLarge ? parseFloat(item.priceXLarge) : undefined,
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
        
        // This will be set above in the combined data logic
        
        // Import static menu data for categories not in API
        const { menuData: staticMenuData } = await import('@/data/menu-data');
        
        // Combine API data with static data for complete menu
        const combinedData = [...transformedData];
        
        // Add static menu items for categories not covered by API
        staticMenuData.forEach(staticItem => {
          const existsInApi = transformedData.some(apiItem => apiItem.id === staticItem.id);
          if (!existsInApi) {
            combinedData.push(staticItem);
          }
        });
        
        setMenuData(combinedData);
        
        // Use all defined categories from categoryNames
        const allDefinedCategories = Object.keys(categoryNames);
        const apiCategories = Array.from(
          new Set(transformedData.map(item => item.category))
        );
        const staticCategories = Array.from(
          new Set(staticMenuData.map(item => item.category))
        );
        
        console.log('API Categories:', apiCategories);
        console.log('Static Categories:', staticCategories);
        console.log('All Defined Categories:', allDefinedCategories);
        console.log('Total combined items:', combinedData.length);
        
        // Show all defined categories
        setAvailableCategories(allDefinedCategories);
        
        // Set activeCategory to first category with items from combined data
        const firstCategoryWithItems = allDefinedCategories.find(cat => 
          combinedData.some(item => item.category === cat)
        );
        const defaultCategory = firstCategoryWithItems || allDefinedCategories[0];
        
        if (!activeCategory && defaultCategory) {
          setActiveCategory(defaultCategory);
          console.log('Setting active category to:', defaultCategory);
        }
      } catch (error) {
        // Handle fetch error gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  const menuImages = {
    kebabs: "https://images.unsplash.com/photo-1529042410759-befb1204b468?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "combination-kebabs": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    pizzas: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "fried-chicken": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "chicken-bargain-meals": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "chicken-wings-strips": "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "chicken-nuggets": "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    wings: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    wraps: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "lunch-offers": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "lunch-time-offers": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "family-deals": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    extras: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "kids-meals": "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    desserts: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    nuggets: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "combo-meals": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  };

  const specialDeals = menuData.filter(item => 
    item.isSpecial === true || 
    item.category === "specials" ||
    (item.name && item.name.includes("Family Deal")) ||
    (item.name && item.name.includes("Kebab Feast")) ||
    (item.singlePrice && parseFloat(item.singlePrice.toString()) < 8)
  );

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
        {/* Accessibility Controls */}
          <div className="bg-charcoal text-white py-4 sticky top-0 z-40">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-sm font-medium">Accessibility Features:</h2>
              <Button
                onClick={() => setAccessibilityMode(!accessibilityMode)}
                variant="outline"
                size="sm"
                className={`border-white text-white hover:bg-white hover:text-charcoal ${
                  accessibilityMode ? 'bg-white text-charcoal' : ''
                }`}
                aria-pressed={accessibilityMode}
              >
                <Keyboard className="h-4 w-4 mr-2" />
                Keyboard Navigation {accessibilityMode ? 'ON' : 'OFF'}
              </Button>
              <Button
                onClick={handleReadMenu}
                variant="outline"
                size="sm"
                className="border-white text-white hover:bg-white hover:text-charcoal"
                aria-label="Read current menu category aloud"
              >
                <Eye className="h-4 w-4 mr-2" />
                Read Menu
              </Button>
              <AccessibilityHelpModal />
            </div>
            
            {accessibilityMode && (
              <div className="text-xs text-gray-300">
                Use arrow keys to navigate • Enter to order • O for quick order • I for info
              </div>
            )}
          </div>
        </div>
      </div>

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
                  const isKebabFeast = deal.name === "Kebab Feast" || deal.name === "🎉 Kebab Feast";
                  const isFamilyDeal = deal.name.includes("Family Deal");
                  const isChickenCombo = deal.name.includes("3 Pcs Chicken + 4 Spicy Wings");

                  return (
                    <div 
                      key={deal.id} 
                      className={`relative rounded-2xl p-6 text-white text-center transition-all duration-500 cursor-pointer group ${
                        isKebabFeast 
                          ? "bg-gradient-to-br from-yellow-400 via-amber-500 via-orange-600 to-red-700 animate-pulse shadow-2xl transform scale-110 border-8 border-yellow-300 hover:scale-115 hover:shadow-3xl" 
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
                          {/* Multiple rotating rings */}
                          <div className="absolute inset-0 rounded-2xl border-8 border-yellow-300 animate-spin" style={{ animationDuration: '3s' }}></div>
                          <div className="absolute inset-2 rounded-2xl border-4 border-orange-400 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
                          <div className="absolute inset-4 rounded-2xl border-2 border-red-400 animate-spin" style={{ animationDuration: '4s' }}></div>
                          
                          {/* Enhanced floating sparkles */}
                          <div className="absolute top-1 right-1 text-yellow-300 animate-bounce text-2xl" style={{ animationDelay: '0s' }}>✨</div>
                          <div className="absolute top-3 left-1 text-yellow-300 animate-bounce text-xl" style={{ animationDelay: '0.5s' }}>⭐</div>
                          <div className="absolute bottom-3 right-3 text-yellow-300 animate-bounce text-2xl" style={{ animationDelay: '1s' }}>💫</div>
                          <div className="absolute bottom-1 left-3 text-orange-300 animate-bounce text-xl" style={{ animationDelay: '1.5s' }}>🌟</div>
                          <div className="absolute top-1/2 left-1 text-red-300 animate-bounce text-lg" style={{ animationDelay: '2s' }}>⚡</div>
                          <div className="absolute top-1/2 right-1 text-yellow-200 animate-bounce text-lg" style={{ animationDelay: '2.5s' }}>🔥</div>
                          
                          {/* Glowing effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-red-600/20 animate-pulse"></div>
                          
                          {/* Premium badge enhanced */}
                          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-4 py-2 rounded-full text-sm font-black animate-pulse border-4 border-white shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                            🏆 ULTIMATE FEAST 🏆
                          </div>
                          
                          {/* Value highlight */}
                          <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-green-900 px-3 py-1 rounded-full text-xs font-bold animate-bounce border-2 border-white transform -rotate-12">
                            BEST VALUE!
                          </div>
                          
                          {/* Pulsing glow border */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl opacity-75 blur-sm animate-pulse"></div>
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
                            isKebabFeast ? 'text-yellow-100 text-2xl font-black animate-pulse' : 
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
                                protein: deal.protein?.toString(),
                                carbs: deal.carbs?.toString(),
                                fat: deal.fat?.toString(),
                                fiber: deal.fiber?.toString(),
                                sodium: deal.sodium?.toString(),
                                allergens: Array.isArray(deal.allergens) ? deal.allergens : (deal.allergens ? [deal.allergens] : undefined),
                                ingredients: deal.ingredients ? [deal.ingredients] : undefined
                              }}
                            />
                          </div>
                        </div>
                        <p className={`text-sm mb-4 transition-all duration-300 ${
                          isKebabFeast ? 'text-yellow-100 font-bold text-base' : 
                          isFamilyDeal ? 'text-pink-100 group-hover:text-white' : 
                          isChickenCombo ? 'text-orange-100 group-hover:text-white' : 'text-orange-100'
                        }`}>
                          {deal.description}
                        </p>
                        <div className={`font-bold mb-3 transition-all duration-300 ${
                          isKebabFeast ? 'text-4xl text-yellow-200 animate-pulse font-black' : 
                          isFamilyDeal ? 'text-2xl text-pink-100 group-hover:text-3xl group-hover:text-white group-hover:animate-pulse' : 
                          isChickenCombo ? 'text-2xl text-orange-100 group-hover:text-3xl group-hover:text-white group-hover:animate-pulse' :
                          'text-2xl'
                        }`}>
                          {(() => {
                            // Create a comprehensive price mapping for special offers matching exact database names
                            const specialOfferPrices: { [key: string]: number } = {
                              // Lunch Time Offers
                              "⏰ Chicken Burger + Chips & Drink": 7.90,
                              "⏰ ¼ Pounder with Cheese + Chips & Drink": 7.90,
                              "⏰ ½ Pounder with Double Cheese + Chips & Drink": 9.50,
                              "⏰ Medium Doner Meat + Chips & Drink": 7.90,
                              "⏰ Large Doner Meat + Chips & Drink": 9.50,
                              "⏰ 10\" Margherita with 3 Toppings + Drink": 9.50,
                              "⏰ 12\" Margherita with 3 Toppings + Drink": 12.50,
                              
                              // Pizza Offers
                              "🍕 2× 10\" Pizzas from Set-Menu": 17.20,
                              "🍕 2× 12\" Pizzas from Set-Menu": 22.50,
                              
                              // Family Deals
                              "👨‍👩‍👧‍👦 Family Deal (10\" Pizza)": 26.90,
                              "👨‍👩‍👧‍👦 Family Deal (12\" Pizza)": 28.90,
                              
                              // Kebab Feast
                              "🎉 Kebab Feast": 30.00,
                              
                              // Chicken Combo Meals
                              "🍗 3 Pcs Chicken + 4 Spicy Wings + Chips & Drink": 11.50,
                              
                              // Fallback for names without emojis
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
                            
                            // Try multiple price sources
                            let price = specialOfferPrices[deal.name] || 
                                       deal.singlePrice || 
                                       deal.singlePrice || 
                                       deal.priceSmall || 
                                       deal.priceMedium || 
                                       deal.priceLarge;
                            
                            // If still no price, try removing emoji prefix for matching
                            if (!price) {
                              const nameWithoutEmoji = deal.name.replace(/^[^\w\s]+\s*/, '').trim();
                              price = specialOfferPrices[nameWithoutEmoji];
                            }
                            
                            const numPrice = typeof price === 'string' ? parseFloat(price) : price ?? 0;
const originalPrice = numPrice * 1.25; // Show savings                          
                            return (
                              <div className="space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                  <span className="text-3xl">£{price ? safeToFixed(price) : "Contact Us"}</span>
                                  {originalPrice && price && (
                                    <span className="text-lg text-white/60 line-through">
                                      £{safeToFixed(originalPrice)}
                                    </span>
                                  )}
                                </div>
                                {originalPrice && price && (
                                  <div className="text-sm bg-white/20 rounded-full px-3 py-1 inline-block">
                                    Save £let priceNum = safeToNumber(price);
                                    const originalPrice = priceNum * 1.25;
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                        <div className="space-y-3">
                          <AddToBasketButton 
                            item={{
                              id: `special-deal-${deal.id}`,
                              name: deal.name,
                              category: deal.category || 'special-offers',
                              singlePrice: (() => {
                                const specialOfferPrices: { [key: string]: number } = {
                                  "⏰ Chicken Burger + Chips & Drink": 7.90,
                                  "⏰ ¼ Pounder with Cheese + Chips & Drink": 7.90,
                                  "⏰ ½ Pounder with Double Cheese + Chips & Drink": 9.50,
                                  "⏰ Medium Doner Meat + Chips & Drink": 7.90,
                                  "⏰ Large Doner Meat + Chips & Drink": 9.50,
                                  "⏰ 10\" Margherita with 3 Toppings + Drink": 9.50,
                                  "⏰ 12\" Margherita with 3 Toppings + Drink": 12.50,
                                  "🍕 2× 10\" Pizzas from Set-Menu": 17.20,
                                  "🍕 2× 12\" Pizzas from Set-Menu": 22.50,
                                  "👨‍👩‍👧‍👦 Family Deal (10\" Pizza)": 26.90,
                                  "👨‍👩‍👧‍👦 Family Deal (12\" Pizza)": 28.90,
                                  "🎉 Kebab Feast": 30.00,
                                  "🍗 3 Pcs Chicken + 4 Spicy Wings + Chips & Drink": 11.50
                                };
                                return specialOfferPrices[deal.name] || deal.singlePrice || deal.priceSmall || deal.priceMedium || deal.priceLarge || 0;
                              })(),
                              description: deal.description
                            }}
                            className={`w-full transition-all duration-300 ${
                              isKebabFeast 
                                ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white hover:from-yellow-300 hover:via-orange-300 hover:to-red-400 font-black text-lg transform hover:scale-110 shadow-2xl animate-pulse hover:animate-none border-4 border-white" 
                                : isFamilyDeal
                                ? "bg-pink-400 text-purple-900 hover:bg-pink-300 font-bold transform group-hover:scale-105 shadow-lg"
                                : isChickenCombo
                                ? "bg-orange-400 text-red-900 hover:bg-orange-300 font-bold transform group-hover:scale-105 shadow-lg"
                                : "bg-primary text-white hover:bg-red-700"
                            }`}
                          />
                          <a href="tel:01692584100">
                            <Button variant="outline" className="w-full bg-white/90 hover:bg-white text-charcoal border-2">
                              📞 Call to Order
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* Menu Categories Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {availableCategories.map((categoryId: string) => {
              const itemCount = getItemsByCategory(categoryId).length;
              const categoryInfo = getCategoryInfo(categoryId);
              
              // Show all categories, even if they have 0 items
              // if (itemCount === 0) return null;
              
              return (
                <Button
                  key={categoryId}
                  onClick={() => {
                    setActiveCategory(categoryId);
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
                  variant={activeCategory === categoryId ? "default" : "outline"}
                  className={`px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 ${
                    activeCategory === categoryId
                      ? "bg-primary text-white shadow-lg"
                      : "bg-white text-charcoal hover:bg-gray-100 hover:shadow-md"
                  }`}
                >
                  <span className="mr-2 text-lg">{categoryInfo.icon}</span>
                  {categoryInfo.name}
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
      <section className="py-12 relative" id="menu-content">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 relative">
              <MenuCategory
                title={getCategoryInfo(activeCategory).name}
                description={
                  activeCategory === "kebabs" 
                    ? "All kebabs come with fresh salad & delicious sauce"
                    : activeCategory === "burgers"
                    ? "Juicy burgers made with fresh ingredients"
                    : activeCategory === "pizzas"
                    ? "Made with 100% fresh daily dough"
                    : activeCategory === "drinks"
                    ? "Refreshing beverages to complement your meal"
                    : activeCategory === "sides"
                    ? "Perfect sides to complete your meal"
                    : activeCategory === "specials"
                    ? "Our featured special offers and deals"
                    : `Delicious ${getCategoryInfo(activeCategory).name.toLowerCase()} made fresh daily`
                }
                items={getItemsByCategory(activeCategory)}
                icon={getCategoryInfo(activeCategory).icon}
              />
            </div>

            <div className="lg:col-span-1 space-y-6">
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

      {/* Voice Control Button */}
      <VoiceControlButton
        onNavigateToCategory={handleNavigateToCategory}
        onReadMenu={handleReadMenu}
        onOrderItem={handleOrderItem}
      />
    </div>
  );
}
