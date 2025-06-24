# Price.toFixed Runtime Error Analysis & Fix Plan

## Root Cause Analysis

### Problem Statement
The runtime error `price.toFixed is not a function` occurs when the application attempts to call `.toFixed()` on price values that are strings, not numbers.

### Data Flow Analysis

1. **Backend Database (PostgreSQL)**: Stores prices as `real` type (numbers)
2. **Backend API Response**: Converts to JSON, where numbers become strings
3. **Frontend Reception**: Receives price fields as strings (e.g., "6.50", "9.00")
4. **Type Mismatch**: Code expects numbers but receives strings

### Evidence from API Response
```json
{
  "singlePrice": "6.50",    // String, not number
  "priceMedium": "9.00",    // String, not number
  "priceLarge": "11.00"     // String, not number
}
```

### Current Type Definitions
- **Database Schema**: `real` fields for prices (numbers)
- **Frontend Interface**: `number` types for prices
- **Runtime Reality**: String values from JSON serialization

## Affected Components

### 1. Menu Component (Primary Error Source)
- **File**: `client/src/pages/menu.tsx`
- **Issue**: Data transformation maps API strings directly to number fields
- **Line 102**: `Price: £${item.singlePrice || 'varies'}` - assumes number

### 2. Price Badge Component
- **File**: `client/src/components/price-badge.tsx`
- **Lines 35, 40, 52**: Multiple `.toFixed(2)` calls on price parameters
- **Type Definition**: Expects `number` but may receive `string`

### 3. Menu Category Component
- **File**: `client/src/components/menu-category.tsx`
- **Line 17**: `formatPrice` function expects numbers
- **Runtime**: Receives string values from API

### 4. Basket Drawer Component
- **File**: `client/src/components/basket-drawer.tsx`
- **Lines 16, 26, 40, 106, 147, 160**: Multiple price calculations
- **Partially Fixed**: Some instances already have string guards

### 5. Food Recommendation Component
- **File**: `client/src/components/food-recommendation.tsx`
- **Lines 53-67**: Price formatting in `formatPrice` function
- **Already Fixed**: Has proper string handling

## Type Inconsistencies

### Database vs Frontend
```typescript
// Database (server/models/MenuItem.js)
singlePrice: DECIMAL(10,2)  // Numbers in DB

// API Response (JSON serialization)
"singlePrice": "6.50"       // Strings in JSON

// Frontend Interface (client/src/data/menu-data.ts)
singlePrice?: number;       // Expected as numbers

// Runtime Reality
singlePrice: "6.50"         // Actually strings
```

## Comprehensive Fix Plan

### Phase 1: Create Safe Price Utilities
Create centralized price handling utilities:

```typescript
// client/src/utils/price-utils.ts
export const parsePrice = (price: any): number => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') return parseFloat(price) || 0;
  return 0;
};

export const formatPrice = (price: any): string => {
  const numPrice = parsePrice(price);
  return `£${numPrice.toFixed(2)}`;
};

export const safePriceCalculation = (price: any, quantity: number = 1): number => {
  return parsePrice(price) * quantity;
};
```

### Phase 2: Update Type Definitions
Modify interfaces to reflect runtime reality:

```typescript
// client/src/data/menu-data.ts
export interface MenuItemData {
  // ... other fields
  priceSmall?: number | string;
  priceMedium?: number | string;
  priceLarge?: number | string;
  priceXLarge?: number | string;
  singlePrice?: number | string;
  // ... other fields
}
```

### Phase 3: Fix All Components

#### Menu Component
- Replace direct price usage with `parsePrice()`
- Update data transformation to handle string prices
- Add type guards for all price operations

#### Price Badge Component
- Update props to accept `number | string`
- Use `parsePrice()` before all `.toFixed()` calls
- Maintain backward compatibility

#### Menu Category Component
- Update `formatPrice` to handle mixed types
- Fix all size comparison arrays type definitions
- Ensure basket integration works with strings

#### Basket Components
- Complete the partial fixes already in place
- Ensure all calculations use `safePriceCalculation()`
- Update total calculations

### Phase 4: Add Runtime Validation
Add development-time warnings for unexpected types:

```typescript
const validatePriceType = (price: any, context: string) => {
  if (process.env.NODE_ENV === 'development') {
    if (price !== null && price !== undefined && typeof price !== 'number' && typeof price !== 'string') {
      console.warn(`Unexpected price type in ${context}:`, typeof price, price);
    }
  }
};
```

### Phase 5: Backend Consideration
Consider updating backend to ensure consistent number serialization:

```javascript
// server/routes.ts - Add number conversion
const transformedData = data.map(item => ({
  ...item,
  singlePrice: item.singlePrice ? Number(item.singlePrice) : null,
  priceMedium: item.priceMedium ? Number(item.priceMedium) : null,
  // ... other price fields
}));
```

## Implementation Priority

1. **Immediate Fix**: Create price utilities and fix current crashes
2. **Type Safety**: Update interfaces and add type guards
3. **Component Updates**: Systematically fix all affected components
4. **Testing**: Verify all price displays and calculations
5. **Backend Optimization**: Ensure consistent number types from API

## Testing Strategy

1. **Unit Tests**: Test price utilities with various input types
2. **Integration Tests**: Verify price display across all components
3. **Runtime Testing**: Check basket calculations and totals
4. **Edge Cases**: Test with null, undefined, zero, and negative prices

## Prevention Measures

1. **Centralized Price Handling**: All price operations through utilities
2. **Type Guards**: Runtime validation of price types
3. **Documentation**: Clear guidelines for price handling
4. **Code Reviews**: Mandatory review of price-related changes

This plan addresses the immediate crashes while establishing robust price handling for future development.