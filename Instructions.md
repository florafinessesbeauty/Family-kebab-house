# Menu Page Performance Optimization Plan

## Performance Issues Identified

### Critical Problems Causing Layout Thrashing:

1. **Excessive CSS Animations (Lines 276-349 in menu.tsx)**
   - Multiple `animate-spin`, `animate-bounce`, `animate-pulse` running simultaneously
   - 6+ animated elements per special deal card (rotating rings, floating sparkles)
   - Constant repaints from continuous animations

2. **Unthrottled Scroll Handler (Line 30 in floating-ai-button.tsx)**
   - Raw `scroll` event listener firing on every scroll pixel
   - No debouncing or throttling mechanism
   - Triggers state changes causing React re-renders

3. **Heavy Component Re-renders**
   - Menu component recalculates `currentCategoryItems` on every render (Line 36)
   - `specialDeals` filter runs on every render (Line 189)
   - No memoization for expensive operations

4. **Continuous Animation Overhead**
   - Multiple `animate-pulse` classes running indefinitely
   - Complex CSS gradients with blur effects (Line 305)
   - Transform animations causing layout shifts

## Step-by-Step Optimization Plan

### Phase 1: Throttle Event Handlers (High Priority)

#### 1.1 Fix Scroll Handler in FloatingAIButton
**File:** `client/src/components/floating-ai-button.tsx`
**Lines:** 24-32

```typescript
// Replace unthrottled scroll with throttled version
useEffect(() => {
  let ticking = false;
  
  const handleScroll = () => {
    if (!ticking && !isDismissed) {
      requestAnimationFrame(() => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [isDismissed]);
```

#### 1.2 Add Intersection Observer for Animation Control
**File:** `client/src/hooks/use-intersection-observer.tsx` (New)

```typescript
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, isVisible] as const;
}
```

### Phase 2: Optimize React Components with Memoization

#### 2.1 Memoize MenuCategory Component
**File:** `client/src/components/menu-category.tsx`
**Action:** Wrap in React.memo

```typescript
import React from 'react';

const MenuCategory = React.memo(({
  title,
  description,
  items,
  icon
}: Readonly<MenuCategoryProps>) => {
  // Component implementation
});

export default MenuCategory;
```

#### 2.2 Memoize Expensive Calculations in Menu
**File:** `client/src/pages/menu.tsx`
**Lines:** 36, 189

```typescript
import { useMemo } from 'react';

// Replace direct calculations with memoized versions
const currentCategoryItems = useMemo(
  () => menuData.filter(item => item.category === activeCategory),
  [menuData, activeCategory]
);

const specialDeals = useMemo(
  () => menuData.filter(item => item.isSpecial),
  [menuData]
);
```

#### 2.3 Create Memoized SpecialDealCard Component
**File:** `client/src/components/special-deal-card.tsx` (New)

```typescript
import React from 'react';

interface SpecialDealCardProps {
  deal: MenuItemData;
  isVisible: boolean;
}

const SpecialDealCard = React.memo(({ deal, isVisible }: SpecialDealCardProps) => {
  const isKebabFeast = deal.name === "Kebab Feast" || deal.name === "🎉 Kebab Feast";
  const isFamilyDeal = deal.name.includes("Family Deal");
  const isChickenCombo = deal.name.includes("3 Pcs Chicken + 4 Spicy Wings");

  return (
    <div 
      className={`relative rounded-2xl p-6 text-white text-center transition-all duration-500 cursor-pointer group ${
        isKebabFeast 
          ? `bg-gradient-to-br from-yellow-400 via-amber-500 via-orange-600 to-red-700 shadow-2xl transform scale-110 border-8 border-yellow-300 hover:scale-115 hover:shadow-3xl ${isVisible ? 'animate-pulse' : ''}` 
          : isFamilyDeal
          ? "bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 hover:scale-105 shadow-xl border-2 border-pink-300"
          : isChickenCombo
          ? "bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 hover:scale-105 shadow-xl border-2 border-orange-300"
          : "bg-gradient-to-br from-accent to-orange-600 hover:scale-105"
      }`}
    >
      {/* Conditional animations only when visible */}
      {isKebabFeast && isVisible && (
        // Animation elements
      )}
      {/* Rest of component */}
    </div>
  );
});
```

