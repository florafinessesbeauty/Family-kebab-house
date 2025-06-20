import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuCategory from "@/components/menu-category";
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
        const data = await response.json();
        
        // Transform database items to match frontend interface
        const transformedData: MenuItemData[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.name,
          description: item.description,
          category: item.category,
          singlePrice: item.singlePrice,
          priceSmall: item.priceSmall,
          priceMedium: item.priceMedium,
          priceLarge: item.priceLarge,
          priceXLarge: item.priceXLarge,
          isSpecial: item.isSpecial || false
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
    pizzas: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    burgers: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "fried-chicken": "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    wings: "https://images.unsplash.com/photo-1608039755401-742074f0548d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    wraps: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    "lunch-offers": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "family-deals": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    extras: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    desserts: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    nuggets: "https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    "combo-meals": "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    drinks: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  };

  const specialDeals = menuData.filter(item => item.isSpecial);

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
                {specialDeals.map((deal) => (
                  <div key={deal.id} className="bg-gradient-to-br from-accent to-orange-600 rounded-2xl p-6 text-white text-center">
                    <h3 className="font-bold text-lg mb-2">{deal.name}</h3>
                    <p className="text-orange-100 text-sm mb-4">{deal.description}</p>
                    <div className="text-2xl font-bold mb-3">£{deal.singlePrice?.toFixed(2)}</div>
                    <a href="tel:01692584100">
                      <Button className="bg-white text-accent hover:bg-gray-100 w-full">
                        Order Now
                      </Button>
                    </a>
                  </div>
                ))}
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
      <section id="menu-content" className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <MenuCategory
                title={getCategoryInfo(activeCategory).name}
                description={
                  activeCategory === "kebabs" 
                    ? "🥙 All kebabs come with fresh salad & delicious sauce"
                    : activeCategory === "pizzas"
                    ? "🍕 Made with 100% fresh daily dough"
                    : activeCategory === "lunch-offers"
                    ? "⏰ Available 12:00 - 14:30 daily"
                    : activeCategory === "family-deals"
                    ? "👨‍👩‍👧‍👦 Perfect for sharing with loved ones"
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
