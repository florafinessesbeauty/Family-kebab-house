# Fix Plan: Runtime Error "price.toFixed is not a function" in Menu Component

## Root Cause Analysis

### Problem Statement
The runtime error `price.toFixed is not a function` occurs because:

1. **API Data Type Mismatch**: The backend API returns price values as **strings** (e.g., `"6.50"`, `"9.00"`) in JSON format
2. **Frontend Expectation**: Components expect price values to be **numbers** and call `.toFixed()` directly
3. **Type System Gap**: TypeScript interfaces define prices as `number`, but runtime values are `string`

### Evidence from API Response
```json
{
  "singlePrice": "6.50",    // String, not number
  "priceMedium": "9.00",    // String, not number  
  "priceLarge": "11.00"     // String, not number
}
```

### Current Code Problems
```typescript
// This FAILS at runtime when price is "6.50" (string)
£{price ? price.toFixed(2) : "Contact Us"}

// This also FAILS when comp.price is "3.50" (string)
£{comp.price.toFixed(2)}
```

## Identified Problem Locations

### Critical Issues (Direct .toFixed() on Dynamic Values)
1. **`src/pages/menu.tsx:457`** - `price.toFixed(2)` where price comes from API
2. **`src/pages/menu.tsx:460`** - `originalPrice.toFixed(2)` calculated from API price
3. **`src/components/meal-builder.tsx:175`** - `comp.price.toFixed(2)` on meal component
4. **`src/components/meal-builder.tsx:240`** - `comp.price.toFixed(2)` on drink component
5. **`src/components/add-to-basket-button.tsx:384,457`** - `size.price.toFixed(2)` on size options

### Partially Fixed Locations (Type Guards Present)
- `src/components/basket-drawer.tsx` - Has `typeof price === 'string'` checks
- `src/pages/home.tsx:373` - Has `typeof offer.price === 'string'` check

## Step-by-Step Fix Plan

### Option A: Transform Data at Fetch Level (Recommended)

#### Step 1: Fix Data Transformation in useEffect
**File**: `src/pages/menu.tsx` (lines 135-140)

**Current Code**:
```typescript
const transformedData: MenuItemData[] = data.map((item: any) => ({
  id: item.id.toString(),
  name: item.name,
  description: item.description,
  category: item.category,
  price: item.singlePrice,  // This is a string!
```

**Fixed Code**:
```typescript
const transformedData: MenuItemData[] = data.map((item: any) => ({
  id: item.id.toString(),
  name: item.name,
  description: item.description,
  category: item.category,
  // Convert all price strings to numbers
  singlePrice: item.singlePrice ? parseFloat(item.singlePrice) : null,
  priceSmall: item.priceSmall ? parseFloat(item.priceSmall) : null,
  priceMedium: item.priceMedium ? parseFloat(item.priceMedium) : null,
  priceLarge: item.priceLarge ? parseFloat(item.priceLarge) : null,
  priceXLarge: item.priceXLarge ? parseFloat(item.priceXLarge) : null,
```

#### Step 2: Add Safe Price Helper Function
**File**: `src/utils/price-utils.ts` (add new function)

```typescript
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
```

#### Step 3: Fix Direct .toFixed() Calls in Menu Component
**File**: `src/pages/menu.tsx`

**Replace**:
```typescript
£{price ? price.toFixed(2) : "Contact Us"}
£{originalPrice.toFixed(2)}
```

**With**:
```typescript
£{price ? safeToFixed(price) : "Contact Us"}
£{safeToFixed(originalPrice)}
```

#### Step 4: Fix Meal Builder Component
**File**: `src/components/meal-builder.tsx`

**Replace both instances**:
```typescript
£{comp.price.toFixed(2)}
```

**With**:
```typescript
£{safeToFixed(comp.price)}
```

**Add import**:
```typescript
import { safeToFixed } from '@/utils/price-utils';
```

#### Step 5: Fix Add-to-Basket Button Component
**File**: `src/components/add-to-basket-button.tsx`

**Replace**:
```typescript
£{size.price.toFixed(2)}
```

**With**:
```typescript
£{safeToFixed(size.price)}
```

**Add import**:
```typescript
import { safeToFixed } from '@/utils/price-utils';
```

### Option B: Global Type Conversion (Alternative)

#### Alternative Step 1: Create Price Conversion Utility
**File**: `src/utils/api-transforms.ts` (new file)

```typescript
export const convertPricesToNumbers = (menuData: any[]): any[] => {
  return menuData.map(item => ({
    ...item,
    singlePrice: item.singlePrice ? parseFloat(item.singlePrice) : null,
    priceSmall: item.priceSmall ? parseFloat(item.priceSmall) : null,
    priceMedium: item.priceMedium ? parseFloat(item.priceMedium) : null,
    priceLarge: item.priceLarge ? parseFloat(item.priceLarge) : null,
    priceXLarge: item.priceXLarge ? parseFloat(item.priceXLarge) : null,
  }));
};
```

### Step 6: Add Error Boundary (Optional but Recommended)
**File**: `src/components/ErrorBoundary.tsx` (new file)

```typescript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Menu Error:', error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return <div className="p-4 text-center">Something went wrong loading the menu. Please refresh.</div>;
    }
    return (this.props as any).children;
  }
}

export default ErrorBoundary;
```

**Wrap Menu component**:
```typescript
<ErrorBoundary>
  <Menu />
</ErrorBoundary>
```

## Why .toFixed() Sometimes Doesn't Exist

### JavaScript Type System Reality
- **String values**: `"6.50".toFixed()` → `TypeError: "6.50".toFixed is not a function`
- **Number values**: `6.50.toFixed()` → `"6.50"` ✓
- **null/undefined**: `null.toFixed()` → `TypeError: Cannot read property 'toFixed' of null`

### API Serialization Issue
1. Database stores prices as `DECIMAL/REAL` (numbers)
2. JSON.stringify() converts numbers to strings in API response
3. Frontend receives `"6.50"` instead of `6.50`
4. Code expects numbers but gets strings

## Implementation Priority

1. **Immediate Fix**: Step 1 (data transformation) + Steps 3-5 (component fixes)
2. **Safety Net**: Step 2 (helper functions) 
3. **Robustness**: Step 6 (error boundary)
4. **Testing**: Verify all menu items display correctly

## Testing Strategy

### Before Fix
- Menu component crashes with "price.toFixed is not a function"
- Multiple components fail when displaying prices

### After Fix  
- All menu items display prices correctly
- Meal builder shows proper pricing
- Add-to-basket functionality works
- No console errors related to price formatting

## Prevention Measures

1. **Centralized Price Handling**: All price operations through utility functions
2. **Type Guards**: Runtime validation in development mode  
3. **Error Boundaries**: Graceful failure handling
4. **Code Reviews**: Mandatory review of price-related changes

This plan addresses both the immediate crashes and establishes robust price handling for future development.