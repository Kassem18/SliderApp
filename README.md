# Slider App

A modern, responsive image slider web application built with React, TypeScript, Vite, and Tailwind CSS. The interface is fully centered with pink accents in light mode and a dark theme by default. Users can upload images dynamically, and they automatically appear in a scrollable slider with smooth animations and responsive design.

## Features

### Modern UI/UX

- Pink-accent modern design with glassmorphism panels
- Dark mode default
- Gradient buttons, soft pink glow shadows, blurred backgrounds
- Glassy upload panel and card shadows

### Image Upload

- Upload multiple photos with file input
- Drag & drop image upload support
- Images stored locally using LocalStorage
- Newly uploaded images instantly appear in slider

### Slider

- Horizontal scrolling with smooth animations
- Mouse drag support for desktop
- Mouse scroll/wheel support
- Touch swipe support for mobile
- Hidden scrollbars for clean UI

### Card Design

- Rounded corners with 16px radius
- Scale-up animation on hover (1.05x)
- Shadow elevation on hover
- Overlay gradient on hover
- Text title fades in on hover
- Maintains image aspect ratio
- Lazy loading for performance

### Responsive Design

- **Mobile**: Swipe-first, snap scrolling, full responsiveness
- **Tablet**: Reduced card width for visibility
- **Desktop**: Multiple cards visible (w-40, md:w-48, lg:w-56)

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.2.0
- **Animations**: Framer Motion 11.x
- **State Management**: React Hooks
- **Testing**: Jest + React Testing Library
- **Dev Tools**: ESLint, PostCSS, Autoprefixer

## Project Structure

```
src/
├── components/
│   ├── ImageCard.tsx              # Individual photo card
│   ├── SliderRow.tsx              # Main slider container
│   ├── UploadArea.tsx             # Upload interface
│   ├── NavigationArrows.tsx       # Left/right navigation buttons
│   └── __tests__/                 # Component tests
├── hooks/
│   └── useImageStore.ts           # LocalStorage hook
├── types/
│   └── index.ts                   # TypeScript definitions
├── pages/
│   └── HomePage.tsx               # Main application page
├── utils/
│   └── generateId.ts              # helpers/utilities
├── __tests__/
│   └── App.test.tsx               # Integration tests
├── App.tsx                        # Main app
├── main.tsx                       # Entry point
└── index.css                      # Global styles
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

The app opens at `http://localhost:5173`

## Usage

### Upload Images

1. Click the upload area or drag & drop images
2. Support for multiple files at once
3. Images appear instantly in the slider

### Navigate Slider

- **Desktop**: Drag with mouse or use mouse scroll wheel
- **Mobile**: Swipe left/right

### Clear Gallery

- Click **"Clear All"** to remove all images
- Deletes from UI and LocalStorage

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# With coverage report
npm test -- --coverage
```

## Data Storage

Images stored in browser LocalStorage:

- **Key**: `slider_images`
- **Format**: JSON array of ImageItem objects
- **Limit**: ~5-10 MB per domain
- **Persistence**: Across browser sessions

## Customization

### Tailwind Classes

- Background: `bg-gray-900`
- Responsive widths: `w-40 md:w-48 lg:w-56`
- Spacing: `p-4`, `space-x-4`

### Animation Config

- Hover scale: 1.05x
- Duration: 0.3s
- Type: Spring (stiffness 300)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers

## Troubleshooting

**Images not persisting?**

- Check LocalStorage is enabled
- Clear browser cache
- Check browser DevTools

**Tests failing?**

```bash
npx jest --clearCache
npm install
```

**Build errors?**

```bash
rm -rf dist node_modules
npm install
npm run build
```

## Types

```typescript
interface ImageItem {
  id: string;      // Unique ID
  title: string;  // File name
  imageUrl: string; // Base64 data URL
  createdAt: number; // Unix timestamp
}
```

## License

MIT - Free for personal and commercial use
