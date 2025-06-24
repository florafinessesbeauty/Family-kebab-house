# Instructions: Fixing JSX Variable Declaration Error

## Problem Identified
In `src/pages/menu.tsx` around line 583, there's a JSX block that contains raw JavaScript variable declarations instead of an expression that returns a value:

```jsx
{originalPrice && price && (
  <div className="text-sm bg-white/20 rounded-full px-3 py-1 inline-block">
    Save £let priceNum = safeToNumber(price);
    const originalPrice = priceNum * 1.25;
  </div>
)}
```

## Why This Causes Text to Render
In React JSX, when you use `{}` curly braces, you're creating a JavaScript expression slot. React expects this to:
1. Return a value (string, number, JSX element, etc.)
2. NOT contain statements like variable declarations (`let`, `const`, `var`)

When you put `let priceNum = safeToNumber(price); const originalPrice = priceNum * 1.25;` inside `{}`, JavaScript treats it as a sequence of statements that don't return anything. React then converts the undefined result to a string, showing the literal code text.

## Step-by-Step Fix Plan

### Option 1: Pre-calculate Outside JSX (Recommended)
1. Move the price calculation logic outside the JSX return statement
2. Calculate `priceNum` and `originalPrice` in the component's JavaScript logic
3. Use the calculated values directly in JSX

### Option 2: Use IIFE (Immediately Invoked Function Expression)
1. Wrap the calculation in an IIFE that returns the formatted string
2. Structure: `{(() => { /* calculations */ return formattedValue; })()}`

### Option 3: Create Helper Function
1. Extract the savings calculation into a separate helper function
2. Call the function within the JSX expression

## Implementation (Option 1 - Applied)
```jsx
// Calculate savings before JSX return
const numPrice = typeof price === 'string' ? parseFloat(price) : price ?? 0;
const originalPrice = numPrice * 1.25;
const savings = originalPrice - numPrice;

// In JSX, use calculated value directly
{originalPrice && price && (
  <div className="text-sm bg-white/20 rounded-full px-3 py-1 inline-block">
    Save £{safeToFixed(savings)}
  </div>
)}
```

## Fix Applied
The issue has been resolved by using the pre-calculated `numPrice` and `originalPrice` values to compute the savings directly in the JSX expression: `Save £{safeToFixed(originalPrice - numPrice)}`