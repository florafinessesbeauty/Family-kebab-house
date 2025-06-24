import React from 'react';
import { parsePrice, formatPrice } from '@/utils/price-utils';

interface PriceBadgeProps {
  price: number | string;
  originalPrice?: number | string;
  isSpecial?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'discount' | 'premium';
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({ 
  price, 
  originalPrice, 
  isSpecial = false, 
  size = 'md',
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const variantClasses = {
    default: 'text-primary',
    discount: 'text-green-600',
    premium: 'text-amber-600'
  };

  const numPrice = parsePrice(price);
  const numOriginalPrice = originalPrice ? parsePrice(originalPrice) : 0;
  const hasDiscount = numOriginalPrice > 0 && numOriginalPrice > numPrice;

  return (
    <div className="flex items-center gap-2">
      <span className={`font-bold ${sizeClasses[size]} ${variantClasses[variant]} group-hover:scale-110 transition-transform duration-300`}>
        {formatPrice(price)}
      </span>
      
      {hasDiscount && (
        <span className="text-sm text-gray-400 line-through">
          {formatPrice(originalPrice)}
        </span>
      )}
      
      {isSpecial && (
        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full animate-pulse">
          SPECIAL
        </span>
      )}
      
      {hasDiscount && (
        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          SAVE {formatPrice(numOriginalPrice - numPrice)}
        </span>
      )}
    </div>
  );
};