// client/src/components/menu-category.tsx
import React from 'react'
import AddToBasketButton from '@/components/add-to-basket-button'
import { MenuItemData } from '@/data/menu-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import NutritionalInfoTooltip from '@/components/nutritional-info-tooltip'

interface MenuCategoryProps {
  title: string
  description?: string
  items: MenuItemData[]
  icon?: string
}

// helpers at module scope
const formatPrice = (price: number | string) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `£${numPrice.toFixed(2)}`;
}

const getItemEmoji = (item: MenuItemData) => {
  const name = item.name.toLowerCase()
  if (name.includes('chicken') && name.includes('burger')) return '🍔'
  if (name.includes('doner')) return '🥙'
  if (name.includes('shish')) return '🍢'
  if (name.includes('kebab')) return '🍗'
  if (name.includes('kofte')) return '🥩'
  if (name.includes('pizza')) return '🍕'
  if (name.includes('wrap')) return '🌯'
  if (name.includes('nuggets')) return '🍿'
  if (name.includes('wings')) return '🔥'
  if (name.includes('scampi')) return '🍤'
  if (name.includes('chips')) return '🍟'
  if (name.includes('onion rings')) return '🧅'
  if (name.includes('garlic')) return '🧄'
  if (name.includes('cake')) return '🍰'
  if (name.includes('drink') || name.includes('can') || name.includes('bottle')) return '🥤'
  if (name.includes('family')) return '👨‍👩‍👧‍👦'
  if (name.includes('combo') || name.includes('meal')) return '🍱'
  if (name.includes('salad')) return '🥗'
  return '🍽️'
}

function renderPriceDisplay(item: MenuItemData) {
  // 1) Multi‐size items
  if (item.priceMedium || item.priceLarge || item.priceXLarge) {
    const sizes = [
      item.priceMedium  != null && { label: 'Medium',  price: item.priceMedium  },
      item.priceLarge   != null && { label: 'Large',   price: item.priceLarge   },
      item.priceXLarge  != null && { label: 'X-Large', price: item.priceXLarge  }
    ].filter(Boolean) as { label: string; price: number | string }[]

    return (
      <div className="text-right space-y-2">
        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
          {sizes.map(s => <span key={s.label} className="text-center">{s.label}</span>)}
        </div>
        <div className="grid grid-cols-3 gap-1 sm:gap-2 font-bold text-primary">
          {sizes.map(s => <span key={s.label} className="text-center text-sm sm:text-base">{formatPrice(s.price)}</span>)}
        </div>
        <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-2">
          {sizes.map(s => (
            <AddToBasketButton
              key={s.label}
              item={{
                id:           `${item.id}-${s.label.toLowerCase()}`,
                name:         `${item.name} (${s.label})`,
                category:     item.category,
                singlePrice:  s.price,
                description:  item.description
              }}
              variant="small"
              className="w-full text-xs sm:text-sm"
            />
          ))}
        </div>
      </div>
    )
  }

  // 2) Single‐price items
  if (item.singlePrice != null) {
    return (
      <div className="text-right space-y-2">
        <div className="text-lg sm:text-xl font-bold text-primary">
          {formatPrice(item.singlePrice)}
        </div>
        <AddToBasketButton
          item={{
            id:          item.id,
            name:        item.name,
            category:    item.category,
            singlePrice: item.singlePrice,
            description: item.description
          }}
          variant="default"
          className="w-full text-sm sm:text-base"
        />
      </div>
    )
  }

  // 3) Pizza‐inch logic (10″ / 12″)
  if (item.price10inches != null || item.price12inches != null) {
    const inches = [
      item.price10inches != null && { label: '10\"', price: item.price10inches },
      item.price12inches != null && { label: '12\"', price: item.price12inches }
    ].filter(Boolean) as { label: string; price: number | string }[]

    return (
      <div className="text-right space-y-2">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
          {inches.map(i => <span key={i.label}>{i.label}</span>)}
        </div>
        <div className="grid grid-cols-2 gap-2 font-bold text-primary">
          {inches.map(i => <span key={i.label}>{formatPrice(i.price)}</span>)}
        </div>
        <div className="flex gap-2 mt-2">
          {inches.map(i => (
            <AddToBasketButton
              key={i.label}
              item={{
                id:           `${item.id}-${i.label}`,
                name:         `${item.name} (${i.label})`,
                category:     item.category,
                singlePrice:  i.price,
                description:  item.description
              }}
              variant="small"
            />
          ))}
        </div>
      </div>
    )
  }

  // 4) Fallback small/med/lg/xl
  const prices: { label: string; price: number | string }[] = []
  if (item.priceSmall  != null) prices.push({ label: 'Sml', price: item.priceSmall })
  if (item.priceMedium != null) prices.push({ label: 'Med', price: item.priceMedium })
  if (item.priceLarge  != null) prices.push({ label: 'Lrg', price: item.priceLarge })
  if (item.priceXLarge != null) prices.push({ label: 'XLrg', price: item.priceXLarge })

  if (prices.length === 0) return null

  return (
    <div className="text-right space-y-2">
      <div className={`grid grid-cols-${prices.length} gap-2 text-sm text-gray-500`}>
        {prices.map(p => <span key={p.label}>{p.label}</span>)}
      </div>
      <div className={`grid grid-cols-${prices.length} gap-2 font-bold text-primary`}>
        {prices.map(p => <span key={p.label}>{formatPrice(p.price)}</span>)}
      </div>
      <div className="flex gap-2 mt-2">
        {prices.map(p => (
          <AddToBasketButton
            key={p.label}
            item={{
              id:            `${item.id}-${p.label}`,
              name:          `${item.name} (${p.label})`,
              category:      item.category,
              singlePrice:   p.price,
              description:   item.description
            }}
            variant="small"
          />
        ))}
      </div>
    </div>
  )
}

