import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuCategory from "@/components/menu-category";
import { menuData, categories } from "@/data/menu-data";
import { Phone } from "lucide-react";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("kebabs");

  const getItemsByCategory = (category: string) => {
    return menuData.filter(item => item.category === category);
  };

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
    extras: "https://images.unsplash.com/photo-1576107232684-1279f390859f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    desserts: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
  };

  const specialDeals = menuData.filter(item => item.isSpecial);

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
                  onClick={() => setActiveCategory(category.id)}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  className={`px-6 py-3 font-semibold ${
                    activeCategory === category.id
                      ? "bg-primary text-white"
                      : "bg-white text-charcoal hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {itemCount}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <MenuCategory
                title={getCategoryInfo(activeCategory).name}
                description={
                  activeCategory === "kebabs" 
                    ? "All kebabs come with salad & sauce"
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
              <div className="bg-gradient-to-br from-accent to-orange-600 p-8 rounded-2xl text-center text-white">
                <h3 className="font-poppins text-2xl font-bold mb-4">Ready to Order?</h3>
                <p className="mb-6 text-orange-100">Call us now and your delicious meal will be ready in just 15 minutes!</p>
                <a href="tel:01692584100">
                  <Button className="bg-white text-accent hover:bg-gray-100 w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    Call 01692 584100
                  </Button>
                </a>
              </div>

              {/* Important Info */}
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-poppins text-xl font-bold text-charcoal mb-4">Important Information</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">💰</span>
                    <span><strong>Cash payment only</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">🎉</span>
                    <span><strong>Party orders welcome</strong> - Call ahead for large orders</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">⚠️</span>
                    <span>Please speak to our staff about <strong>food allergies and intolerances</strong> in your meal when making your order</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">🕐</span>
                    <span><strong>Lunch offers:</strong> Special pricing 12:00 - 14:30</span>
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
