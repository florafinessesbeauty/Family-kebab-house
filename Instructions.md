# Category System Mismatch Analysis & Comprehensive Fix Plan

## CRITICAL MISMATCHES IDENTIFIED

### 1. **API Categories vs Static Categories**
**API Returns**: `burgers`, `drinks`, `kebabs`, `pizzas`, `sides`, `specials`
**Static categories array**: `kebabs`, `combination-kebabs`, `wraps`, `pizzas`, `burgers`, `fried-chicken`, `chicken-bargain-meals`, etc.
**categoryNames.ts keys**: `lunch-offers`, `burgers`, `fried-chicken`, `chicken-bargain`, `wings`, `nuggets`, etc.

### 2. **Key Naming Inconsistencies**
- API: `sides` vs categoryNames: `extras` 
- API: `specials` vs categoryNames: `kebab-specials`
- categoryNames: `chicken-bargain` vs menu-data: `chicken-bargain-meals`
- categoryNames: `wings` vs menu-data: `chicken-wings-strips`
- categoryNames: `kids` vs menu-data: `kids-meals`

### 3. **Current Implementation Issues**
- `menu.tsx` imports static `categories` from `menu-data.ts` but API returns different category names
- `activeCategory` defaults to "kebabs" but filters against API data with potentially different structure
- Navigation loops over static categories that don't match API categories
- `getItemsByCategory` filters `menuData` by category but category IDs are misaligned

## ROOT CAUSE
The system has THREE different category systems:
1. **Static categories array** in `menu-data.ts` (legacy static data)
2. **categoryNames object** in `categoryNames.ts` (display names)  
3. **API category values** (actual database categories)

These are not synchronized, causing zero matches in filtering.

## STEP-BY-STEP FIX PLAN

### Step 1: Audit and Align Category Systems
```typescript
// Create unified category mapping that aligns all three systems
const UNIFIED_CATEGORIES = {
  "burgers": { name: "Burgers", icon: "🍔" },
  "drinks": { name: "Drinks", icon: "🥤" },
  "kebabs": { name: "Kebabs", icon: "🥙" }, 
  "pizzas": { name: "Pizzas", icon: "🍕" },
  "sides": { name: "Sides & Extras", icon: "🍟" },
  "specials": { name: "Special Offers", icon: "⭐" }
};
```

### Step 2: Update menu.tsx to Use API-First Approach
```typescript
// Replace static categories import with dynamic approach
// Remove: import { categories } from "@/data/menu-data";

// Update initialization
const [activeCategory, setActiveCategory] = useState(""); // Start empty, set from API
const [availableCategories, setAvailableCategories] = useState<string[]>([]);

// In fetchMenuData useEffect:
const apiCategories = [...new Set(transformedData.map(item => item.category))];
setAvailableCategories(apiCategories);
if (apiCategories.length > 0 && !activeCategory) {
  setActiveCategory(apiCategories[0]);
}
```

### Step 3: Update Navigation to Loop Over API Categories
```typescript
// Replace categories.map() with availableCategories.map()
{availableCategories.map((categoryId) => {
  const itemCount = getItemsByCategory(categoryId).length;
  const categoryInfo = UNIFIED_CATEGORIES[categoryId as keyof typeof UNIFIED_CATEGORIES] || {
    name: categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: "🍽️"
  };
  
  if (itemCount === 0) return null;
  
  return (
    <Button key={categoryId} onClick={() => setActiveCategory(categoryId)}>
      <span>{categoryInfo.icon}</span>
      {categoryInfo.name}
      <Badge>{itemCount}</Badge>
    </Button>
  );
})}
```

### Step 4: Fix getItemsByCategory and specialDeals
```typescript
// getItemsByCategory should already work since it filters menuData by category
// Just ensure proper debugging
const getItemsByCategory = (category: string) => {
  const items = menuData.filter(item => item.category === category);
  console.log(`Category "${category}" has ${items.length} items`);
  return items;
};

// Update specialDeals to match API structure
const specialDeals = menuData.filter(item => 
  item.isSpecial === true || 
  item.category === "specials" ||
  (item.singlePrice && parseFloat(item.singlePrice.toString()) < 8)
);
```

### Step 5: Update MenuCategory Component Call
```typescript
// Ensure proper category info is passed
const getCategoryInfo = (categoryId: string) => {
  return UNIFIED_CATEGORIES[categoryId as keyof typeof UNIFIED_CATEGORIES] || {
    name: categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: "🍽️"
  };
};

<MenuCategory
  title={getCategoryInfo(activeCategory).name}
  description={getCategoryDescription(activeCategory)}
  items={getItemsByCategory(activeCategory)}
  icon={getCategoryInfo(activeCategory).icon}
/>
```

### Step 6: Remove/Update categoryNames.ts (Optional)
```typescript
// Either update categoryNames.ts to match API categories exactly:
export const categoryNames = {
  "burgers": "Burgers",
  "drinks": "Drinks", 
  "kebabs": "Kebabs",
  "pizzas": "Pizzas",
  "sides": "Sides & Extras",
  "specials": "Special Offers"
};

// Or integrate it into the unified system above
```

## IMPLEMENTATION ORDER

1. **First**: Create UNIFIED_CATEGORIES mapping in menu.tsx
2. **Second**: Update state management (availableCategories, dynamic activeCategory)
3. **Third**: Update fetchMenuData to set categories from API response
4. **Fourth**: Replace static categories loop with availableCategories loop
5. **Fifth**: Update getCategoryInfo to use unified mapping
6. **Sixth**: Test that navigation shows all API categories with correct counts
7. **Seventh**: Verify clicking categories populates MenuCategory with items
8. **Eighth**: Confirm specialDeals section displays flagged items

## EXPECTED RESULTS

After implementation:
- Navigation will show exactly the categories returned by API: burgers, drinks, kebabs, pizzas, sides, specials
- Each category button will show correct item count (1-2 items each based on current API)
- Clicking category buttons will filter and display items in that category
- Special offers section will show items where isSpecial=true or category="specials"
- No more zero-match filtering due to category ID misalignment

## DEBUGGING VERIFICATION

Add temporary logging to verify:
```typescript
console.log('API Categories:', [...new Set(transformedData.map(item => item.category))]);
console.log('Available Categories State:', availableCategories);
console.log('Active Category:', activeCategory);
console.log('Items for Active Category:', getItemsByCategory(activeCategory));
console.log('Special Deals Found:', specialDeals.length);
```