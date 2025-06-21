import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';

interface NutritionalInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
  allergens: string[];
}

interface NutritionalInfoTooltipProps {
  itemName: string;
  category: string;
}

const NutritionalInfoTooltip: React.FC<NutritionalInfoTooltipProps> = ({ itemName, category }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Generate realistic nutritional info based on item type and category
  const getNutritionalInfo = (name: string, cat: string): NutritionalInfo => {
    const lowerName = name.toLowerCase();
    const lowerCat = cat.toLowerCase();

    // Base nutritional values for different food types
    if (lowerCat.includes('kebab') || lowerName.includes('kebab')) {
      if (lowerName.includes('feast')) {
        return {
          calories: 1850,
          protein: '95g',
          carbs: '120g',
          fat: '85g',
          allergens: ['Gluten', 'Dairy', 'Sesame']
        };
      }
      return {
        calories: lowerName.includes('large') ? 750 : lowerName.includes('medium') ? 580 : 450,
        protein: lowerName.includes('large') ? '45g' : lowerName.includes('medium') ? '35g' : '28g',
        carbs: lowerName.includes('large') ? '65g' : lowerName.includes('medium') ? '50g' : '38g',
        fat: lowerName.includes('large') ? '35g' : lowerName.includes('medium') ? '28g' : '22g',
        allergens: ['Gluten', 'Dairy', 'Sesame']
      };
    }
    
    if (lowerCat.includes('pizza') || lowerName.includes('pizza')) {
      const is12Inch = lowerName.includes('12"') || lowerName.includes('12 inch');
      return {
        calories: is12Inch ? 1200 : 850,
        protein: is12Inch ? '45g' : '32g',
        carbs: is12Inch ? '140g' : '98g',
        fat: is12Inch ? '48g' : '34g',
        allergens: ['Gluten', 'Dairy']
      };
    }

    if (lowerCat.includes('burger') || lowerName.includes('burger')) {
      const isDouble = lowerName.includes('½') || lowerName.includes('double');
      return {
        calories: isDouble ? 720 : 480,
        protein: isDouble ? '38g' : '25g',
        carbs: isDouble ? '45g' : '35g',
        fat: isDouble ? '42g' : '28g',
        allergens: ['Gluten', 'Dairy', 'Eggs']
      };
    }

    if (lowerCat.includes('chicken') || lowerName.includes('chicken')) {
      if (lowerName.includes('wings')) {
        return {
          calories: 320,
          protein: '28g',
          carbs: '8g',
          fat: '22g',
          allergens: ['None (check seasoning)']
        };
      }
      return {
        calories: 380,
        protein: '32g',
        carbs: '15g',
        fat: '24g',
        allergens: ['Gluten (if breaded)']
      };
    }

    if (lowerCat.includes('dessert') || lowerName.includes('cake') || lowerName.includes('ice')) {
      return {
        calories: 285,
        protein: '4g',
        carbs: '45g',
        fat: '12g',
        allergens: ['Gluten', 'Dairy', 'Eggs']
      };
    }

    if (lowerCat.includes('drink') || lowerName.includes('drink')) {
      if (lowerName.includes('coke') || lowerName.includes('pepsi') || lowerName.includes('sprite')) {
        return {
          calories: 140,
          protein: '0g',
          carbs: '39g',
          fat: '0g',
          allergens: ['None']
        };
      }
      return {
        calories: 0,
        protein: '0g',
        carbs: '0g',
        fat: '0g',
        allergens: ['None']
      };
    }

    // Default values for other items
    return {
      calories: 420,
      protein: '22g',
      carbs: '35g',
      fat: '25g',
      allergens: ['Check with staff']
    };
  };

  const nutritionalInfo = getNutritionalInfo(itemName, category);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-200"
        aria-label="Nutritional Information"
      >
        <InfoIcon size={16} />
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl p-4 min-w-64 max-w-80 text-sm">
            <div className="absolute top-full left-1/2 transform -translate-x-1/2">
              <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white drop-shadow-sm"></div>
            </div>
            
            <h4 className="font-bold text-gray-800 mb-3 border-b pb-2">Nutritional Information</h4>
            
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

            <div className="mt-2 text-xs text-gray-500 italic">
              *Approximate values. Please inform staff of allergies.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionalInfoTooltip;