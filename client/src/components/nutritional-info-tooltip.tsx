// client/src/components/nutritional-info-tooltip.tsx
import React, { useState, useEffect, useRef } from 'react';
import { InfoIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription
} from './ui/dialog';

interface NutritionalInfoTooltipProps {
  itemName: string;
  category: string;
  nutritionalData?: {
    calories?: number;
    protein?: string | number;
    carbs?: string | number;
    fat?: string | number;
    fiber?: string | number;
    sodium?: string | number;
    allergens?: string | string[];
    ingredients?: string | string[];
  };
}

const NutritionalInfoTooltip: React.FC<NutritionalInfoTooltipProps> = ({
  itemName,
  category,
  nutritionalData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on scroll or click/tap outside
  useEffect(() => {
    const onScroll = () => setIsOpen(false);
    const onClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('touchstart', onClickOutside);
    };
  }, [isOpen]);

  // Build or estimate nutrition info
  type Info = {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sodium: string;
    allergens: string[];
    ingredients?: string[];
  };

  const nutritionalInfo: Info = React.useMemo(() => {
    if (nutritionalData && nutritionalData.calories != null) {
      return {
        calories: nutritionalData.calories,
        protein:
          typeof nutritionalData.protein === 'number'
            ? `${nutritionalData.protein}g`
            : nutritionalData.protein?.toString() || '0g',
        carbs:
          typeof nutritionalData.carbs === 'number'
            ? `${nutritionalData.carbs}g`
            : nutritionalData.carbs?.toString() || '0g',
        fat:
          typeof nutritionalData.fat === 'number'
            ? `${nutritionalData.fat}g`
            : nutritionalData.fat?.toString() || '0g',
        fiber:
          typeof nutritionalData.fiber === 'number'
            ? `${nutritionalData.fiber}g`
            : nutritionalData.fiber?.toString() || '0g',
        sodium:
          typeof nutritionalData.sodium === 'number'
            ? `${nutritionalData.sodium}mg`
            : nutritionalData.sodium?.toString() || '0mg',
        allergens: Array.isArray(nutritionalData.allergens)
          ? nutritionalData.allergens
          : typeof nutritionalData.allergens === 'string'
          ? nutritionalData.allergens
              .split(',')
              .map(a => a.trim())
          : [],
        ingredients: Array.isArray(nutritionalData.ingredients)
          ? nutritionalData.ingredients
          : typeof nutritionalData.ingredients === 'string'
          ? nutritionalData.ingredients
              .split(',')
              .map(i => i.trim())
          : []
      };
    }

    // Fallback estimation (only pizza shown here — add others if needed)
    const lower = itemName.toLowerCase();
    const is12 = lower.includes('12"') || lower.includes('12 inch');
    return {
      calories: is12 ? 1200 : 850,
      protein: is12 ? '45g' : '32g',
      carbs: is12 ? '140g' : '98g',
      fat: is12 ? '48g' : '34g',
      fiber: is12 ? '8g' : '6g',
      sodium: is12 ? '2200mg' : '1550mg',
      allergens: ['Gluten', 'Dairy'],
      ingredients: ['Fresh pizza dough', 'Tomato sauce', 'Cheese', 'Toppings']
    };
  }, [itemName, nutritionalData]);

  return (
    <div className="relative inline-block">
      {/* Info Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(o => !o)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="View nutritional information"
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm border-2 border-primary/30 text-primary hover:bg-primary hover:text-white transition-all duration-300 shadow-lg flex-shrink-0"
        type="button"
      >
        <InfoIcon size={16} />
      </button>

      {/* Dialog & Backdrop */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              style={{ zIndex: 99999 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Content */}
            <DialogContent className="relative bg-white border-2 border-primary/20 rounded-2xl shadow-2xl p-6 w-full max-w-md text-sm z-50">
              <DialogTitle className="sr-only">
                Nutritional Information for {itemName}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Detailed nutritional facts, allergens, and ingredients for{' '}
                {itemName}
              </DialogDescription>

              {/* Header */}
              <div className="flex justify-between items-start mb-6 animate-in slide-in-from-top-4 fade-in-0" style={{ animationDuration: '500ms', animationFillMode: 'both' }}>
                <div className="flex-1 pr-4">
                  <h4 className="font-bold text-charcoal text-xl mb-1">Nutritional Information</h4>
                  <p className="text-primary font-semibold text-base">{itemName}</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-3 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-300 flex-shrink-0"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nutritional Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: '🔥 Calories', value: nutritionalInfo.calories, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', valColor: 'text-blue-900', delay: 0 },
                  { label: '💪 Protein',  value: nutritionalInfo.protein,  bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700',  valColor: 'text-green-900',  delay: 100 },
                  { label: '🌾 Carbs',    value: nutritionalInfo.carbs,    bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', valColor: 'text-yellow-900', delay: 200 },
                  { label: '🧈 Fat',      value: nutritionalInfo.fat,      bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    valColor: 'text-red-900',    delay: 300 },
                  { label: '🌿 Fiber',    value: nutritionalInfo.fiber,    bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700',valColor: 'text-purple-900',delay: 400 },
                  { label: '🧂 Sodium',   value: nutritionalInfo.sodium,   bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700',valColor: 'text-orange-900',delay: 500 }
                ].map((cell, i) => (
                  <div
                    key={i}
                    className={`${cell.bg} p-4 rounded-xl ${cell.border} border hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in-0`}
                    style={{ animationDelay: `${cell.delay}ms`, animationDuration: '600ms', animationFillMode: 'both' }}
                  >
                    <div className={`${cell.text} font-semibold text-sm`} style={{ animationDelay: `${cell.delay + 200}ms`, animationDuration: '400ms', animationFillMode: 'both' }}>
                      {cell.label}
                    </div>
                    <div className={`${cell.valColor} font-bold text-xl`} style={{ animationDelay: `${cell.delay + 400}ms`, animationDuration: '500ms', animationFillMode: 'both' }}>
                      {cell.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Allergens */}
              <div className="mt-3 pt-2 border-t">
                <div className="text-gray-600 text-xs mb-2"><strong>Allergens:</strong></div>
                <div className="flex flex-wrap gap-1">
                  {nutritionalInfo.allergens.map((allergen, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              {nutritionalInfo.ingredients?.length ? (
                <div className="mt-3 pt-2 border-t text-gray-600 text-xs">
                  <strong>Main Ingredients:</strong>
                  <div className="mt-1 text-gray-500">
                    {nutritionalInfo.ingredients.join(', ')}
                  </div>
                </div>
              ) : null}

              <div className="mt-2 text-xs text-gray-500 italic">
                *Nutritional values based on standard portions. Please inform staff of allergies.
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default NutritionalInfoTooltip;
