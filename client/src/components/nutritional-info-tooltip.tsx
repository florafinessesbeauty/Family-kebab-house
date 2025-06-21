import React, { useState } from 'react';
import { InfoIcon } from 'lucide-react';
import { getNutritionalInfo, type NutritionalInfo } from '../data/nutritional-data';

interface NutritionalInfoTooltipProps {
  itemName: string;
  category: string;
}

const NutritionalInfoTooltip: React.FC<NutritionalInfoTooltipProps> = ({ itemName, category }) => {
  const [isVisible, setIsVisible] = useState(false);

  const nutritionalInfo = getNutritionalInfo(itemName, category);


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