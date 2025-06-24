// Centralized price handling utilities for Family Kebab House
// Handles both string and number price values from database

export const parsePrice = (price: any): number => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const formatPrice = (price: any): string => {
  const numPrice = parsePrice(price);
  return `£${numPrice.toFixed(2)}`;
};

export const safePriceCalculation = (price: any, quantity: number = 1): number => {
  return parsePrice(price) * quantity;
};

export const validatePriceType = (price: any, context: string) => {
  if (process.env.NODE_ENV === 'development') {
    if (price !== null && price !== undefined && typeof price !== 'number' && typeof price !== 'string') {
      console.warn(`Unexpected price type in ${context}:`, typeof price, price);
    }
  }
};

export const getMinPrice = (...prices: any[]): number => {
  const validPrices = prices.filter(p => p != null).map(parsePrice).filter(p => p > 0);
  return validPrices.length > 0 ? Math.min(...validPrices) : 0;
};

export const getMaxPrice = (...prices: any[]): number => {
  const validPrices = prices.filter(p => p != null).map(parsePrice).filter(p => p > 0);
  return validPrices.length > 0 ? Math.max(...validPrices) : 0;
};

export const getCleanPrice = (price: any): number => {
  if (typeof price === 'number') return isNaN(price) ? 0 : price;
  if (typeof price === 'string') {
    const parsed = parseFloat(price);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

export const safeToFixed = (price: any, decimals: number = 2): string => {
  const cleanPrice = getCleanPrice(price);
  return cleanPrice.toFixed(decimals);
};