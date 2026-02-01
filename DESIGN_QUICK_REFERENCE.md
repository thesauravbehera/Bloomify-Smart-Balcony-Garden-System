# Bloomify Design System - Quick Reference

## 🎨 Color Palette

### Primary Green (Main Brand)
```
Light:   #f0fdf4 (50)
Base:    #10b981 (500) ⭐ Main color
Dark:    #059669 (600)
Darkest: #064e3b (900)
```

### Backgrounds
```
Primary:   #020617 (Almost black)
Secondary: #0f172a (Dark slate)
Tertiary:  #1e293b (Medium slate)
```

### Text
```
Primary:    #ffffff (100%)
Secondary:  #d1d5db (80%)
Tertiary:   #9ca3af (60%)
Quaternary: #6b7280 (40%)
```

## 📦 Component Quick Start

### Imports
```tsx
import {
  GlassCard, GlassButton, GlassSection, GlassGrid, GlassInput,
  GlassAlert, GlassModal, GlassTabs, GlassFeatureCard,
  GlassNavItem, GlassToolbar, GlassLoadingSkeleton
} from './ui/GlassUI';
import { motion } from 'motion/react';
```

## 🎯 Most Used Components

### 1. GlassCard
```tsx
<GlassCard variant="standard"> {/* subtle|standard|strong|green|ultra */}
  Content here
</GlassCard>
```

### 2. GlassButton
```tsx
<GlassButton variant="primary" size="md"> {/* sm|md|lg */}
  Click me
</GlassButton>
```

### 3. GlassSection
```tsx
<GlassSection title="Title" variant="accent"> {/* default|accent|dark */}
  Content here
</GlassSection>
```

### 4. GlassGrid
```tsx
<GlassGrid cols={3} gap="gap-6"> {/* 1|2|3|4 columns */}
  <GlassCard>Item 1</GlassCard>
  <GlassCard>Item 2</GlassCard>
</GlassGrid>
```

### 5. GlassInput
```tsx
<GlassInput 
  placeholder="Type here" 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error={hasError}
/>
```

## 🎬 Animations
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Animated content
</motion.div>
```

## 📱 Responsive Classes
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>
```

## 🚨 Alert Types
```tsx
<GlassAlert type="success|error|warning|info" />
```

## 🔘 Button Variants
- **primary**: Green gradient (main action)
- **secondary**: Glass (secondary action)
- **ghost**: Minimal (tertiary action)

## 💾 CSS Variables Available

All available in components automatically:

```css
var(--color-primary-500)     /* Green #10b981 */
var(--color-primary-600)     /* Dark green #059669 */
var(--bg-primary)            /* #020617 */
var(--bg-secondary)          /* #0f172a */
var(--text-primary)          /* #ffffff */
var(--text-secondary)        /* #d1d5db */
```

## ⚡ Common Patterns

### Form with Validation
```tsx
<GlassCard variant="green">
  <GlassInput placeholder="Email" error={!valid} />
  <GlassButton onClick={submit}>Submit</GlassButton>
</GlassCard>
```

### Loading State
```tsx
<GlassButton loading={isLoading}>
  {isLoading ? 'Loading...' : 'Click me'}
</GlassButton>
```

### Alert Notification
```tsx
<GlassAlert 
  type="warning"
  title="Watering Due"
  message="Your plant needs water"
  actionLabel="Water Now"
  onAction={handleWater}
/>
```

### Modal Dialog
```tsx
<GlassModal
  isOpen={show}
  title="Add Plant"
  onClose={() => setShow(false)}
  actions={[
    { label: 'Cancel', onClick: () => setShow(false) },
    { label: 'Add', onClick: add, variant: 'primary' }
  ]}
>
  <GlassInput placeholder="Plant name" />
</GlassModal>
```

### Tabbed Interface
```tsx
<GlassTabs
  tabs={[
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' }
  ]}
  activeTab={active}
  onChange={setActive}
>
  {active === 'tab1' && <Content1 />}
</GlassTabs>
```

### Feature Card Grid
```tsx
<GlassGrid cols={3}>
  {features.map(f => (
    <GlassFeatureCard
      key={f.id}
      icon={f.icon}
      title={f.title}
      description={f.desc}
      badge={f.badge}
    />
  ))}
</GlassGrid>
```

## 🎨 Custom Styling Tips

### Combine Tailwind with Glass Classes
```tsx
<GlassCard className="p-8 hover:shadow-lg">
  {/* Use standard Tailwind utilities */}
</GlassCard>
```

### Gradient Text
```tsx
<h1 className="text-gradient">
  Gradient Text
</h1>
```

### Glass Border
```tsx
<div className="border-glass">
  Content
</div>
```

## 📂 File Locations

| File | Purpose |
|------|---------|
| `src/styles/designSystem.css` | All CSS variables & styles (550 lines) |
| `src/components/ui/GlassUI.tsx` | React component library (450 lines) |
| `src/components/EnhancedNavigation.tsx` | Navigation example |
| `src/components/EnhancedDashboard.tsx` | Dashboard example |
| `src/components/EnhancedSections.tsx` | Landing sections example |
| `src/DESIGN_SYSTEM_GUIDE.md` | Full documentation |

## 🚀 Quick Workflow

1. **Plan** - Sketch component layout
2. **Import** - Get Glass* components
3. **Build** - Combine in sections
4. **Animate** - Add motion effects
5. **Test** - Check mobile/accessibility
6. **Deploy** - All CSS included!

## 📋 Accessibility Checklist

- ✅ All buttons have visible focus states
- ✅ Color contrast meets WCAG AA
- ✅ Animations respect prefers-reduced-motion
- ✅ Inputs have associated labels
- ✅ Modal has proper ARIA attributes

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Colors not showing | Check App.tsx has CSS import |
| Component missing | Verify import path is correct |
| Mobile layout broken | Check GlassGrid cols and responsive classes |
| Animations stuttering | Reduce simultaneous animations |
| Focus states not visible | Ensure focus-visible CSS loaded |

## 📚 Learn More

- Full Guide: `src/DESIGN_SYSTEM_GUIDE.md`
- CSS System: `src/styles/designSystem.css`
- Component Code: `src/components/ui/GlassUI.tsx`
- Examples: `EnhancedSections.tsx`, `EnhancedDashboard.tsx`

## 🎯 Key Principles

1. **Glass First** - Use glass effects for premium feel
2. **Dark Green** - Emerald-500 is primary accent
3. **Smooth** - Animations should feel natural
4. **Responsive** - Mobile-first design
5. **Accessible** - Works for everyone

---

**Pro Tip**: Start with `EnhancedSections.tsx` to see how to build a complete page with the new system!
