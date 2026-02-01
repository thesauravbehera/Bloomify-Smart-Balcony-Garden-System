# Bloomify Design System Implementation Guide

## Overview
This guide shows how to implement the new glassmorphism design system with dark green theme across your Bloomify application. The system maintains your dark theme while adding premium glass effects and smooth animations.

## Quick Start

### 1. Import the Design System
All CSS variables and utilities are automatically available in your components thanks to the global `designSystem.css` import in `App.tsx`.

### 2. Use Glass Components
Import components from `components/ui/GlassUI.tsx`:

```tsx
import {
  GlassCard,
  GlassButton,
  GlassSection,
  GlassGrid,
  GlassInput,
  GlassAlert,
} from './ui/GlassUI';
```

### 3. Build Your Page
Use the provided components to build pages with glassmorphism effects:

```tsx
export function MyPage() {
  return (
    <GlassSection className="py-20">
      <GlassGrid cols={3} gap="gap-6">
        <GlassCard variant="standard">
          <h3 className="text-white font-bold">My Card</h3>
        </GlassCard>
      </GlassGrid>
    </GlassSection>
  );
}
```

## Component Library Reference

### GlassCard
Base card component with glassmorphism effects.

**Props:**
- `variant`: 'subtle' | 'standard' | 'strong' | 'green' | 'ultra' (default: 'standard')
- `className`: Additional CSS classes
- `onClick`: Click handler
- `hover`: Whether to enable hover effects (default: true)
- `children`: Card content

**Usage:**
```tsx
<GlassCard variant="green" className="p-6">
  <h3 className="text-white font-bold">Premium Card</h3>
  <p className="text-gray-400">With glass effect and green tint</p>
</GlassCard>
```

**Variants Explained:**
- **subtle**: Minimal glass effect, mostly transparent
- **standard**: Balanced glass effect with borders
- **strong**: Thick glass with more opacity
- **green**: Green-tinted glass for premium features
- **ultra**: Maximum glass effect with strong blur

---

### GlassButton
Interactive button with multiple styles.

**Props:**
- `variant`: 'primary' | 'secondary' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `loading`: Show loading spinner (default: false)
- `disabled`: Disable button (default: false)
- `onClick`: Click handler
- `children`: Button content

**Usage:**
```tsx
<GlassButton variant="primary" size="lg" onClick={handleClick}>
  Start Growing
</GlassButton>

<GlassButton variant="secondary" loading={isLoading}>
  Processing...
</GlassButton>

<GlassButton variant="ghost" size="sm">
  Learn More
</GlassButton>
```

**Variants:**
- **primary**: Green gradient background (main action)
- **secondary**: Glass background (secondary action)
- **ghost**: Minimal background (tertiary action)

---

### GlassSection
Full-width section wrapper with optional title.

**Props:**
- `title`: Optional section title
- `subtitle`: Optional subtitle
- `variant`: 'default' | 'accent' | 'dark' (default: 'default')
- `children`: Section content
- `className`: Additional classes

**Usage:**
```tsx
<GlassSection
  title="Features"
  subtitle="Powerful tools for gardeners"
  variant="accent"
>
  {/* Content here */}
</GlassSection>
```

---

### GlassGrid
Responsive grid layout (1-4 columns).

**Props:**
- `cols`: 1 | 2 | 3 | 4 (default: 3)
- `gap`: Spacing class like 'gap-4', 'gap-6', 'gap-8'
- `children`: Grid items

**Usage:**
```tsx
<GlassGrid cols={3} gap="gap-6">
  <GlassCard>Item 1</GlassCard>
  <GlassCard>Item 2</GlassCard>
  <GlassCard>Item 3</GlassCard>
</GlassGrid>
```

**Responsive Behavior:**
- Mobile: Always 1 column
- Tablet (md): 2 columns
- Desktop (lg): Specified number of columns

---

### GlassInput
Text input with glass styling.

**Props:**
- `type`: Input type (default: 'text')
- `placeholder`: Placeholder text
- `value`: Input value
- `onChange`: Change handler
- `error`: Show error state
- `disabled`: Disable input
- `className`: Additional classes

**Usage:**
```tsx
<GlassInput
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!isValidEmail}
/>
```

---

### GlassAlert
Alert/notification component.

**Props:**
- `type`: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- `title`: Alert title
- `message`: Alert message
- `actionLabel`: Action button text
- `onAction`: Action button click handler
- `onClose`: Close button click handler

**Usage:**
```tsx
<GlassAlert
  type="warning"
  title="Watering Due"
  message="Your basil plant needs water in 2 hours"
  actionLabel="Water Now"
  onAction={() => handleWatering()}
/>
```

---

