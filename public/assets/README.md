# Polaris Assets Documentation

## Logo Design
The Polaris logo is based on the CSS class: `w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg`

- **Colors**: Gradient from primary-500 (#3B82F6) to accent-500 (#8B5CF6)
- **Typography**: Bold white "P" letter
- **Shape**: Square with sharp corners

## Directory Structure

```
public/assets/
├── logos/           # Logo variations
├── icons/           # Favicons and app icons
└── images/          # General images (future use)
```

## Logo Variations

### Main Logo
- `polaris-logo.svg` - Primary logo (32x32)
- `polaris-logo-64.png` - PNG version (64x64)
- `polaris-logo-128.png` - PNG version (128x128)

### Layout Variations
- `polaris-logo-horizontal.svg` - Logo with brand name (200x40)
- `polaris-logo-horizontal.png` - PNG version (400x80)
- `polaris-logo-vertical.svg` - Vertical layout (80x80)
- `polaris-logo-vertical.png` - PNG version (160x160)

### Theme Variations
- `polaris-logo-dark.svg` - Darker colors for light backgrounds
- `polaris-logo-light.svg` - Lighter colors for dark backgrounds

## Favicons & App Icons

### Web Favicons
- `favicon.ico` - Traditional favicon (32x32)
- `favicon-16x16.png` - Small favicon (16x16)
- `favicon-32x32.png` - Standard favicon (32x32)

### Mobile & App Icons
- `apple-touch-icon.png` - Apple touch icon (180x180)

## Usage Guidelines

### When to use each variation:
- **Main logo**: Navigation, buttons, small spaces
- **Horizontal**: Headers, business cards, presentations
- **Vertical**: Square layouts, social media profiles
- **Dark variant**: Use on light backgrounds (#FFFFFF, #F9FAFB)
- **Light variant**: Use on dark backgrounds (#111827, #1F2937)

### Color Codes
- **Primary**: #3B82F6 (Blue)
- **Accent**: #8B5CF6 (Purple)
- **Dark Primary**: #1E40AF
- **Dark Accent**: #6B21A8
- **Light Primary**: #60A5FA
- **Light Accent**: #A78BFA

## Implementation

The favicons are automatically loaded via `/src/pages/_document.tsx` and will appear in:
- Browser tabs
- Bookmarks
- Mobile home screen
- App shortcuts

## File Formats

- **SVG**: Vector format, scalable, small file size
- **PNG**: Raster format, better browser support
- **ICO**: Traditional favicon format

## Last Updated
Generated on: $(date) 