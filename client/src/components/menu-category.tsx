import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { MenuItemData } from "@/data/menu-data";
import NutritionalInfoTooltip from "@/components/nutritional-info-tooltip";
import AddToBasketButton from "@/components/add-to-basket-button";

interface MenuCategoryProps {
  title: string;
  description?: string;
  items: MenuItemData[];
  icon?: string;
}

export default function MenuCategory({ title, description, items, icon }: Readonly<MenuCategoryProps>) {
  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const getItemEmoji = (item: MenuItemData) => {
    const name = item.name.toLowerCase();
    if (name.includes('chicken') && name.includes('burger')) return '🍔';
    if (name.includes('doner')) return '🥙';
    if (name.includes('shish')) return '🍢';
    if (name.includes('chicken') && name.includes('kebab')) return '🍗';
    if (name.includes('kofte')) return '🥩';
    if (name.includes('pizza')) return '🍕';
    if (name.includes('burger')) return '🍔';
    if (name.includes('wrap')) return '🌯';
    if (name.includes('nuggets')) return '🍿';
    if (name.includes('wings')) return '🔥';
    if (name.includes('scampi')) return '🍤';
    if (name.includes('chips')) return '🍟';
    if (name.includes('onion rings')) return '🧅';
    if (name.includes('garlic')) return '🧄';
    if (name.includes('cake')) return '🍰';
    if (name.includes('drink') || name.includes('can') || name.includes('bottle')) return '🥤';
    if (name.includes('family')) return '👨‍👩‍👧‍👦';
    if (name.includes('combo') || name.includes('meal')) return '🍱';
    if (name.includes('salad')) return '🥗';
    if (item.category === 'lunch-offers') return '⏰';
    return '🍽️';
  };

  const renderPriceDisplay = (item: MenuItemData) => {
    // Check if item has multiple sizes
    const hasSizes = item.priceMedium || item.priceLarge || item.priceXLarge;
    
    if (hasSizes) {
      const sizes = [];
      if (item.priceMedium) sizes.push({ label: 'Medium', price: item.priceMedium });
      if (item.priceLarge) sizes.push({ label: 'Large', price: item.priceLarge });
      if (item.priceXLarge) sizes.push({ label: 'X-Large', price: item.priceXLarge });
      
      return (
        <div className="text-right space-y-1">
          {sizes.map((size) => (
            <div key={size.label} className="flex justify-between items-center text-sm">
              <span className="text-gray-600 mr-2">{size.label}:</span>
              <span className="font-bold text-primary">{formatPrice(size.price)}</span>
            </div>
          ))}
        </div>
      );
    }
    
    // Check for single price first
    if (item.singlePrice) {
      return (
        <div className="text-right">
          <div className="text-xl font-bold text-primary">
            {formatPrice(item.singlePrice)}
          </div>
          {item.withChips && (
            <div className="text-sm text-gray-500">
              With chips: {formatPrice(item.withChips)}
            </div>
          )}
          {item.withDrink && (
            <div className="text-sm text-gray-500">
              With drink: {formatPrice(item.withDrink)}
            </div>
          )}
        </div>
      );
    }  

    // New block: if pizza-specific prices exist, display them
  if (item.price10inches || item.price12inches) {
    return (
      <div className="text-right ml-4">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-1">
          {item.price10inches !== undefined && item.price10inches !== null && <span>10&quot;</span>}
          {item.price12inches !== undefined && item.price12inches !== null && <span>12&quot;</span>}
        </div>
        <div className="grid grid-cols-2 gap-2 font-bold text-primary">
          {item.price10inches !== undefined && item.price10inches !== null && <span>{formatPrice(item.price10inches)}</span>}
          {item.price12inches !== undefined && item.price12inches !== null && <span>{formatPrice(item.price12inches)}</span>}
        </div>
      </div>
    );
  }

    // Fallback: check for standard sizes (Small, Medium, Large, XLarge)
  const prices = [];
  // For pizza items, use different labels
  if (item.category === 'pizzas') {
    if (item.priceSmall) prices.push({ label: "10\"", price: item.priceSmall });
    if (item.priceLarge) prices.push({ label: "12\"", price: item.priceLarge });
  } else if (item.category === 'chicken-wings-strips' || item.category === 'chicken-nuggets') {
    // For wings & strips and nuggets: Single, With Chips, Meal
    if (item.singlePrice) prices.push({ label: "Single", price: item.singlePrice });
    if (item.priceMedium) prices.push({ label: "With Chips", price: item.priceMedium });
    if (item.priceLarge) prices.push({ label: "Meal", price: item.priceLarge });
  } else {
    if (item.priceSmall) prices.push({ label: "Sml", price: item.priceSmall });
    if (item.priceMedium) prices.push({ label: "Med", price: item.priceMedium });
    if (item.priceLarge) prices.push({ label: "Lrg", price: item.priceLarge });
    if (item.priceXLarge) prices.push({ label: "XLrg", price: item.priceXLarge });
  }
  
  if (prices.length === 0) return null;
  
  return (
    <div className="text-right ml-4">
      <div className={`grid grid-cols-${prices.length} gap-2 text-sm text-gray-500 mb-1`}>
        {prices.map((p) => (
          <span key={p.label}>{p.label}</span>
        ))}
      </div>
      <div className={`grid grid-cols-${prices.length} gap-2 font-bold text-primary`}>
        {prices.map((p) => (
          <span key={p.label}>{formatPrice(p.price)}</span>
        ))}
      </div>
    </div>
  );
};
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-poppins text-4xl font-bold text-charcoal mb-2 flex items-center justify-center gap-3">
          {icon && <span className="text-3xl">{icon}</span>}
          {title}
        </h2>
        {description && (
          <p className="text-lg text-gray-600">{description}</p>
        )}
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <Card 
            key={item.id} 
            className={`group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer relative ${
              item.isSpecial ? "border-accent border-2 bg-gradient-to-r from-accent/5 to-orange-50 shadow-md" : "hover:border-accent/30"
            }`}
            style={{ 
              isolation: 'isolate', 
              position: 'relative',
              zIndex: 1,
              overflow: 'visible'
            }}
          >
            <CardContent className="p-4 relative" style={{ overflow: 'visible' }}>
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ zIndex: 0 }}></div>
              
              <div className="flex justify-between items-start relative z-10" style={{ position: 'relative' }}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-charcoal text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <span className="group-hover:scale-125 transition-transform duration-300">
                        {getItemEmoji(item)}
                      </span>
                      {item.name}
                    </h3>
                    <div 
                      className="group-hover:scale-110 transition-transform duration-300"
                      style={{ 
                        position: 'relative',
                        zIndex: 2147483647,
                        transform: 'translateZ(999px)'
                      }}
                    >
                      <NutritionalInfoTooltip 
                        itemName={item.name} 
                        category={title} 
                        nutritionalData={{
                          calories: item.calories,
                          protein: item.protein,
                          carbs: item.carbs,
                          fat: item.fat,
                          fiber: item.fiber,
                          sodium: item.sodium,
                          allergens: item.allergens ? (Array.isArray(item.allergens) ? item.allergens : item.allergens.split(',').map(a => a.trim())) : [],
                          ingredients: item.ingredients ? (Array.isArray(item.ingredients) ? item.ingredients : item.ingredients.split(',').map(i => i.trim())) : []
                        }}
                      />
                    </div>
                    {item.isSpecial && (
                      <Badge variant="secondary" className="bg-accent text-white animate-pulse">
                        🌟 Special
                      </Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="space-y-2 mt-4 relative z-20">
                    <AddToBasketButton 
                      item={{
                        id: item.id,
                        name: item.name,
                        category: item.category,
                        singlePrice: item.singlePrice || 0,
                        priceSmall: item.priceSmall,
                        priceMedium: item.priceMedium,
                        priceLarge: item.priceLarge,
                        priceXLarge: item.priceXLarge,
                        description: item.description
                      }}
                      variant="default"
                      className="w-full relative z-20"
                    />
                  </div>
                </div>
                <div className="relative">
                  {renderPriceDisplay(item)}
                  

                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Combination Kebabs Extras Section */}
      {title === "Combination Kebabs" && (
        <Card className="mt-8 border-2 border-accent bg-gradient-to-r from-accent/5 to-orange-50">
          <CardContent className="p-6">
            <h3 className="font-poppins text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
              <span className="text-xl">➕</span>
              Extras Available
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-charcoal">🍢 Add 1 Skewer Extra</h4>
                    <p className="text-sm text-gray-600">Extra meat portion</p>
                  </div>
                  <div className="text-lg font-bold text-primary">£6.00</div>
                </div>
                <div className="mt-3">
                  <AddToBasketButton 
                    item={{
                      id: "extra-skewer",
                      name: "🍢 Add 1 Skewer Extra",
                      category: "extras",
                      singlePrice: 6.00,
                      description: "Extra meat portion"
                    }}
                    variant="small"
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-charcoal">🧀 Add Mozzarella Cheese</h4>
                    <p className="text-sm text-gray-600">Melted cheese topping</p>
                  </div>
                  <div className="text-lg font-bold text-primary">£1.50</div>
                </div>
                <div className="mt-3">
                  <AddToBasketButton 
                    item={{
                      id: "extra-mozzarella",
                      name: "🧀 Add Mozzarella Cheese",
                      category: "extras",
                      singlePrice: 1.50,
                      description: "Melted cheese topping"
                    }}
                    variant="small"
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-charcoal">🥬 Add "Special" Mix</h4>
                    <p className="text-sm text-gray-600">Mushroom, onion & green pepper</p>
                  </div>
                  <div className="text-lg font-bold text-primary">£1.50</div>
                </div>
                <div className="mt-3">
                  <AddToBasketButton 
                    item={{
                      id: "extra-special-mix",
                      name: "🥬 Add \"Special\" Mix",
                      category: "extras",
                      singlePrice: 1.50,
                      description: "Mushroom, onion & green pepper"
                    }}
                    variant="small"
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>💡 Tip:</strong> All combination kebabs come with fresh salad and delicious sauce. Add any extras above to customize your meal!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pizza Extras Section */}
      {title === "Pizzas" && (
        <Card className="mt-8 border-2 border-orange-400 bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-6">
            <h3 className="font-poppins text-2xl font-bold text-charcoal mb-4 flex items-center gap-2">
              <span className="text-xl">🍕</span>
              Available Extra Toppings
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {[
                "Ham", "Chicken", "Pepperoni", "Spicy beef", "Tuna", "Prawns", "Olives", "Bacon",
                "Anchovies", "Red onion", "Mushroom", "Fresh tomato", "Salami", "Sweetcorn",
                "Green peppers", "Jalapeño", "Pineapple"
              ].map((topping) => (
                <div key={topping} className="bg-white p-2 rounded-lg border border-gray-200 text-center">
                  <span className="text-sm font-medium text-charcoal">{topping}</span>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center">
                  <h4 className="font-semibold text-charcoal mb-1">10" Extra Topping</h4>
                  <div className="text-lg font-bold text-primary">£1.40</div>
                </div>
                <div className="mt-3">
                  <AddToBasketButton 
                    item={{
                      id: "pizza-topping-10",
                      name: "🍕 10\" Extra Topping",
                      category: "extras",
                      singlePrice: 1.40,
                      description: "Add any topping to your 10\" pizza"
                    }}
                    variant="small"
                  />
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center">
                  <h4 className="font-semibold text-charcoal mb-1">12" Extra Topping</h4>
                  <div className="text-lg font-bold text-primary">£1.80</div>
                </div>
                <div className="mt-3">
                  <AddToBasketButton 
                    item={{
                      id: "pizza-topping-12",
                      name: "🍕 12\" Extra Topping",
                      category: "extras",
                      singlePrice: 1.80,
                      description: "Add any topping to your 12\" pizza"
                    }}
                    variant="small"
                  />
                </div>
              </div>
            </div>
            <div className="text-center p-4 bg-orange-100 border border-orange-300 rounded-lg">
              <h4 className="font-poppins text-xl font-bold text-charcoal mb-2">🍞 100% DAILY FRESH DOUGH</h4>
              <p className="text-sm text-gray-700">All our pizzas and garlic bread are made with freshly prepared dough every single day!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