### GlassModal
Modal dialog with glass effect.

**Props:**
- `isOpen`: Whether modal is visible
- `title`: Modal title
- `children`: Modal content
- `onClose`: Close handler
- `actions`: Array of action buttons
- `closeOnBackdropClick`: Close when backdrop clicked (default: true)

**Usage:**
```tsx
<GlassModal
  isOpen={showModal}
  title="Add Plant"
  onClose={() => setShowModal(false)}
  actions={[
    { label: 'Cancel', onClick: () => setShowModal(false) },
    { label: 'Add', onClick: handleAddPlant, variant: 'primary' },
  ]}
>
  <GlassInput placeholder="Plant name" />
</GlassModal>
```

---

### GlassFeatureCard
Feature card with icon and badge.

**Props:**
- `icon`: Icon or emoji string
- `title`: Feature title
- `description`: Feature description
- `badge`: Badge text
- `onClick`: Click handler

**Usage:**
```tsx
<GlassFeatureCard
  icon="📸"
  title="Balcony Analysis"
  description="AI scans your space for perfect plants"
  badge="Smart"
/>
```

---

## Color System

### Primary Colors
```css
var(--color-primary-50): #f0fdf4    /* Lightest green */
var(--color-primary-500): #10b981   /* Main green */
var(--color-primary-600): #059669   /* Dark green */
var(--color-primary-900): #064e3b   /* Darkest green */
```

### Background Colors
```css
var(--bg-primary): #020617      /* Almost black */
var(--bg-secondary): #0f172a    /* Dark slate */
var(--bg-tertiary): #1e293b     /* Medium slate */
var(--bg-glass): rgba(255, 255, 255, 0.05)
```

### Text Colors
```css
var(--text-primary): #ffffff    /* Pure white */
var(--text-secondary): #d1d5db  /* Light gray (80%) */
var(--text-tertiary): #9ca3af   /* Medium gray (60%) */
var(--text-quaternary): #6b7280  /* Dark gray (40%) */
```

## CSS Classes & Utilities

### Glass Effect Classes
```css
.glass-card        /* Base card with subtle glass */
.glass-subtle      /* Minimal glass effect */
.glass-standard    /* Balanced glass effect */
.glass-strong      /* Thick glass effect */
.glass-green       /* Green-tinted glass */
.glass-ultra       /* Maximum glass effect */
```

### Button Classes
```css
.btn-primary       /* Green gradient button */
.btn-secondary     /* Glass background button */
.btn-ghost         /* Minimal background button */
```

### Component Classes
```css
.card-container    /* Card with structure */
.input-glass       /* Glass input styling */
.nav-glass         /* Glass navigation bar */
.nav-item          /* Navigation item with effects */
```

### Utility Classes
```css
.text-gradient          /* Gradient text */
.border-glass          /* Glass-effect border */
.shadow-glass          /* Glass shadow */
.blur-glass            /* Backdrop blur */
.focus-glass           /* Focus state for inputs */
```

## Animation System

### Built-in Animations
```css
@keyframes fadeInUp      /* Fade in from bottom */
@keyframes fadeInDown    /* Fade in from top */
@keyframes slideInRight  /* Slide in from left */
@keyframes glowPulse     /* Pulsing glow effect */
@keyframes shimmer       /* Shimmer/loading effect */
```

### Using Animations in Components
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

## Implementation Examples

### Example 1: Card with Chart
```tsx
<GlassCard variant="standard" className="p-6">
  <h3 className="text-lg font-bold text-white mb-6">Growth Trends</h3>
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <Line type="monotone" dataKey="health" stroke="#10b981" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
</GlassCard>
```

### Example 2: Feature Grid
```tsx
<GlassSection title="Features" variant="accent">
  <GlassGrid cols={3} gap="gap-6">
    {features.map((feature) => (
      <GlassFeatureCard
        key={feature.id}
        icon={feature.icon}
        title={feature.title}
        description={feature.description}
        badge={feature.badge}
      />
    ))}
  </GlassGrid>
</GlassSection>
```

### Example 3: Form with Validation
```tsx
const [formData, setFormData] = useState({ email: '', name: '' });
const [errors, setErrors] = useState({});

<GlassCard variant="green" className="p-8">
  <h3 className="text-white font-bold mb-6">Create Account</h3>
  
  <GlassInput
    placeholder="Your name"
    value={formData.name}
    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    error={errors.name}
  />
  
  <GlassInput
    type="email"
    placeholder="your@email.com"
    value={formData.email}
    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    error={errors.email}
  />
  
  <GlassButton variant="primary" className="w-full mt-6" onClick={handleSubmit}>
    Create Account
  </GlassButton>
</GlassCard>
```

