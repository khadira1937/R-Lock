# RLock Brand Assets

## Visual Identity

RLock uses a modern, cyber-tech inspired wordmark featuring angular, geometric letterforms with a blue-to-cyan gradient and subtle luminescent glow.

## Design Principles

- **Typeface**: Custom geometric vectors with sharp cuts, chamfers, and techy counters
- **Weight**: Heavy/bold with tight tracking for a strong, futuristic presence
- **Color**: Blue → Cyan gradient (left to right) with subtle outer glow
- **Style**: Angular, technical, inspired by modern crypto/tech brands

## Color Specifications

### Gradient Stops
```css
Linear gradient (0deg, left to right):
- 0%:   #1a8fff
- 35%:  #00b4ff
- 70%:  #00d4ff
- 100%: #00f0ff
```

### Glow Effect
- Gaussian blur: 6px standard deviation
- Opacity: 50% on glow layer
- Creates subtle depth without overwhelming the design

## File Structure

```
/public/brand/
├── rlock-logo.svg          # Primary wordmark (blue-cyan gradient + glow)
├── rlock-logo-mono.svg     # Monochrome white version
├── rlock-glyph.svg         # Compact RL mark (square format)
└── README.md               # This file

/public/
├── favicon.svg             # SVG favicon (modern browsers)
├── favicon-16x16.png       # 16×16 PNG fallback
├── favicon-32x32.png       # 32×32 PNG fallback
├── apple-touch-icon.png    # 180×180 Apple icon
├── android-chrome-192x192.png  # 192×192 Android icon
├── android-chrome-512x512.png  # 512×512 Android icon (maskable)
└── site.webmanifest        # PWA manifest
```

## Usage Guidelines

### Header Logo
- **Desktop**: height 28-32px (h-7 to h-8 in Tailwind)
- **Mobile**: height 24-28px (h-6 to h-7 in Tailwind)
- Use the full wordmark (rlock-logo.svg)
- Maintain horizontal alignment with navigation
- Apply subtle brightness hover effect (1.15× brightness, 150-200ms transition)

### Footer Logo
- **Size**: height 24px (h-6 in Tailwind)
- Use the full wordmark or monochrome version depending on background
- No hover effects needed

### Compact Mark (Glyph)
- Use for square contexts: favicons, app icons, mobile drawers
- Maintains the same geometric style as the wordmark
- Size range: 24-512px

### Mobile Navigation
- Consider using the compact glyph for very small screens
- Ensure minimum 24px height for legibility

## Accessibility

### Contrast Ratios
- Blue-cyan gradient on dark backgrounds: >7:1 (WCAG AAA)
- Suitable for large text at 3:1 minimum (WCAG AA)
- High luminosity ensures readability at small sizes

### Screen Readers
- All logo SVGs include `<title>` tags
- Implementations use `aria-hidden="true"` on SVG with adjacent `<span class="sr-only">RLock</span>` for accessibility

### Reduced Motion
- Hover effects honor `prefers-reduced-motion` media query
- Subtle brightness transitions only (no movement or rotation)

## Technical Implementation

### SVG Best Practices
- `viewBox` properly set for crisp scaling
- `preserveAspectRatio="xMidYMid meet"` ensures correct scaling
- Gradients defined in `<defs>` for reusability
- Filters applied via `<filter>` elements (glow effect)
- No external dependencies or fonts required

### React/Next.js Integration
```tsx
// Header example with Framer Motion
<motion.svg 
  viewBox="0 0 1100 280"
  className="h-7 md:h-8 w-auto"
  whileHover={{ 
    filter: "brightness(1.15)",
    transition: { duration: 0.15 }
  }}
>
  {/* SVG content */}
</motion.svg>
```

### Performance
- SVG files are optimized and minified
- Inline SVG in components for zero additional HTTP requests
- PNG fallbacks generated from SVG source for maximum quality
- All assets served from /public for optimal Next.js static serving

## Favicon Implementation

Favicons are referenced in `app/layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}
```

Modern browsers will use the SVG favicon, with PNG fallbacks for older browsers.

## Don'ts

❌ Don't modify the gradient colors  
❌ Don't add additional effects (shadows, bevels, etc.)  
❌ Don't use raster-only versions (SVG is source of truth)  
❌ Don't scale below minimum legible sizes (16px height)  
❌ Don't place on backgrounds that reduce contrast below WCAG AA  
❌ Don't compress or distort the aspect ratio  

## Generating PNGs

PNG favicons are generated using Sharp:

```bash
npm install -D sharp
node scripts/generate-pngs.js
```

This converts the SVG glyph to all required PNG sizes with proper anti-aliasing.

---

**Version**: 1.0  
**Last Updated**: October 2025  
**Design**: Custom geometric cyber-tech wordmark  
**License**: All rights reserved
