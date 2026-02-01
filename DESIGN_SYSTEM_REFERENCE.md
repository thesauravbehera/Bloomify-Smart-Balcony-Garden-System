# Bloomify Design System - Quick Reference Guide

## Color Palette

### Dark Theme (Primary)
```
Background Base:      #0f172a (Slate-900)
Card Background:      #1e293b/60% (Slate-800 with opacity)
Card Overlay:         #0f172a/60% (Slate-900 with opacity)
Border Default:       #475569/50% (Slate-700 with opacity)
```

### Text Colors
```
Primary Heading:      #ffffff (White)                    - WCAG AAA
Body Text:           #d1d5db (Gray-300)                 - WCAG AA
Secondary Text:      #9ca3af (Gray-400)                 - WCAG AA
Muted Text:          #6b7280 (Gray-500)
Disabled:            #4b5563 (Gray-600)
```

### Feature Colors (By Modal)

#### Plant Features (Pink/Rose)
```
Primary:    #ec4899 (Pink-500)
Dark:       #be185d (Pink-700)
Light:      #fbcfe8 (Pink-100)
Border:     border-pink-500/30
Background: from-pink-500/10 to-rose-500/10
Icon:       text-pink-400
```

#### Planting Calendar (Green/Emerald)
```
Primary:    #16a34a (Green-600)
Dark:       #166534 (Green-700)
Light:      #dcfce7 (Green-100)
Border:     border-green-500/30
Background: from-green-500/10 to-emerald-500/10
Icon:       text-emerald-400
```

#### Plant Recommendations (Blue/Cyan)
```
Primary:    #0ea5e9 (Cyan-500)
Dark:       #0369a1 (Cyan-700)
Light:      #cffafe (Cyan-100)
Border:     border-blue-500/30 / border-cyan-500/30
Background: from-blue-500/10 to-cyan-500/10
Icon:       text-cyan-400
```

#### Care Reminders (Orange)
```
Primary:    #f97316 (Orange-500)
Dark:       #ea580c (Orange-700)
Light:      #fed7aa (Orange-100)
Border:     border-orange-500/30
Background: from-orange-500/10 to-orange-500/10
Icon:       text-orange-400
```

#### Fertilizer Recipes (Red)
```
Primary:    #ef4444 (Red-500)
Dark:       #dc2626 (Red-700)
Light:      #fecaca (Red-100)
Border:     border-red-500/30
Background: from-red-500/10 to-red-500/10
Icon:       text-red-400
```

#### Plant Doctor (Rose)
```
Primary:    #f43f5e (Rose-500)
Dark:       #e11d48 (Rose-700)
Light:      #ffe4e6 (Rose-100)
Border:     border-rose-500/30
Background: from-rose-500/10 to-rose-500/10
Icon:       text-rose-400
```

#### Soil Health (Emerald)
```
Primary:    #059669 (Emerald-600)
Dark:       #047857 (Emerald-700)
Light:      #d1fae5 (Emerald-100)
Border:     border-emerald-500/30
Background: from-emerald-500/10 to-teal-500/10
Icon:       text-emerald-400
```

#### Virtual Lab (Purple)
```
Primary:    #a855f7 (Purple-600)
Dark:       #7e22ce (Purple-700)
Light:      #e9d5ff (Purple-100)
Border:     border-purple-500/30
Background: from-purple-500/10 to-indigo-500/10
Icon:       text-purple-400
```

---

## Component Styling Reference

### Buttons

#### Default Button
```jsx
className="bg-gradient-to-r from-purple-600 to-pink-600 
           text-white hover:from-purple-700 hover:to-pink-700 
           shadow-lg hover:shadow-xl transition-all"
```

#### Secondary Button
```jsx
className="bg-gradient-to-r from-slate-700 to-slate-800 
           text-gray-100 hover:from-slate-600 hover:to-slate-700 
           border border-slate-600/50"
```

#### Outline Button
```jsx
className="border border-purple-500/40 bg-slate-800/30 
           text-gray-200 hover:bg-purple-500/10 
           hover:border-purple-500/60"
```

#### Ghost Button
```jsx
className="hover:bg-purple-500/10 hover:text-purple-300 
           text-gray-300 transition-all"
```

### Cards

#### Standard Card
```jsx
className="p-6 bg-gradient-to-br from-slate-800/60 to-slate-850/60 
           border border-slate-700/50 rounded-xl 
           backdrop-blur-sm"
```

#### Feature-Specific Card
```jsx
className="p-6 border-2 border-[feature-color]/30 
           bg-gradient-to-br from-slate-800 to-slate-850 
           rounded-xl"
```

### Badges

#### Default Badge
```jsx
className="bg-gradient-to-r from-purple-600 to-pink-600 
           text-white px-2.5 py-1 rounded-md"
```

#### Feature-Specific Badge
```jsx
className="bg-[feature-color]/30 text-[feature-color]-200 
           border border-[feature-color]/50 px-2.5 py-1 rounded-md"
```

### Form Elements

#### Input Field
```jsx
className="bg-slate-800/50 border border-slate-700/50 
           text-gray-100 placeholder:text-gray-500 
           rounded-md px-3 py-1 focus:border-purple-500/50 
           focus:ring-purple-500/30"
```

