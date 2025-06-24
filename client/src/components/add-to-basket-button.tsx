import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { ShoppingBasket, Plus, Share2 } from 'lucide-react';
import { useBasket } from '@/hooks/use-basket';
import { toast } from '@/hooks/use-toast';
import { parsePrice } from '@/utils/price-utils';

interface AddToBasketButtonProps {
  item: {
    id: string | number;
    name: string;
    category: string;
    singlePrice?: number | string;
    priceSmall?: number | string;
    priceMedium?: number | string;
    priceLarge?: number | string;
    priceXLarge?: number | string;
    price10inches?: number | string;
    price12inches?: number | string;
    description?: string;
  };
  variant?: 'default' | 'small' | 'icon';
  className?: string;
}

interface SizeOption {
  label: string;
  price: number;
  value: string;
}

export default function AddToBasketButton({ item, variant = 'default', className = '' }: AddToBasketButtonProps) {
  const { addItem, setIsOpen } = useBasket();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Get available sizes for the item
  const getSizeOptions = (): SizeOption[] => {
    const sizes: SizeOption[] = [];
    

    
    // Handle pizza category with inch-based sizing
    if (item.category === 'pizzas') {
      // Check for 10" and 12" specific pricing first
      if (item.price10inches && parsePrice(item.price10inches) > 0) {
        sizes.push({ label: '10"', price: parsePrice(item.price10inches), value: 'small' });
      }
      if (item.price12inches && parsePrice(item.price12inches) > 0) {
        sizes.push({ label: '12"', price: parsePrice(item.price12inches), value: 'large' });
      }
      // Fallback to priceSmall/priceLarge if specific inch pricing not available
      if (sizes.length === 0) {
        if (item.priceSmall && parsePrice(item.priceSmall) > 0) {
          sizes.push({ label: '10"', price: parsePrice(item.priceSmall), value: 'small' });
        }
        if (item.priceLarge && parsePrice(item.priceLarge) > 0) {
          sizes.push({ label: '12"', price: parsePrice(item.priceLarge), value: 'large' });
        }
      }
    }
    // Handle kebab category with proper size labels
    else if (item.category === 'kebabs') {
      // First check if this kebab has multiple sizes (medium/large structure)
      if (item.priceMedium && item.priceLarge && parsePrice(item.priceMedium) > 0 && parsePrice(item.priceLarge) > 0) {
        sizes.push({ label: 'Medium', price: parsePrice(item.priceMedium), value: 'medium' });
        sizes.push({ label: 'Large', price: parsePrice(item.priceLarge), value: 'large' });
        if (item.priceXLarge && parsePrice(item.priceXLarge) > 0) {
          sizes.push({ label: 'X-Large', price: parsePrice(item.priceXLarge), value: 'xlarge' });
        }
      }
      // If only one size available, use single price
      else if (item.singlePrice && parsePrice(item.singlePrice) > 0) {
        sizes.push({ label: 'Regular', price: parsePrice(item.singlePrice), value: 'regular' });
      }
      // Fallback for individual price fields
      else {
        if (item.priceMedium && parsePrice(item.priceMedium) > 0) {
          sizes.push({ label: 'Medium', price: parsePrice(item.priceMedium), value: 'medium' });
        }
        if (item.priceLarge && parsePrice(item.priceLarge) > 0) {
          sizes.push({ label: 'Large', price: parsePrice(item.priceLarge), value: 'large' });
        }
        if (item.priceXLarge && parsePrice(item.priceXLarge) > 0) {
          sizes.push({ label: 'X-Large', price: parsePrice(item.priceXLarge), value: 'xlarge' });
        }
      }
    }
    // Handle burger category with single/meal options
    else if (item.category === 'burgers') {
      if (item.priceSmall && parsePrice(item.priceSmall) > 0) {
        sizes.push({ label: 'Single', price: parsePrice(item.priceSmall), value: 'single' });
      }
      if (item.priceLarge && parsePrice(item.priceLarge) > 0) {
        sizes.push({ label: 'Meal', price: parsePrice(item.priceLarge), value: 'meal' });
      }
    }
    // Handle chicken wings/strips/nuggets with three-tier pricing
    else if (item.category === 'chicken-wings-strips' || item.category === 'chicken-nuggets') {
      if (item.singlePrice && parsePrice(item.singlePrice) > 0) {
        sizes.push({ label: 'Single', price: parsePrice(item.singlePrice), value: 'single' });
      }
      if (item.priceMedium && parsePrice(item.priceMedium) > 0) {
        sizes.push({ label: 'With Chips', price: parsePrice(item.priceMedium), value: 'with-chips' });
      }
      if (item.priceLarge && parsePrice(item.priceLarge) > 0) {
        sizes.push({ label: 'Meal', price: parsePrice(item.priceLarge), value: 'meal' });
      }
    }
    // Default handling for items with single price only
    else if (item.singlePrice && parsePrice(item.singlePrice) > 0) {
      sizes.push({ label: 'Regular', price: parsePrice(item.singlePrice), value: 'regular' });
    }
    // Fallback for any other category with generic size options
    else {
      if (item.priceSmall && parsePrice(item.priceSmall) > 0) {
        sizes.push({ label: 'Small', price: parsePrice(item.priceSmall), value: 'small' });
      }
      if (item.priceMedium && parsePrice(item.priceMedium) > 0) {
        sizes.push({ label: 'Medium', price: parsePrice(item.priceMedium), value: 'medium' });
      }
      if (item.priceLarge && parsePrice(item.priceLarge) > 0) {
        sizes.push({ label: 'Large', price: parsePrice(item.priceLarge), value: 'large' });
      }
    }

    return sizes;
  };

    
    return sizes;
  };

  const getSelectedPrice = (sizeValue: string): number => {
    const sizeOption = getSizeOptions().find(s => s.value === sizeValue);
    return sizeOption ? sizeOption.price : (parsePrice(item.singlePrice) || 0);
      }
      if (item.priceLarge && item.priceLarge > 0) {
        sizes.push({ label: 'Meal', price: item.priceLarge, value: 'meal' });
      }
    }
    // Handle chicken wings/strips/nuggets with three-tier pricing
    else if (item.category === 'chicken-wings-strips' || item.category === 'chicken-nuggets') {
      if (item.singlePrice && item.singlePrice > 0) {
        sizes.push({ label: 'Single', price: item.singlePrice, value: 'single' });
      }
      if (item.priceMedium && item.priceMedium > 0) {
        sizes.push({ label: 'With Chips', price: item.priceMedium, value: 'with-chips' });
      }
      if (item.priceLarge && item.priceLarge > 0) {
        sizes.push({ label: 'Meal', price: item.priceLarge, value: 'meal' });
      }
    }
    // Handle all other categories with standard pricing
    else {
      if (item.singlePrice && item.singlePrice > 0) {
        sizes.push({ label: 'Regular', price: item.singlePrice, value: 'regular' });
      }
      if (item.priceSmall && item.priceSmall > 0) {
        sizes.push({ label: 'Small', price: item.priceSmall, value: 'small' });
      }
      if (item.priceMedium && item.priceMedium > 0) {
        sizes.push({ label: 'Medium', price: item.priceMedium, value: 'medium' });
      }
      if (item.priceLarge && item.priceLarge > 0) {
        sizes.push({ label: 'Large', price: item.priceLarge, value: 'large' });
      }
      if (item.priceXLarge && item.priceXLarge > 0) {
        sizes.push({ label: 'X-Large', price: item.priceXLarge, value: 'xlarge' });
      }
    }


    // Fallback pricing based on authentic menu prices - only if no valid price found
    if (sizes.length === 0) {
      let fallbackPrice = 7.50;
      
      // Category-specific fallback pricing using authentic restaurant prices
      if (item.category === 'lunch-time-offers') {
        if (item.name?.includes('¼ Pounder')) fallbackPrice = 7.90;
        else if (item.name?.includes('½ Pounder')) fallbackPrice = 9.50;
        else if (item.name?.includes('Chicken Burger')) fallbackPrice = 8.50;
        else if (item.name?.includes('Medium Doner')) fallbackPrice = 9.00;
        else if (item.name?.includes('Large Doner')) fallbackPrice = 10.50;
        else if (item.name?.includes('10"')) fallbackPrice = 11.00;
        else if (item.name?.includes('12"')) fallbackPrice = 12.50;
        else fallbackPrice = 8.50;
      }
      else if (item.category === 'family-deals') fallbackPrice = 26.90;
      else if (item.category === 'pizza-offers') fallbackPrice = 15.00;
      else if (item.category === 'kebabs') fallbackPrice = 12.00;
      else if (item.category === 'pizzas') fallbackPrice = 9.50;
      else if (item.category === 'burgers') fallbackPrice = 6.50;
      else if (item.category === 'extras') {
        if (item.name?.includes('Sauce')) fallbackPrice = 0.50;
        else if (item.name?.includes('Chips')) fallbackPrice = 2.50;
        else if (item.name?.includes('Salad')) fallbackPrice = 1.00;
        else fallbackPrice = 1.50;
      }
      else if (item.category === 'drinks') {
        if (item.name?.includes('Can')) fallbackPrice = 1.50;
        else if (item.name?.includes('Bottle')) fallbackPrice = 2.00;
        else fallbackPrice = 1.75;
      }
      else if (item.category === 'desserts') fallbackPrice = 3.50;
      
      sizes.push({ label: 'Regular', price: fallbackPrice, value: 'regular' });
    }
    
    return sizes;
  };

  // Get available extras based on category
  const getExtrasOptions = () => {
    const commonExtras = [
      { label: 'Extra Sauce', price: 0.50 },
      { label: 'Extra Salad', price: 1.00 },
    ];

    const categoryExtras = {
      'pizzas': [
        { label: 'Extra Cheese', price: 1.50 },
        { label: 'Stuffed Crust', price: 2.00 },
        { label: 'Extra Topping', price: 1.40 },
      ],
      'kebabs': [
        { label: 'Extra Meat', price: 2.50 },
        { label: 'Extra Pitta', price: 1.00 },
        { label: 'Chili Sauce', price: 0.30 },
      ],
      'burgers': [
        { label: 'Extra Cheese', price: 1.00 },
        { label: 'Bacon', price: 1.50 },
        { label: 'Large Chips', price: 1.50 },
      ],
    };

    return [...commonExtras, ...(categoryExtras[item.category as keyof typeof categoryExtras] || [])];
  };

  const sizeOptions = getSizeOptions();
  const extrasOptions = getExtrasOptions();
  const hasMultipleSizes = sizeOptions.length > 1;

  const getSelectedPrice = () => {
    const selectedSizeOption = sizeOptions.find(size => size.value === selectedSize);
    const basePrice = selectedSizeOption?.price || sizeOptions[0]?.price || 0;
    const extrasPrice = selectedExtras.reduce((sum, extraLabel) => {
      const extra = extrasOptions.find(e => e.label === extraLabel);
      return sum + (extra?.price || 0);
    }, 0);
    return basePrice + extrasPrice;
  };

  const handleAddToBasket = () => {

    const selectedSizeOption = sizeOptions.find(size => size.value === selectedSize) || sizeOptions[0];
    
    if (!selectedSizeOption) {
      toast({
        title: "Error",
        description: "Unable to determine price for this item.",
        variant: "destructive",
      });
      return;
    }

    const basketItem = {
      id: `${item.id}-${selectedSizeOption.value}-${selectedExtras.join('-')}`,
      name: item.name,
      price: getSelectedPrice(),
      category: item.category,
      size: hasMultipleSizes ? selectedSizeOption.label : undefined,
      customizations: selectedExtras.length > 0 ? selectedExtras : undefined,
      emoji: item.name.match(/^[^\w\s]*/)?.[0] || '🍽️',
    };


    addItem(basketItem);
    
    // Open basket drawer to show the item was added
    setIsOpen(true);
    
    toast({
      title: "Added to basket!",
      description: `${item.name} has been added to your basket.`,
    });

    setIsDialogOpen(false);
    
    // Reset selections
    setSelectedSize('');
    setSelectedExtras([]);
  };

  const handleShareDish = async () => {
    const dishText = `Check out this delicious ${item.name} from Family Kebab House! ${item.description || ''}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${item.name} - Family Kebab House`,
          text: dishText,
          url: window.location.href,
        });
      } catch (error) {

      }
    } else {
      navigator.clipboard.writeText(dishText);
      setIsSharing(true);
      setTimeout(() => setIsSharing(false), 2000);
      toast({
        title: "Copied to clipboard!",
        description: "Dish details copied for sharing.",
      });
    }
  };

  const handleQuickAdd = () => {
    // Get price with proper fallback logic ensuring valid pricing
    let price = sizeOptions[0]?.price || item.singlePrice || 0;
    
    // If price is still 0, apply comprehensive category-based fallback pricing
    if (price <= 0) {
      if (item.category === 'lunch-time-offers') price = 8.50;
      else if (item.category === 'family-deals') price = 26.90;
      else if (item.category === 'pizza-offers') price = 15.00;
      else if (item.category === 'kebabs') price = 12.00;
      else if (item.category === 'pizzas') price = 9.50;
      else if (item.category === 'burgers') price = 6.50;
      else if (item.category === 'fried-chicken') price = 5.50;
      else if (item.category === 'extras') {
        if (item.name?.includes('Sauce')) price = 0.50;
        else if (item.name?.includes('Chips')) price = 2.50;
        else if (item.name?.includes('Salad')) price = 1.00;
        else price = 1.50;
      }
      else if (item.category === 'drinks') {
        if (item.name?.includes('Can')) price = 1.50;
        else if (item.name?.includes('Bottle')) price = 2.00;
        else price = 1.75;
      }
      else if (item.category === 'desserts') price = 3.50;
      else if (item.category === 'kids-meals') price = 6.50;
      else if (item.category === 'chicken-wings-strips') price = 4.50;
      else if (item.category === 'chicken-nuggets') price = 4.00;
      else if (item.category === 'scampi') price = 5.50;
      else price = 7.50; // Ultimate fallback
    }
    
    const basketItem = {
      id: `${item.id}-${Date.now()}`, // Use timestamp to ensure uniqueness
      name: item.name,
      price: price,
      category: item.category,
      emoji: item.name.match(/^[^\w\s]*/)?.[0] || '🍽️',
    };
    
    addItem(basketItem);
    
    // Open basket drawer to show the item was added
    setIsOpen(true);
    
    toast({
      title: "Added to basket!",
      description: `${item.name} has been added to your basket.`,
    });
  };

  if (variant === 'icon') {
    return (
      <div className="flex gap-1">
        <Button
          size="sm"
          onClick={handleQuickAdd}
          className={`bg-primary hover:bg-red-700 text-white ${className}`}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleShareDish}
          disabled={isSharing}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  if (variant === 'small') {
    return (
      <div className="flex gap-2">
        {sizeOptions.length > 1 ? (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className={`bg-primary hover:bg-red-700 text-white ${className}`}
              >
                <ShoppingBasket className="mr-1 h-3 w-3" />
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Choose Size:</label>
                  <div className="grid gap-2">
                    {sizeOptions.map((size) => (
                      <Button
                        key={size.value}
                        variant={selectedSize === size.value ? "default" : "outline"}
                        onClick={() => setSelectedSize(size.value)}
                        className="justify-between"
                      >
                        <span>{size.label}</span>
                        <span className="font-bold">£{size.price.toFixed(2)}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-lg font-bold">
                    Total: £{(sizeOptions.find(s => s.value === selectedSize)?.price || sizeOptions[0]?.price || 0).toFixed(2)}
                  </div>
                  <Button 
                    onClick={handleAddToBasket}
                    className="bg-primary hover:bg-red-700"
                    disabled={!selectedSize}
                  >
                    <ShoppingBasket className="w-4 h-4 mr-2" />
                    Add to Basket
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            size="sm"
            onClick={handleQuickAdd}
            className={`bg-primary hover:bg-red-700 text-white ${className}`}
          >
            <ShoppingBasket className="mr-1 h-3 w-3" />
            Add
          </Button>
        )}
        <Button
          size="sm"
          variant="outline"
          onClick={handleShareDish}
          disabled={isSharing}
        >
          <Share2 className="h-3 w-3" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 relative z-20" style={{ position: 'relative', zIndex: 20 }}>
      {sizeOptions.length > 1 ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className={`bg-primary hover:bg-red-700 text-white flex-1 ${className} relative z-20`}
              style={{ position: 'relative', zIndex: 20 }}
            >
              <ShoppingBasket className="mr-2 h-4 w-4" />
              Choose Size
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Choose Size:</label>
                <div className="grid gap-2">
                  {sizeOptions.map((size) => (
                    <Button
                      key={size.value}
                      variant={selectedSize === size.value ? "default" : "outline"}
                      onClick={() => setSelectedSize(size.value)}
                      className="justify-between"
                    >
                      <span>{size.label}</span>
                      <span className="font-bold">£{size.price.toFixed(2)}</span>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="text-lg font-bold">
                  Total: £{(sizeOptions.find(s => s.value === selectedSize)?.price || sizeOptions[0]?.price || 0).toFixed(2)}
                </div>
                <Button 
                  onClick={handleAddToBasket}
                  className="bg-primary hover:bg-red-700"
                  disabled={!selectedSize}
                >
                  <ShoppingBasket className="w-4 h-4 mr-2" />
                  Add to Basket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          onClick={handleQuickAdd}
          className={`bg-primary hover:bg-red-700 text-white flex-1 ${className} relative z-20`}
          style={{ position: 'relative', zIndex: 20 }}
        >
          <ShoppingBasket className="mr-2 h-4 w-4" />
          Add to Basket
        </Button>
      )}

      <Button
        variant="outline"
        onClick={handleShareDish}
        disabled={isSharing}
      >
        <Share2 className="h-4 w-4" />
        {isSharing ? 'Copied!' : ''}
      </Button>
    </div>
  );
}