export default function MenuCategory({
  title,
  description,
  items,
  icon
}: Readonly<MenuCategoryProps>) {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-poppins text-2xl sm:text-3xl md:text-4xl font-bold text-charcoal mb-2 flex items-center justify-center gap-2 sm:gap-3">
          {icon && <span className="text-xl sm:text-2xl md:text-3xl">{icon}</span>}
          {title}
        </h2>
        {description && <p className="text-base sm:text-lg text-gray-600 px-4">{description}</p>}
      </div>

      {/* items grid */}
      <div className="grid gap-4">
        {items.map(item => (
          <Card
            key={item.id}
            className={`group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer relative ${
              item.isSpecial
                ? 'border-accent border-2 bg-gradient-to-r from-accent/5 to-orange-50 shadow-md'
                : 'hover:border-accent/30'
            }`}
          >
            <CardContent className="p-3 sm:p-4 relative">
              {/* hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* content row */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 relative z-10">
                <div className="flex-1">
                  {/* title + tooltip + special badge */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-semibold text-charcoal text-base sm:text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <span className="group-hover:scale-125 transition-transform duration-300">
                        {getItemEmoji(item)}
                      </span>
                      {item.name}
                    </h3>
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      <NutritionalInfoTooltip
                        itemName={item.name}
                        category={title}
                        nutritionalData={{
                          calories:   item.calories,
                          protein:    item.protein,
                          carbs:      item.carbs,
                          fat:        item.fat,
                          fiber:      item.fiber,
                          sodium:     item.sodium,
                          allergens:  item.allergens || [],
                          ingredients:item.ingredients || []
                        }}
                      />
                    </div>
                    {item.isSpecial && (
                      <Badge variant="secondary" className="bg-accent text-white animate-pulse">
                        🌟 Special
                      </Badge>
                    )}
                  </div>

                  {/* description */}
                  {item.description && (
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors mb-3">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* prices & Add buttons */}
                <div className="relative z-20 w-full sm:w-auto sm:min-w-[200px]">
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