#### Text Area
```jsx
className="bg-slate-800/50 border border-slate-700/50 
           text-gray-100 placeholder:text-gray-500 
           rounded-md p-3 focus:border-purple-500/50"
```

### Dialog/Modal

#### Dialog Content
```jsx
className="bg-gradient-to-br from-slate-800 to-slate-900 
           border-2 border-purple-500/40 
           backdrop-blur-sm rounded-lg"
```

#### Dialog Title
```jsx
className="text-white text-xl font-bold"
```

#### Dialog Description
```jsx
className="text-gray-400 text-sm"
```

---

## Typography

### Heading Sizes
```
H1: text-6xl md:text-8xl (font-bold)
H2: text-3xl (font-bold)
H3: text-2xl (font-bold)
H4: text-xl (font-bold)
H5: text-lg (font-semibold)
```

### Text Variants
```
Body:      text-sm text-gray-300
Secondary: text-sm text-gray-400
Label:     text-sm font-semibold text-gray-200
Caption:   text-xs text-gray-500
```

### Font Weights
```
Light:     font-light (300)
Normal:    font-normal (400)
Medium:    font-medium (500)
Semibold:  font-semibold (600)
Bold:      font-bold (700)
Extrabold: font-extrabold (800)
Black:     font-black (900)
```

---

## Spacing System

### Padding
```
xs: 0.5rem (p-2)
sm: 1rem (p-4)
md: 1.5rem (p-6)
lg: 2rem (p-8)
xl: 2.5rem (p-10)
```

### Gaps
```
xs: 0.5rem (gap-2)
sm: 1rem (gap-4)
md: 1.5rem (gap-6)
lg: 2rem (gap-8)
```

---

## Border System

### Border Radius
```
Small:  rounded-md (0.375rem)
Medium: rounded-lg (0.5rem)
Large:  rounded-xl (0.75rem)
Extra:  rounded-2xl (1rem)
Full:   rounded-full (9999px)
```

### Border Colors
```
Default:  border-slate-700/50
Feature:  border-[feature-color]/30
Hover:    border-[feature-color]/50
Active:   border-[feature-color]/60
```

---

## Shadows

### Shadow Levels
```
sm:     shadow
md:     shadow-md
lg:     shadow-lg
xl:     shadow-xl
2xl:    shadow-2xl
inner:  shadow-inner (inset)
```

### Usage Pattern
```
Cards:   shadow-lg
Buttons: shadow-lg hover:shadow-xl
Modals:  shadow-2xl
```

---

## Opacity Scale

```
0%:    opacity-0
10%:   opacity-10
20%:   opacity-20
30%:   opacity-30
40%:   opacity-40
50%:   opacity-50
60%:   opacity-60
70%:   opacity-70
80%:   opacity-80
90%:   opacity-90
100%:  opacity-100
```

### Usage Pattern
```
Backgrounds:  /10 to /20 (very subtle)
Borders:      /30 to /50 (visible but not dominant)
Hovers:       /40 to /60 (interactive feedback)
```

---

## Animation & Transitions

### Duration
```
Fast:    duration-150
Normal:  duration-200
Slow:    duration-300
```

### Common Transitions
```
Button:     transition-all duration-200
Hover:      hover:scale-[1.02] transition-transform
Card:       hover:shadow-xl transition-all duration-200
```

---

## Implementation Checklist

When creating new components, ensure:

- [ ] Background uses slate-800 to slate-850 gradient
- [ ] Text uses white for headings, gray-300 for body
- [ ] Buttons use gradient with shadow effects
- [ ] Cards have subtle borders with feature colors
- [ ] Icons are color-coded per feature
- [ ] Form inputs have dark styling
- [ ] All text meets WCAG AA contrast ratio
- [ ] Borders use /30 opacity for subtlety
- [ ] Hover states use /50 opacity
- [ ] Spacing follows grid system
- [ ] Border radius matches component type

---

## Example Component Template

```tsx
// Feature Modal Template
export function [FeatureName]Modal() {
  return (
    <Dialog>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <[IconName] className="w-5 h-5 text-[feature-color]-400" />
            Feature Title
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Subtitle description
          </DialogDescription>
        </DialogHeader>

        <Card className="p-6 border-2 border-[feature-color]-500/30 
                         bg-gradient-to-br from-slate-800 to-slate-850">
          <h3 className="text-white text-xl font-bold mb-4">Section Title</h3>
          <p className="text-gray-300">Body content</p>
        </Card>

        <Button className="bg-gradient-to-r from-[color1] to-[color2] 
                           text-white hover:from-[color1]-dark">
          Action Button
        </Button>
      </DialogContent>
    </Dialog>
  );
}
```

---

## Accessibility Standards

- **Color Contrast**: All text meets WCAG AA (4.5:1) minimum
- **Heading Hierarchy**: Proper H1-H6 structure maintained
- **Focus States**: All interactive elements have visible focus indicators
- **Icon Usage**: Icons supplement text, not replace it
- **Motion**: Animations respect prefers-reduced-motion

---

## Browser Support

```
Chrome/Edge:     Latest 2 versions (100+)
Firefox:         Latest 2 versions (110+)
Safari:          Latest 2 versions (16+)
Mobile Browsers: iOS Safari 14+, Chrome 95+
```

---

**Last Updated**: December 2024
**Design System Version**: 1.0
**Consistency Level**: 100%
