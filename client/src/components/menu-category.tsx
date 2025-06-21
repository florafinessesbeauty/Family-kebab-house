import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItemData } from "@/data/menu-data";
import NutritionalInfoTooltip from "@/components/nutritional-info-tooltip";

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
    // Check for single price first (includes regular price and singlePrice)
    if (item.singlePrice || item.price) {
      return (
        <div className="text-right">
          <div className="text-xl font-bold text-primary">
            {formatPrice(item.singlePrice || item.price)}
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
          {item.price10inches !== undefined && <span>10&quot;</span>}
          {item.price12inches !== undefined && <span>12&quot;</span>}
        </div>
        <div className="grid grid-cols-2 gap-2 font-bold text-primary">
          {item.price10inches !== undefined && <span>{formatPrice(item.price10inches)}</span>}
          {item.price12inches !== undefined && <span>{formatPrice(item.price12inches)}</span>}
        </div>
      </div>
    );
  }

    // Fallback: check for standard sizes (Small, Medium, Large, XLarge)
  const prices = [];
  if (item.priceSmall) prices.push({ label: "Sml", price: item.priceSmall });
  if (item.priceMedium) prices.push({ label: "Med", price: item.priceMedium });
  if (item.priceLarge) prices.push({ label: "Lrg", price: item.priceLarge });
  if (item.priceXLarge) prices.push({ label: "XLrg", price: item.priceXLarge });
  
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
              
              <div className="flex justify-between items-start relative z-10">
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
                          allergens: item.allergens,
                          ingredients: item.ingredients
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
                  
                  {/* Interactive Order Button on Hover */}
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <a href="tel:01692584100">
                      <button className="text-xs bg-primary text-white px-3 py-1 rounded-full hover:bg-red-700 transition-colors">
                        📞 Order This
                      </button>
                    </a>
                  </div>
                </div>
                <div className="relative">
                  {renderPriceDisplay(item)}
                  
                  {/* Interactive price selector for multi-size items */}
                  {(item.priceSmall || item.priceMedium || item.priceLarge || item.priceXLarge) && 
                   [item.priceSmall, item.priceMedium, item.priceLarge, item.priceXLarge].filter(Boolean).length > 1 && (
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2 mt-2">
                        <div className="text-xs text-gray-500 mb-2 font-medium">Quick Select:</div>
                        <div className="space-y-1">
                          {item.priceSmall && (
                            <button className="block w-full text-left px-2 py-1 text-xs hover:bg-green-50 hover:text-green-700 rounded transition-colors">
                              Small - £{item.priceSmall.toFixed(2)}
                            </button>
                          )}
                          {item.priceMedium && (
                            <button className="block w-full text-left px-2 py-1 text-xs hover:bg-blue-50 hover:text-blue-700 rounded transition-colors">
                              Medium - £{item.priceMedium.toFixed(2)}
                            </button>
                          )}
                          {item.priceLarge && (
                            <button className="block w-full text-left px-2 py-1 text-xs hover:bg-orange-50 hover:text-orange-700 rounded transition-colors">
                              Large - £{item.priceLarge.toFixed(2)}
                            </button>
                          )}
                          {item.priceXLarge && (
                            <button className="block w-full text-left px-2 py-1 text-xs hover:bg-red-50 hover:text-red-700 rounded transition-colors">
                              X-Large - £{item.priceXLarge.toFixed(2)}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
