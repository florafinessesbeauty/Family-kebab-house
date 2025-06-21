import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';

interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sodium: string;
  allergens: string[];
  ingredients?: string[];
}

interface NutritionalInfoTooltipProps {
  itemName: string;
  category: string;
  nutritionalData?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
    fiber?: string;
    sodium?: string;
    allergens?: string[];
    ingredients?: string[];
  };
}

const NutritionalInfoTooltip: React.FC<NutritionalInfoTooltipProps> = ({ itemName, category, nutritionalData }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Use database nutritional data if available, otherwise estimate
  const nutritionalInfo: NutritionalInfo = nutritionalData && nutritionalData.calories ? {
    calories: nutritionalData.calories,
    protein: nutritionalData.protein || "0g",
    carbs: nutritionalData.carbs || "0g", 
    fat: nutritionalData.fat || "0g",
    fiber: nutritionalData.fiber || "0g",
    sodium: nutritionalData.sodium || "0mg",
    allergens: nutritionalData.allergens || [],
    ingredients: nutritionalData.ingredients || []
  } : estimateNutritionByCategory(itemName, category);

  function estimateNutritionByCategory(name: string, cat: string): NutritionalInfo {
    const lowerName = name.toLowerCase();
    const lowerCat = cat.toLowerCase();
    
    // Kebab estimates
    if (lowerCat.includes('kebab') || lowerName.includes('kebab')) {
      if (lowerName.includes('feast')) {
        return {
          calories: 1850,
          protein: "95g",
          carbs: "120g",
          fat: "85g",
          fiber: "12g",
          sodium: "3200mg",
          allergens: ["Gluten", "Dairy", "Sesame"],
          ingredients: ["Doner meat", "Shish kebab", "Chicken shish", "Kofte", "3 pitta breads", "Large chips", "Mixed salad", "2 sauces"]
        };
      }
      if (lowerName.includes('large') || lowerName.includes('xl')) {
        return {
          calories: 720,
          protein: "42g",
          carbs: "56g",
          fat: "32g",
          fiber: "7g",
          sodium: "1380mg",
          allergens: ["Gluten", "Dairy", "Sesame"],
          ingredients: ["Meat", "Pitta bread", "Fresh salad", "Sauce"]
        };
      }
      return {
        calories: 550,
        protein: "32g",
        carbs: "44g",
        fat: "25g",
        fiber: "6g",
        sodium: "1050mg",
        allergens: ["Gluten", "Dairy", "Sesame"],
        ingredients: ["Meat", "Pitta bread", "Fresh salad", "Sauce"]
      };
    }
    
    // Pizza estimates
    if (lowerCat.includes('pizza') || lowerName.includes('pizza')) {
      const is12Inch = lowerName.includes('12"') || lowerName.includes('12 inch');
      return {
        calories: is12Inch ? 1200 : 850,
        protein: is12Inch ? "45g" : "32g",
        carbs: is12Inch ? "140g" : "98g",
        fat: is12Inch ? "48g" : "34g",
        fiber: is12Inch ? "8g" : "6g",
        sodium: is12Inch ? "2200mg" : "1550mg",
        allergens: ["Gluten", "Dairy"],
        ingredients: ["Fresh pizza dough", "Tomato sauce", "Cheese", "Toppings"]
      };
    }
    
    // Burger estimates
    if (lowerCat.includes('burger') || lowerName.includes('burger')) {
      return {
        calories: 480,
        protein: "25g",
        carbs: "35g",
        fat: "28g",
        fiber: "4g",
        sodium: "950mg",
        allergens: ["Gluten", "Dairy", "Eggs"],
        ingredients: ["Meat patty", "Burger bun", "Fresh vegetables", "Sauce"]
      };
    }
    
    // Chicken estimates
    if (lowerCat.includes('chicken') || lowerName.includes('chicken')) {
      return {
        calories: 380,
        protein: "32g",
        carbs: "15g",
        fat: "24g",
        fiber: "1g",
        sodium: "820mg",
        allergens: ["Gluten"],
        ingredients: ["Chicken", "Seasoning", "Coating"]
      };
    }
    
    // Default estimate
    return {
      calories: 420,
      protein: "22g",
      carbs: "35g",
      fat: "25g",
      fiber: "4g",
      sodium: "850mg",
      allergens: ["Check with staff"],
      ingredients: ["Various ingredients - ask staff for details"]
    };
  }


  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onTouchStart={() => setIsVisible(!isVisible)}
        onClick={() => setIsVisible(!isVisible)}
        className="p-2 rounded-full bg-white/90 backdrop-blur-sm border-2 border-primary/30 text-primary hover:bg-primary hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex-shrink-0 group"
        style={{ 
          position: 'relative',
          zIndex: 99997
        }}
        aria-label="View Nutritional Information"
        type="button"
      >
        <InfoIcon size={16} className="group-hover:animate-pulse" />
        <span 
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-charcoal text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none"
          style={{ zIndex: 2147483647 }}
        >
          Nutrition Info
        </span>
      </button>

      {isVisible && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4"
          style={{ 
            zIndex: 2147483647,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            style={{ zIndex: 99999 }}
            onClick={() => setIsVisible(false)}
          />
          
          {/* Tooltip Content */}
          <div 
            className="relative bg-white border-2 border-primary/20 rounded-2xl shadow-2xl p-6 w-full max-w-md text-sm"
            style={{ 
              zIndex: 100000,
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl scale-110" style={{ zIndex: -1 }} />
            
            {/* Header with close button and slide-in animation */}
            <div className="flex justify-between items-start mb-4 animate-in slide-in-from-top-4 fade-in-0" 
                 style={{ animationDuration: '500ms', animationFillMode: 'both' }}>
              <div>
                <h4 className="font-bold text-charcoal text-lg animate-in fade-in-0" 
                    style={{ animationDelay: '200ms', animationDuration: '400ms', animationFillMode: 'both' }}>
                  Nutritional Information
                </h4>
                <p className="text-primary font-semibold animate-in slide-in-from-left-2 fade-in-0" 
                   style={{ animationDelay: '400ms', animationDuration: '500ms', animationFillMode: 'both' }}>
                  {itemName}
                </p>
              </div>
              <button 
                onClick={() => setIsVisible(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all duration-300 animate-in zoom-in-50"
                style={{ animationDelay: '300ms', animationDuration: '400ms', animationFillMode: 'both' }}
                aria-label="Close"
              >
                <svg className="w-5 h-5 hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            

            {/* Nutritional Grid with Staggered Animation */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "🔥 Calories", value: nutritionalInfo.calories, color: "blue", delay: "0ms" },
                { label: "💪 Protein", value: nutritionalInfo.protein, color: "green", delay: "100ms" },
                { label: "🌾 Carbs", value: nutritionalInfo.carbs, color: "yellow", delay: "200ms" },
                { label: "🧈 Fat", value: nutritionalInfo.fat, color: "red", delay: "300ms" },
                { label: "🌿 Fiber", value: nutritionalInfo.fiber, color: "purple", delay: "400ms" },
                { label: "🧂 Sodium", value: nutritionalInfo.sodium, color: "orange", delay: "500ms" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 p-3 rounded-xl border border-${item.color}-200 hover:scale-105 transition-all duration-300 animate-in slide-in-from-bottom-4 fade-in-0`}
                  style={{ 
                    animationDelay: item.delay,
                    animationDuration: '600ms',
                    animationFillMode: 'both'
                  }}
                >
                  <div className={`text-${item.color}-700 font-semibold text-xs mb-1 animate-in fade-in-0`} 
                       style={{ animationDelay: `${parseInt(item.delay) + 200}ms`, animationDuration: '400ms', animationFillMode: 'both' }}>
                    {item.label}
                  </div>
                  <div className={`text-${item.color}-900 font-bold text-lg animate-in zoom-in-50`}
                       style={{ animationDelay: `${parseInt(item.delay) + 400}ms`, animationDuration: '500ms', animationFillMode: 'both' }}>
                    {item.value}
                  </div>
                  {/* Pulse effect overlay */}
                  <div className={`absolute inset-0 bg-${item.color}-200 rounded-xl opacity-0 animate-ping`}
                       style={{ animationDelay: `${parseInt(item.delay) + 600}ms`, animationDuration: '1s', animationIterationCount: '1' }}></div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t">
              <div className="text-gray-600 text-xs">
                <strong>Allergens:</strong>
                <div className="mt-1">
                  {nutritionalInfo.allergens.map((allergen, index) => (
                    <span
                      key={index}
                      className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-1 mb-1"
                    >
                      {allergen}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {nutritionalInfo.ingredients && (
              <div className="mt-3 pt-2 border-t">
                <div className="text-gray-600 text-xs">
                  <strong>Main Ingredients:</strong>
                  <div className="mt-1 text-gray-500">
                    {nutritionalInfo.ingredients.join(', ')}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-2 text-xs text-gray-500 italic">
              *Nutritional values based on standard portions. Please inform staff of allergies.
            </div>
          </div>
          
          {/* Mobile backdrop */}
          <div 
            className="sm:hidden fixed inset-0 bg-black bg-opacity-25 -z-10"
            onClick={() => setIsVisible(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default NutritionalInfoTooltip;