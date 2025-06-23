import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingBasket, Plus, Share2 } from 'lucide-react';
import { useBasket } from '@/hooks/use-basket';
import { toast } from '@/hooks/use-toast';

interface AddToBasketButtonProps {
  item: {
    id: string | number;
    name: string;
    category: string;
    singlePrice?: number;
    priceSmall?: number;
    priceMedium?: number;
    priceLarge?: number;
    priceXLarge?: number;
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
    
    if (item.singlePrice) {
      sizes.push({ label: 'Regular', price: item.singlePrice, value: 'regular' });
    }
    if (item.priceSmall) {
      sizes.push({ label: 'Small', price: item.priceSmall, value: 'small' });
    }
    if (item.priceMedium) {
      sizes.push({ label: 'Medium', price: item.priceMedium, value: 'medium' });
    }
    if (item.priceLarge) {
      sizes.push({ label: 'Large', price: item.priceLarge, value: 'large' });
    }
    if (item.priceXLarge) {
      sizes.push({ label: 'X-Large', price: item.priceXLarge, value: 'xlarge' });
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
  // Disable extras for now to ensure quick add functionality works
  const hasExtras = false;

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
    console.log('DEBUG: handleAddToBasket called from dialog');
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

    console.log('DEBUG: Adding basket item from dialog', basketItem);
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
        console.log('Share cancelled');
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
    console.log('DEBUG: handleQuickAdd called', { item, hasMultipleSizes, hasExtras, sizeOptions });
    
    // Always do quick add for now - simplified functionality
    const price = sizeOptions[0]?.price || item.singlePrice || 0;
    console.log('DEBUG: Quick add price calculation', { price, sizeOptionsPrice: sizeOptions[0]?.price, itemSinglePrice: item.singlePrice });
    
    const basketItem = {
      id: `${item.id}-${Date.now()}`, // Use timestamp to ensure uniqueness
      name: item.name,
      price: price,
      category: item.category,
      emoji: item.name.match(/^[^\w\s]*/)?.[0] || '🍽️',
    };
    
    console.log('DEBUG: Adding basket item', basketItem);
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
        <Button
          size="sm"
          onClick={handleQuickAdd}
          className={`bg-primary hover:bg-red-700 text-white ${className}`}
        >
          <ShoppingBasket className="mr-1 h-3 w-3" />
          Add
        </Button>
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
    <div className="flex gap-2">
      <Button
        onClick={handleQuickAdd}
        className={`bg-primary hover:bg-red-700 text-white flex-1 ${className}`}
      >
        <ShoppingBasket className="mr-2 h-4 w-4" />
        Add to Basket
      </Button>

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