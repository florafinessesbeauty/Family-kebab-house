import { useState, useEffect, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuCategory from "@/components/menu-category";
import SpecialDealCard from "@/components/special-deal-card";
import NutritionalInfoTooltip from "@/components/nutritional-info-tooltip";
import VoiceControlButton from "@/components/voice-control-button";

import AccessibilityHelpModal from "@/components/accessibility-help-modal";

import AddToBasketButton from "@/components/add-to-basket-button";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useScreenReaderAnnouncements } from "@/components/screen-reader-announcements";

import { categories } from "@/data/menu-data";
import type { MenuItemData } from "@/data/menu-data";
import { Phone, Keyboard, Eye } from "lucide-react";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("kebabs");
  const [menuData, setMenuData] = useState<MenuItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1);
  const [accessibilityMode, setAccessibilityMode] = useState(false);

  const { announce } = useScreenReaderAnnouncements();

  // Memoized helper functions for performance
  const getItemsByCategory = useCallback((category: string) =>
    menuData.filter(item => item.category === category), [menuData]);

  const getCategoryInfo = useCallback((categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category || { name: categoryId, icon: "" };
  }, []);

  // Memoized expensive calculations
  const currentCategoryItems = useMemo(
    () => getItemsByCategory(activeCategory),
    [getItemsByCategory, activeCategory]
  );

  const specialDeals = useMemo(
    () => menuData.filter(item => 
      item.isSpecial || 
      item.category === 'family-deals' || 
      item.category === 'pizza-offers' || 
      item.category === 'chicken-combo-meals' ||
      item.name.includes('Kebab Feast')
    ),
    [menuData]
  );

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
      const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
      if (currentIndex > 0) {
        setActiveCategory(categories[currentIndex - 1].id);
        setFocusedItemIndex(0);
      }
    },
    onNavigateRight: () => {
      const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
      if (currentIndex < categories.length - 1) {
        setActiveCategory(categories[currentIndex + 1].id);
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
    if (categories.find(cat => cat.id === targetCategory)) {
      setActiveCategory(targetCategory);
      setFocusedItemIndex(0);
      announce(`Navigated to ${getCategoryInfo(targetCategory).name} menu`);
    }
  };

  const handleReadMenu = () => {
    const items = currentCategoryItems;
    if (items.length > 0) {
      const menuText = items.map(item => 
        `${item.name}, ${item.description}, Price: £${item.singlePrice || 'varies'}`
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
      <div className="bg-charcoal text-white py-2 sm:py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <h2 className="text-xs sm:text-sm font-medium whitespace-nowrap">Accessibility Features:</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setAccessibilityMode(!accessibilityMode)}
                  variant="outline"
                  size="sm"
                  className={`text-xs sm:text-sm border-white text-white hover:bg-white hover:text-charcoal ${
                    accessibilityMode ? 'bg-white text-charcoal' : ''
                  }`}
                  aria-pressed={accessibilityMode}
                >
                  <Keyboard className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Keyboard Navigation</span>
                  <span className="sm:hidden">Keyboard</span>
                  <span className="ml-1">{accessibilityMode ? 'ON' : 'OFF'}</span>
                </Button>
                <Button
                  onClick={handleReadMenu}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm border-white text-white hover:bg-white hover:text-charcoal"
                  aria-label="Read current menu category aloud"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Read Menu</span>
                  <span className="sm:hidden">Read</span>
                </Button>
                <AccessibilityHelpModal />
              </div>
            </div>
            
            {accessibilityMode && (
              <div className="text-xs text-gray-300 w-full sm:w-auto mt-2 sm:mt-0">
                <span className="hidden sm:inline">Use arrow keys to navigate • Enter to order • O for quick order • I for info</span>
                <span className="sm:hidden">Arrow keys: navigate • Enter: order</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="font-poppins text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal mb-3 sm:mb-4">Our Delicious Menu</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">Fresh ingredients, authentic flavors, and unbeatable prices. Every dish made with love and care.</p>
          </div>

          {/* Special Deals First - Now with optimized performance */}
          {specialDeals.length > 0 && (
            <div className="mb-8 sm:mb-12 md:mb-16">
              <h2 className="font-poppins text-xl sm:text-2xl md:text-3xl font-bold text-charcoal mb-4 sm:mb-6 md:mb-8 text-center">🌟 Special Offers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {specialDeals.map((deal) => (
                  <SpecialDealCard key={deal.id} deal={deal} />
                ))}
              </div>
            </div>
          )}

          {/* Category Navigation */}
          <div className="bg-white shadow-lg py-4 sm:py-6 md:py-8 sticky top-0 z-30">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                {categories.map((category) => {
                  const itemCount = getItemsByCategory(category.id).length;
                  
                  return (
                    <Button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        announce(`Viewing ${category.name} category with ${itemCount} items`);
                        // Smooth scroll to menu content
                        setTimeout(() => {
                          document.getElementById('menu-content')?.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start' 
                          });
                        }, 100);
                      }}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 font-semibold transition-all duration-300 hover:scale-105 text-xs sm:text-sm md:text-base ${
                        activeCategory === category.id
                          ? "bg-primary text-white shadow-lg"
                          : "bg-white text-charcoal hover:bg-gray-100 hover:shadow-md"
                      }`}
                    >
                      <span className="mr-1 sm:mr-2 text-sm sm:text-base md:text-lg">{category.icon}</span>
                      <span className="hidden sm:inline">{category.name}</span>
                      <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                      <Badge variant="secondary" className="ml-1 sm:ml-2 bg-accent text-white text-xs">
                        {itemCount}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Menu Content */}
          <section className="py-12 relative" id="menu-content">
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
                        : activeCategory === "chicken-nuggets"
                        ? "🍗 Crispy chicken nuggets - Single, With Chips, or Meal options"
                        : activeCategory === "drinks"
                        ? "🥤 Refreshing beverages to complement your meal"
                        : activeCategory === "kids-meals"
                        ? "🧒 Kid-friendly meals perfect for little ones"
                        : ""
                    }
                    items={currentCategoryItems}
                    icon={getCategoryInfo(activeCategory).icon}
                  />
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24 space-y-8">
                    {/* Category Image */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <img
                        src={menuImages[activeCategory as keyof typeof menuImages] || menuImages.kebabs}
                        alt={getCategoryInfo(activeCategory).name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-poppins text-xl font-bold text-charcoal mb-2">
                          {getCategoryInfo(activeCategory).name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Delicious {getCategoryInfo(activeCategory).name.toLowerCase()} made fresh daily
                        </p>
                      </div>
                    </div>

                    {/* Quick Order */}
                    <div className="bg-primary text-white rounded-lg p-6 text-center">
                      <Phone className="h-8 w-8 mx-auto mb-4" />
                      <h3 className="font-poppins text-xl font-bold mb-2">Quick Order</h3>
                      <p className="text-sm mb-4">Call us directly to place your order</p>
                      <a
                        href="tel:01692584100"
                        className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                      >
                        01692 584 100
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Voice Control */}
      <VoiceControlButton
        onNavigateToCategory={handleNavigateToCategory}
        onReadMenu={handleReadMenu}
        onOrderNow={handleOrderItem}
      />
    </div>
  );
}