### Phase 3: Optimize CSS Animations

#### 3.1 Add CSS Will-Change and Animation Pausing
**File:** `client/src/index.css`

```css
/* Add performance optimizations */
.special-deal-card {
  will-change: transform;
  contain: layout style paint;
}

.special-deal-card:not(.visible) .animate-pulse,
.special-deal-card:not(.visible) .animate-bounce,
.special-deal-card:not(.visible) .animate-spin {
  animation-play-state: paused;
}

/* Reduce animation complexity */
.animate-pulse-optimized {
  animation: pulse-optimized 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse-optimized {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

/* Use transform3d for GPU acceleration */
.animate-bounce-gpu {
  animation: bounce-gpu 1s infinite;
}

@keyframes bounce-gpu {
  0%, 100% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -10px, 0);
  }
}
```

#### 3.2 Implement Animation Control Hook
**File:** `client/src/hooks/use-animation-control.tsx` (New)

```typescript
import { useIntersectionObserver } from './use-intersection-observer';
import { useEffect } from 'react';

export function useAnimationControl() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      if (isVisible) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    }
  }, [isVisible]);

  return [ref, isVisible] as const;
}
```

### Phase 4: List Virtualization (Optional for Large Menus)

#### 4.1 Implement Virtual Scrolling for Long Categories
**File:** `client/src/components/virtualized-menu-list.tsx` (New)

```typescript
import { FixedSizeList as List } from 'react-window';
import { MenuItemData } from '@/data/menu-data';

interface VirtualizedMenuListProps {
  items: MenuItemData[];
  height: number;
  itemHeight: number;
}

const VirtualizedMenuList = ({ items, height, itemHeight }: VirtualizedMenuListProps) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <MenuItemCard item={items[index]} />
    </div>
  );

  return (
    <List
      height={height}
      itemCount={items.length}
      itemSize={itemHeight}
      overscanCount={5}
    >
      {Row}
    </List>
  );
};
```

### Phase 5: Debounce State Updates

#### 5.1 Add Debounced Category Switching
**File:** `client/src/hooks/use-debounced-state.tsx` (New)

```typescript
import { useState, useEffect } from 'react';

export function useDebouncedState<T>(initialValue: T, delay: number) {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return [debouncedValue, setValue] as const;
}
```

## Implementation Priority Order

### Immediate (Critical):
1. Fix unthrottled scroll handler in FloatingAIButton
2. Add React.memo to MenuCategory component
3. Memoize expensive calculations in Menu component

### High Priority:
1. Implement IntersectionObserver for animation control
2. Create optimized CSS animations with will-change
3. Add conditional animation rendering

### Medium Priority:
1. Create memoized SpecialDealCard component
2. Implement debounced state updates
3. Add GPU-accelerated animations

### Optional (for very large menus):
1. Implement virtualization for long lists
2. Add progressive loading for menu items

## Performance Metrics to Track

- **First Contentful Paint (FCP)**: Target < 1.5s
- **Cumulative Layout Shift (CLS)**: Target < 0.1
- **Frame Rate**: Maintain 60fps during scroll
- **Memory Usage**: Monitor for memory leaks from animations
- **JavaScript Execution Time**: Reduce scroll handler overhead

## Testing Strategy

1. Use Chrome DevTools Performance tab to profile before/after
2. Test on low-end devices with CPU throttling
3. Monitor layout thrashing in Rendering tab
4. Check animation performance with FPS meter
5. Test scroll responsiveness on mobile devices

## Expected Performance Improvements

- **50-70% reduction** in scroll jank
- **40-60% reduction** in JavaScript execution time during scroll
- **30-50% reduction** in layout thrashing
- **Improved battery life** on mobile devices
- **Better accessibility** for users with motion sensitivity

This optimization plan addresses the root causes of UI glitches and provides a systematic approach to improving the Menu page performance while maintaining the visual appeal of the special offers and animations.