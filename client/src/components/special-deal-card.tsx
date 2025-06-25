import React from 'react';
import AddToBasketButton from '@/components/add-to-basket-button';
import { MenuItemData } from '@/data/menu-data';
import { useAnimationControl } from '@/hooks/use-animation-control';

interface SpecialDealCardProps {
  deal: MenuItemData;
}

const SpecialDealCard = React.memo(function SpecialDealCard({ deal }: SpecialDealCardProps) {
  const [ref, isVisible] = useAnimationControl();
  
  const isKebabFeast = deal.name === "Kebab Feast" || deal.name === "🎉 Kebab Feast";
  const isFamilyDeal = deal.name.includes("Family Deal");
  const isChickenCombo = deal.name.includes("3 Pcs Chicken + 4 Spicy Wings");

  return (
    <div 
      ref={ref}
      className={`special-deal-card relative rounded-2xl p-6 text-white text-center transition-all duration-500 cursor-pointer group ${
        isKebabFeast 
          ? `bg-gradient-to-br from-yellow-400 via-amber-500 via-orange-600 to-red-700 shadow-2xl transform scale-110 border-8 border-yellow-300 hover:scale-115 hover:shadow-3xl ${isVisible ? 'animate-pulse-optimized' : ''}` 
          : isFamilyDeal
          ? "bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 hover:scale-105 shadow-xl border-2 border-pink-300"
          : isChickenCombo
          ? "bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 hover:scale-105 shadow-xl border-2 border-orange-300"
          : "bg-gradient-to-br from-accent to-orange-600 hover:scale-105"
      }`}
    >
      {/* Special Animation for Kebab Feast - Only when visible */}
      {isKebabFeast && isVisible && (
        <>
          {/* Optimized rotating rings with GPU acceleration */}
          <div className="absolute inset-0 rounded-2xl border-8 border-yellow-300 animate-spin-gpu" style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-2 rounded-2xl border-4 border-orange-400 animate-spin-gpu" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-4 rounded-2xl border-2 border-red-400 animate-spin-gpu" style={{ animationDuration: '4s' }}></div>
          
          {/* Enhanced floating sparkles with optimized animation */}
          <div className="absolute top-1 right-1 text-yellow-300 animate-bounce-gpu text-2xl" style={{ animationDelay: '0s' }}>✨</div>
          <div className="absolute top-3 left-1 text-yellow-300 animate-bounce-gpu text-xl" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute bottom-3 right-3 text-yellow-300 animate-bounce-gpu text-2xl" style={{ animationDelay: '1s' }}>💫</div>
          <div className="absolute bottom-1 left-3 text-orange-300 animate-bounce-gpu text-xl" style={{ animationDelay: '1.5s' }}>🌟</div>
          <div className="absolute top-1/2 left-1 text-red-300 animate-bounce-gpu text-lg" style={{ animationDelay: '2s' }}>⚡</div>
          <div className="absolute top-1/2 right-1 text-yellow-200 animate-bounce-gpu text-lg" style={{ animationDelay: '2.5s' }}>🔥</div>
          
          {/* Optimized glowing effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-red-600/20 animate-pulse-optimized"></div>
          
          {/* Premium badge enhanced */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-red-900 px-4 py-2 rounded-full text-sm font-black animate-pulse-optimized border-4 border-white shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
            🏆 ULTIMATE FEAST 🏆
          </div>
          
          {/* Value highlight */}
          <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-green-900 px-3 py-1 rounded-full text-xs font-bold animate-bounce-gpu border-2 border-white transform -rotate-12">
            BEST VALUE!
          </div>
          
          {/* Optimized pulsing glow border */}
          <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl opacity-75 blur-sm animate-pulse-optimized"></div>
        </>
      )}

      {/* Interactive Family Deal Highlights - Only when visible */}
      {isFamilyDeal && isVisible && (
        <>
          {/* Pulsing border on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-pink-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-optimized transition-opacity duration-300"></div>
          
          {/* Family icons */}
          <div className="absolute top-2 left-2 text-pink-200 group-hover:animate-bounce-gpu">👨‍👩‍👧‍👦</div>
          <div className="absolute top-2 right-2 text-pink-200 group-hover:animate-bounce-gpu" style={{ animationDelay: '0.2s' }}>🍽️</div>
          
          {/* Savings badge */}
          <div className="absolute -top-2 -left-2 bg-green-400 text-green-900 px-2 py-1 rounded-full text-xs font-bold transform -rotate-12 group-hover:animate-pulse-optimized">
            FAMILY SAVINGS
          </div>
          
          {/* Price highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pink-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </>
      )}

      {/* Interactive Chicken Combo Highlights - Only when visible */}
      {isChickenCombo && isVisible && (
        <>
          {/* Pulsing border on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-orange-300 opacity-0 group-hover:opacity-100 group-hover:animate-pulse-optimized transition-opacity duration-300"></div>
          
          {/* Chicken icons */}
          <div className="absolute top-2 left-2 text-orange-200 group-hover:animate-bounce-gpu">🍗</div>
          <div className="absolute top-2 right-2 text-orange-200 group-hover:animate-bounce-gpu" style={{ animationDelay: '0.2s' }}>🔥</div>
          <div className="absolute bottom-2 left-2 text-orange-200 group-hover:animate-bounce-gpu" style={{ animationDelay: '0.4s' }}>🍟</div>
          
          {/* Spicy badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold transform rotate-12 group-hover:animate-pulse-optimized">
            SPICY COMBO
          </div>
          
          {/* Price highlight overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        </>
      )}
      
      <div className="relative z-10">
        {/* Title with enhanced styling */}
        <h3 className={`font-bold mb-2 sm:mb-3 ${
          isKebabFeast ? 'text-yellow-100 text-lg sm:text-xl md:text-2xl font-black animate-pulse-optimized' : 
          isFamilyDeal ? 'text-pink-100 text-base sm:text-lg md:text-xl' : 
          isChickenCombo ? 'text-orange-100 text-base sm:text-lg md:text-xl' :
          'text-white text-sm sm:text-base md:text-lg'
        }`}>
          {deal.name}
        </h3>
        
        {/* Description */}
        {deal.description && (
          <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90 leading-tight">
            {deal.description}
          </p>
        )}
        
        {/* Price with special styling */}
        <div className={`mb-3 sm:mb-4 font-bold ${
          isKebabFeast ? 'text-2xl sm:text-3xl md:text-4xl text-yellow-200 animate-pulse-optimized font-black' : 
          isFamilyDeal ? 'text-lg sm:text-xl md:text-2xl text-pink-100 group-hover:text-xl group-hover:sm:text-2xl group-hover:md:text-3xl group-hover:text-white group-hover:animate-pulse-optimized' : 
          isChickenCombo ? 'text-lg sm:text-xl md:text-2xl text-orange-100 group-hover:text-xl group-hover:sm:text-2xl group-hover:md:text-3xl group-hover:text-white group-hover:animate-pulse-optimized' :
          'text-base sm:text-lg md:text-xl text-white'
        }`}>
          £{deal.singlePrice?.toFixed(2) || '0.00'}
        </div>
        
        {/* Add to Basket Button */}
        <AddToBasketButton 
          item={{
            id: deal.id,
            name: deal.name,
            category: deal.category,
            singlePrice: deal.singlePrice || 0,
            description: deal.description
          }}
          className={
            isKebabFeast 
              ? "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 text-white hover:from-yellow-300 hover:via-orange-300 hover:to-red-400 font-black text-sm sm:text-base md:text-lg transform hover:scale-110 shadow-2xl animate-pulse-optimized hover:animate-none border-2 sm:border-4 border-white py-2 sm:py-3" 
              : isFamilyDeal
              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400 font-bold transform hover:scale-105 shadow-xl border-2 border-white text-sm sm:text-base py-2 sm:py-3"
              : isChickenCombo
              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-400 hover:to-orange-400 font-bold transform hover:scale-105 shadow-xl border-2 border-white text-sm sm:text-base py-2 sm:py-3"
              : "bg-white text-accent hover:bg-gray-100 font-semibold transform hover:scale-105 text-sm sm:text-base py-2 sm:py-3"
          }
        />
      </div>
    </div>
  );
});

export default SpecialDealCard;