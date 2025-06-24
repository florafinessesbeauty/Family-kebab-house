import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Info } from 'lucide-react';
import { MenuItem } from '../../../shared/schema';
import { PriceBadge } from '@/components/price-badge';
import { SizeSelector } from '@/components/size-selector';
import NutritionalInfoTooltip from '@/components/nutritional-info-tooltip';

interface AccessibleMenuItemProps {
  item: MenuItem;
  isFocused: boolean;
  onFocus: () => void;
  onSelect: () => void;
  isKebabFeast?: boolean;
  isFamilyDeal?: boolean;
}

export default function AccessibleMenuItem({
  item,
  isFocused,
  onFocus,
  onSelect,
  isKebabFeast = false,
  isFamilyDeal = false
}: AccessibleMenuItemProps) {
  const [selectedSize, setSelectedSize] = useState<string>('medium');
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && itemRef.current) {
      itemRef.current.focus();
    }
  }, [isFocused]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelect();
        break;
      case 'o':
      case 'O':
        // Quick order with 'O' key
        event.preventDefault();
        window.location.href = 'tel:01692584100';
        break;
      case 'i':
      case 'I':
        // Show info with 'I' key
        event.preventDefault();
        // Trigger nutritional info display
        break;
    }
  };

  const getPrice = () => {
    if (item.singlePrice) return item.singlePrice;
    if (item.priceMedium && selectedSize === 'medium') return item.priceMedium;
    if (item.priceLarge && selectedSize === 'large') return item.priceLarge;
    if (item.priceXLarge && selectedSize === 'x-large') return item.priceXLarge;
    if (item.priceSmall && selectedSize === 'small') return item.priceSmall;
    return item.singlePrice || 7.50; // fallback price
  };

  const hasMultipleSizes = !!(item.priceMedium || item.priceLarge || item.priceXLarge);

  return (
    <Card 
      ref={itemRef}
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
        isFocused 
          ? 'border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20' 
          : 'border-transparent hover:border-primary/30'
      } ${isKebabFeast ? 'relative overflow-hidden' : ''}`}
      onClick={onSelect}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${item.name} - ${item.description || ''} - Price: £${getPrice().toFixed(2)}. Press Enter to select, O to order, I for nutrition info`}
      aria-describedby={`item-${item.id}-description`}
    >
      {isKebabFeast && (
        <>
          {/* Rotating Border Animation */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent-gold via-primary to-accent-gold animate-spin-slow opacity-75"></div>
          <div className="absolute inset-1 bg-white rounded-lg"></div>
          
          {/* Floating Sparkles */}
          <div className="absolute top-2 right-2 animate-bounce">✨</div>
          <div className="absolute top-4 left-2 animate-pulse delay-150">🌟</div>
          <div className="absolute bottom-2 right-4 animate-bounce delay-300">⭐</div>
        </>
      )}

      <CardContent className={`p-6 ${isKebabFeast ? 'relative z-10' : ''}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className={`font-poppins text-lg font-bold text-charcoal mb-2 group-hover:text-primary transition-colors ${
              isKebabFeast ? 'text-2xl bg-gradient-to-r from-primary to-accent-gold bg-clip-text text-transparent' : ''
            }`}>
              {item.name}
              {isKebabFeast && (
                <Badge className="ml-2 bg-gradient-to-r from-accent-gold to-yellow-500 text-charcoal font-bold animate-pulse">
                  PREMIUM FEAST
                </Badge>
              )}
            </h3>
            
            {item.description && (
              <p 
                id={`item-${item.id}-description`}
                className="text-gray-600 text-sm mb-3 leading-relaxed"
              >
                {item.description}
              </p>
            )}

            {hasMultipleSizes && (
              <SizeSelector
                item={item}
                onSizeSelect={(size) => setSelectedSize(size)}
                defaultSize={selectedSize}
              />
            )}
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            <PriceBadge
              price={getPrice()}
              isSpecial={item.isSpecial}
              isKebabFeast={isKebabFeast}
              isFamilyDeal={isFamilyDeal}
            />
            
            <NutritionalInfoTooltip 
              itemName={item.name} 
              category={item.category}
              nutritionalData={{
                calories: item.calories,
                protein: item.protein,
                carbs: item.carbs,
                fat: item.fat,
                fiber: item.fiber,
                sodium: item.sodium,
                _allergens: item.allergens,
                get allergens() {
                    return this._allergens;
                },
                set allergens(value) {
                    this._allergens = value;
                },
                ingredients: item.ingredients
              }}
            />
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex space-x-2 mt-4">
          <Button
            size="sm"
            className="flex-1 bg-primary hover:bg-red-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = 'tel:01692584100';
            }}
            aria-label={`Order ${item.name} now by phone`}
          >
            <Phone className="h-4 w-4 mr-2" />
            Order Now
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              // Focus nutritional info
            }}
            aria-label={`View nutritional information for ${item.name}`}
          >
            <Info className="h-4 w-4" />
            Info
          </Button>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-2 text-xs text-gray-500">
          <span className="sr-only">
            Keyboard shortcuts: Enter to select, O to order, I for nutrition info
          </span>
          <span aria-hidden="true" className="opacity-70">
            Press: Enter (select) • O (order) • I (info)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}