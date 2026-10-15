import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItemData } from "@/data/menu-data";
import { CreditCard } from "lucide-react";

interface MenuCategoryProps {
  title: string;
  description?: string;
  items: MenuItemData[];
  icon?: string;
}

export default function MenuCategory({
  title,
  description,
  items,
  icon,
}: Readonly<MenuCategoryProps>) {
  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const renderPriceDisplay = (item: MenuItemData) => {
    if (item.singlePrice !== undefined) {
      return (
        <div className="text-right ml-4">
          <div className="text-xl font-bold text-primary">
            {formatPrice(item.singlePrice)}
          </div>

          {item.withChips !== undefined && (
            <div className="text-sm text-gray-500">
              With chips: {formatPrice(item.withChips)}
            </div>
          )}

          {item.withDrink !== undefined && (
            <div className="text-sm text-gray-500">
              With drink: {formatPrice(item.withDrink)}
            </div>
          )}
        </div>
      );
    }

    if (
      item.price10inches !== undefined ||
      item.price12inches !== undefined
    ) {
      const pizzaPrices = [
        item.price10inches !== undefined
          ? { label: '10"', price: item.price10inches }
          : null,
        item.price12inches !== undefined
          ? { label: '12"', price: item.price12inches }
          : null,
      ].filter(
        (entry): entry is { label: string; price: number } => entry !== null,
      );

      return (
        <div className="text-right ml-4">
          <div className="flex gap-4 text-sm text-gray-500 mb-1">
            {pizzaPrices.map((price) => (
              <span key={price.label}>{price.label}</span>
            ))}
          </div>

          <div className="flex gap-4 font-bold text-primary">
            {pizzaPrices.map((price) => (
              <span key={price.label}>{formatPrice(price.price)}</span>
            ))}
          </div>
        </div>
      );
    }

    const prices: Array<{ label: string; price: number }> = [];

    if (item.priceSmall !== undefined) {
      prices.push({ label: "Sml", price: item.priceSmall });
    }

    if (item.priceMedium !== undefined) {
      prices.push({ label: "Med", price: item.priceMedium });
    }

    if (item.priceLarge !== undefined) {
      prices.push({ label: "Lrg", price: item.priceLarge });
    }

    if (item.priceXLarge !== undefined) {
      prices.push({ label: "XLrg", price: item.priceXLarge });
    }

    if (prices.length === 0) {
      return null;
    }

    return (
      <div className="text-right ml-4">
        <div className="flex gap-4 text-sm text-gray-500 mb-1">
          {prices.map((price) => (
            <span key={price.label}>{price.label}</span>
          ))}
        </div>

        <div className="flex gap-4 font-bold text-primary">
          {prices.map((price) => (
            <span key={price.label}>{formatPrice(price.price)}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Category Heading */}
      <div className="text-center mb-8">
        <h2 className="font-poppins text-4xl font-bold text-charcoal mb-2 flex items-center justify-center gap-3">
          {icon && <span className="text-3xl">{icon}</span>}
          {title}
        </h2>

        {description && (
          <p className="text-lg text-gray-600">{description}</p>
        )}

        {/* Payment Information */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
          <CreditCard className="h-4 w-4 text-primary" />

          <span>
            Cash and card payments accepted in store. Dine-in and takeaway collection only. No delivery service.
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid gap-4">
        {items.map((item) => (
          <Card
            key={item.id}
            className={`hover:shadow-md transition-shadow ${
              item.isSpecial ? "border-accent border-2 bg-accent/5" : ""
            }`}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-charcoal text-lg">
                      {item.name}
                    </h3>

                    {item.isSpecial && (
                      <Badge
                        variant="secondary"
                        className="bg-accent text-white"
                      >
                        Special
                      </Badge>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-gray-600 text-sm">
                      {item.description}
                    </p>
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