### Example 4: Tabbed Interface
```tsx
const [activeTab, setActiveTab] = useState('overview');

<GlassTabs
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'plants', label: 'My Plants' },
    { id: 'settings', label: 'Settings' },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
>
  {activeTab === 'overview' && <OverviewContent />}
  {activeTab === 'plants' && <PlantsContent />}
  {activeTab === 'settings' && <SettingsContent />}
</GlassTabs>
```

## Responsive Design

### Mobile-First Approach
Always design for mobile first, then add tablet and desktop breakpoints:

```tsx
<GlassGrid cols={1} gap="gap-4"> {/* Mobile: 1 column */}
  {/* Automatically becomes 2 cols on md, 3 cols on lg */}
</GlassGrid>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Tailwind responsive classes */}
</div>
```

### Breakpoints
- **Mobile**: 0px - 639px (default)
- **md**: 640px - 1023px
- **lg**: 1024px+

## Accessibility

### Focus States
All interactive elements have visible focus states:
```css
/* Automatically applied to buttons, inputs, links */
:focus-visible {
  outline: 2px solid #10b981;
  outline-offset: 2px;
}
```

### Reduced Motion
Animations are disabled for users with `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Color Contrast
All text meets WCAG AA contrast requirements:
- White on dark backgrounds (4.5:1 minimum)
- Green accents properly contrasted

## Performance Tips

1. **Lazy Load Components**: Use `React.lazy()` for heavy pages
2. **Memoize Components**: Wrap expensive components with `React.memo()`
3. **Use LocalStorage**: Cache user preferences
4. **Image Optimization**: Use Cloudinary for image delivery
5. **Code Splitting**: Split pages into separate chunks

## Migration Checklist

When converting existing components to use the new design system:

- [ ] Replace hard-coded colors with CSS variables
- [ ] Swap card divs for `<GlassCard>` components
- [ ] Replace buttons with `<GlassButton>` variants
- [ ] Wrap input fields in `<GlassInput>` components
- [ ] Update sections with `<GlassSection>`
- [ ] Add animations using `motion` library
- [ ] Test responsive design on mobile/tablet
- [ ] Check accessibility (keyboard nav, contrast)
- [ ] Update colors to use green accent system
- [ ] Add loading states where appropriate
- [ ] Test on different browsers
- [ ] Verify dark mode support

## File Reference

- **CSS System**: `src/styles/designSystem.css` (550+ lines)
- **Component Library**: `src/components/ui/GlassUI.tsx` (450+ lines)
- **Example Components**:
  - Navigation: `src/components/EnhancedNavigation.tsx`
  - Dashboard: `src/components/EnhancedDashboard.tsx`
  - Landing Sections: `src/components/EnhancedSections.tsx`

## Common Patterns

### Loading State
```tsx
const [loading, setLoading] = useState(false);

<GlassButton loading={loading} onClick={handleAction}>
  {loading ? 'Processing...' : 'Submit'}
</GlassButton>
```

### Error Handling
```tsx
<GlassAlert type="error" title="Error" message={errorMessage} />
```

### Success Notification
```tsx
<GlassAlert type="success" title="Success" message="Operation completed!" />
```

### Confirmation Dialog
```tsx
<GlassModal
  isOpen={showConfirm}
  title="Are you sure?"
  onClose={() => setShowConfirm(false)}
  actions={[
    { label: 'Cancel', onClick: () => setShowConfirm(false) },
    { label: 'Confirm', onClick: handleConfirm, variant: 'primary' },
  ]}
>
  <p className="text-gray-300">This action cannot be undone.</p>
</GlassModal>
```

## Troubleshooting

### Colors not applying
- Ensure `designSystem.css` is imported in `App.tsx`
- Check browser DevTools to verify CSS variables are loaded

### Components not rendering
- Import from `./ui/GlassUI` not from elsewhere
- Ensure all required props are provided
- Check console for TypeScript errors

### Animations stuttering
- Reduce the number of simultaneous animations
- Use `will-change` CSS property sparingly
- Profile with DevTools Performance tab

### Mobile layout broken
- Check if columns are overflowing
- Ensure `GlassGrid cols` adapts to screen size
- Use mobile-first responsive classes

## Support & Questions

Refer to:
1. Component examples in `EnhancedSections.tsx`
2. Implementation guide in `EnhancedDashboard.tsx`
3. Navigation example in `EnhancedNavigation.tsx`
4. CSS documentation in `designSystem.css` comments

---

**Version**: 1.0  
**Last Updated**: 2024  
**Framework**: React 18.3.1 + TypeScript 5.9.3  
**Styling**: Tailwind CSS 4.1.18  
**Animations**: Motion React  
