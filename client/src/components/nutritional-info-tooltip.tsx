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
        className="p-1 text-gray-400 hover:text-blue-600 active:text-blue-800 transition-colors duration-200 touch-manipulation flex-shrink-0"
        aria-label="Nutritional Information"
        type="button"
      >
        <InfoIcon size={16} />
      </button>

      {isVisible && (
        <div className="fixed sm:absolute bottom-4 left-4 right-4 sm:bottom-full sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:mb-2 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-full sm:min-w-64 sm:max-w-80 text-sm">
            <div className="hidden sm:block absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm"></div>
            </div>
            
            {/* Close button for mobile */}
            <div className="flex justify-between items-center mb-3 sm:block">
              <h4 className="font-bold text-gray-800 border-b pb-2 sm:mb-3">Nutritional Information</h4>
              <button 
                onClick={() => setIsVisible(false)}
                className="sm:hidden p-1 text-gray-400 hover:text-gray-600"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            

            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Calories:</span>
                <span className="font-semibold text-gray-800">{nutritionalInfo.calories}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Protein:</span>
                <span className="font-semibold text-gray-800">{nutritionalInfo.protein}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Carbs:</span>
                <span className="font-semibold text-gray-800">{nutritionalInfo.carbs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fat:</span>
                <span className="font-semibold text-gray-800">{nutritionalInfo.fat}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fiber:</span>
                <span className="font-semibold text-gray-800">{nutritionalInfo.fiber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sodium:</span>
                <span className="font-semibold text-gray-800">{nutritionalInfo.sodium}</span>
              </div>
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