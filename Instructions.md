# Menu Display Issue Analysis & Fix Plan

## PROBLEM ANALYSIS

After deep inspection of the Menu page code, I've identified the core issues preventing categories, dishes, and special offers from displaying:

### 1. **Category Mismatch Issue**
- **Problem**: Default `activeCategory` is set to `"kebabs"` but API returns categories like `"burgers"`, `"drinks"`, etc.
- **Evidence**: API categories don't match the hardcoded default
- **Impact**: `getItemsByCategory("kebabs")` returns empty array, so no items display

### 2. **Special Deals Filter Issue**  
- **Problem**: `specialDeals = menuData.filter(item => item.isSpecial)` depends on API returning `isSpecial: true`
- **Evidence**: API data shows `"isSpecial": false` for all items
- **Impact**: Special offers section never renders because array is empty

### 3. **Categories Navigation Issue**
- **Problem**: Navigation buttons are generated from imported `categories` constant but filter against API data with different category names
- **Evidence**: Static categories vs dynamic API categories mismatch
- **Impact**: Category buttons may show "0 items" and filtering fails

### 4. **Data Transformation Issue**
- **Problem**: API data structure doesn't perfectly match expected `MenuItemData` interface
- **Evidence**: API has different field names/structure than expected
- **Impact**: Category filtering and price display inconsistencies

## ROOT CAUSE

The code was originally written to work with static menu data from `menu-data.ts` but now fetches from API with different data structure and category names. The filtering logic, default category, and special offers detection all depend on the old static data format.

## PRECISE FIX PLAN

### Step 1: Fix Category System
```typescript
// In menu.tsx useEffect, after fetching data:
const apiCategories = [...new Set(transformedData.map(item => item.category))];
const firstCategory = apiCategories[0] || "burgers"; 
setActiveCategory(firstCategory); // Set to actual API category instead of "kebabs"
```

### Step 2: Fix Special Deals Detection
```typescript
// Update specialDeals calculation to work with actual API data:
const specialDeals = menuData.filter(item => 
  item.isSpecial === true || 
  item.category === "lunch-offers" || 
  item.name.includes("Family Deal") ||
  item.name.includes("Kebab Feast") ||
  item.singlePrice && parseFloat(item.singlePrice.toString()) < 10 // lunch offers under £10
);
```

### Step 3: Dynamic Categories Navigation
```typescript
// Replace static categories with dynamic ones from API:
const dynamicCategories = apiCategories.map(categoryId => {
  const itemCount = getItemsByCategory(categoryId).length;
  return {
    id: categoryId,
    name: categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: getCategoryIcon(categoryId), // Helper function for icons
    count: itemCount
  };
}).filter(cat => cat.count > 0); // Only show categories with items
```

### Step 4: Update Data Transformation
```typescript
// In fetchMenuData, ensure complete transformation:
const transformedData: MenuItemData[] = data.map((item: any) => ({
  id: item.id.toString(),
  name: item.name,
  description: item.description,
  category: item.category,
  singlePrice: item.singlePrice ? parseFloat(item.singlePrice) : null,
  priceSmall: item.priceSmall ? parseFloat(item.priceSmall) : null,
  priceMedium: item.priceMedium ? parseFloat(item.priceMedium) : null,
  priceLarge: item.priceLarge ? parseFloat(item.priceLarge) : null,
  priceXLarge: item.priceXLarge ? parseFloat(item.priceXLarge) : null,
  isSpecial: Boolean(item.isSpecial), // Ensure boolean conversion
  calories: item.calories,
  protein: item.protein,
  carbs: item.carbs,
  fat: item.fat,
  fiber: item.fiber,
  sodium: item.sodium,
  allergens: item.allergens,
  ingredients: item.ingredients
}));
```

### Step 5: Fix Menu Category Component Integration
```typescript
// Ensure MenuCategory receives properly filtered items:
<MenuCategory
  title={getCategoryInfo(activeCategory).name}
  description={getCategoryDescription(activeCategory)}
  items={getItemsByCategory(activeCategory)} // This should now return actual items
  icon={getCategoryInfo(activeCategory).icon}
/>
```

## IMPLEMENTATION ORDER

1. **First**: Fix data transformation to ensure consistent data structure
2. **Second**: Update activeCategory to use actual API categories  
3. **Third**: Fix specialDeals filtering logic
4. **Fourth**: Update categories navigation to be dynamic
5. **Fifth**: Test that all sections now display properly

## EXPECTED RESULT

After implementing these fixes:
- Categories navigation will show actual API categories with correct item counts
- Special offers section will display based on actual menu items
- MenuCategory component will receive and display items properly
- No more empty arrays causing blank sections