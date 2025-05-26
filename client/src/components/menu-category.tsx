import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItemData } from "@/data/menu-data";

interface MenuCategoryProps {
  title: string;
  description?: string;
  items: MenuItemData[];
  icon?: string;
}

export default function MenuCategory({ title, description, items, icon }: Readonly<MenuCategoryProps>) {
  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const renderPriceDisplay = (item: MenuItemData) => {
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
            className={`hover:shadow-md transition-shadow ${
              item.isSpecial ? "border-accent border-2 bg-accent/5" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-charcoal text-lg">{item.name}</h3>
                    {item.isSpecial && (
                      <Badge variant="secondary" className="bg-accent text-white">
                        Special
                      </Badge>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  )}
                </div>
                {renderPriceDisplay(item)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
