# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React Application (App.tsx)             │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                   │
│       ┌───────────────────┼───────────────────┐              │
│       │                   │                   │              │
│  ┌────▼────────┐     ┌───▼──────────┐   ┌───▼──────────┐   │
│  │ UploadArea  │     │  SliderRow   │   │ Clear Button │   │
│  │             │     │              │   │              │   │
│  │ - File Drop │     │ - Arrow Btns │   │ - onClick    │   │
│  │ - Drag Drop │     │ - Drag Scroll│   │   listener   │   │
│  │ - onChange  │     │ - Touch Swipe│   └──────────────┘   │
│  └────┬────────┘     │ - Smooth anim│                       │
│       │              └───┬──────────┘                        │
│       │                  │                                   │
│       │              ┌───▼───────────────────┐              │
│       │              │   ImageCard (Map)     │              │
│       │              │                       │              │
│       │              │ - Scale Animation     │              │
│       │              │ - Overlay Gradient    │              │
│       │              │ - Text Fade In        │              │
│       │              │ - Lazy Loading        │              │
│       │              └───────────────────────┘              │
│       │                                                      │
│       └──────────────┬───────────────────────┐              │
│                      │ State Management      │              │
│              ┌───────▼────────────────┐     │              │
│              │  useImageStore Hook    │     │              │
│              │                        │     │              │
│              │ - useState (images)    │     │              │
│              │ - useCallback (add)    │     │              │
│              │ - useEffect (load)     │     │              │
│              │ - useCallback (clear)  │     │              │
│              └────────┬───────────────┘     │              │
│                       │                     │              │
│                       └─────────────────────┘              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          Local Data Storage (LocalStorage)           │   │
│  │                                                       │   │
│  │  Key: 'slider_images'                               │   │
│  │  Format: [ImageItem, ImageItem, ...]               │   │
│  │  Max Size: ~5-10 MB                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Image Upload Flow

```
User Action
    │
    ├─ File Input Click
    │     │
    │     ▼
    │  [File Selected]
    │     │
    │     ▼
    │  handleChange()
    │
    └─ OR Drag & Drop
          │
          ▼
       [Files Dropped]
          │
          ▼
       handleDrop()

          ↓

    ┌────────────────────┐
    │  handleFiles()     │
    │ (Loop each file)   │
    └────────────────────┘
          │
          ├─ Create FileReader
          │
          ├─ reader.readAsDataURL()
          │
          ├─ Extract filename
          │
          ├─ Generate unique ID
          │
          └─ Get timestamp
                │
                ▼
       onAdd(ImageItem)
                │
                ▼
       addImage(item)
                │
                ▼
       save([...images, item])
                │
    ┌──────────────┴─────────────┐
    │                            │
    ▼                            ▼
setImages()              localStorage.setItem()
    │                            │
    └──────────────┬─────────────┘
                   │
                   ▼
          React State Updated
                   │
                   ▼
          Component Re-render
                   │
                   ▼
          New ImageCard appears
          in SliderRow
```

### 2. Navigation Flow

```
User Action
    │
    ├─ Click Left Arrow
    │     │
    │     ▼
    │  scroll(-300)
    │
    ├─ Click Right Arrow
    │     │
    │     ▼
    │  scroll(300)
    │
    └─ Mouse Drag or Touch Swipe
          │
          ▼
       Native Scroll Event
          │
          ├─ handleMouseDown
          ├─ handleMouseMove
          └─ handleMouseUp
                │
                ▼
          containerRef.current.scrollBy()
```

### 3. Hover Animation Flow

```
User Hovers over Card
    │
    ▼
ImageCard detects hover
    │
    ├─ Framer Motion: whileHover
    │     │
    │     ├─ Scale 1 → 1.05
    │     │
    │     ├─ Gradient Overlay
    │     │    opacity: 0 → 1
    │     │
    │     └─ Text Title
    │          opacity: 0 → 1
    │
    ▼
User sees:
• Larger image
• Shadow elevation
• Black gradient overlay
• Text title with fade
```

## Component Tree

```
App
├── Header
│   └── "Photo Slider"
│
├── UploadArea
│   ├── Input[type="file"]
│   └── Drop Zone
│
├── SliderRow (when images.length > 0)
│   ├── Left Arrow Button
│   │   └── onClick: scroll(-300)
│   │
│   ├── Container (with scrollbar-hide)
│   │   └── ImageCard[] (mapped)
│   │       ├── Image
│   │       ├── Gradient Overlay
│   │       └── Text Title
│   │
│   └── Right Arrow Button
│       └── onClick: scroll(300)
│
└── Clear Button (when images.length > 0)
    └── onClick: clear()
```

## State Management

```
App Component
│
├── State: images []
│   ├── Loaded from: localStorage (useEffect)
│   ├── Updated by: addImage(item)
│   └── Cleared by: clear()
│
└── Actions:
    ├── Add Image → addImage(item) → save() → localStorage
    ├── Clear All → clear() → save() → localStorage
    └── Load On Mount → useEffect → localStorage.getItem()
```

## Type System

```
ImageItem
├── id: string
│   ├── Format: ${timestamp}-${random}
│   └── Uniqueness: Guaranteed
│
├── title: string
│   ├── Source: file.name
│   └── Display: Hover text
│
├── imageUrl: string
│   ├── Format: data:image/...;base64,...
│   ├── Source: FileReader.readAsDataURL()
│   └── Size: variable (file dependent)
│
└── createdAt: number
    ├── Format: Unix timestamp (ms)
    └── Purpose: Sorting/tracking
```

## Event Flow

```
File Upload → UploadArea:handleChange
   ↓
UploadArea:handleFiles
   ├─ Loop through FileList
   └─ For each file:
      ├─ FileReader:readAsDataURL
      ├─ FileReader:onload
      └─ Call onAdd(ImageItem)
        └─ App:addImage(item)
          └─ useImageStore:addImage
            └─ save([...images, item])
              ├─ setImages(newArray)
              ├─ localStorage.setItem()
              └─ React Re-render
                └─ SliderRow Gets New Props
                  └─ ImageCard:map New Item
                    └─ New Card Appears
```

## LocalStorage Schema

```json
{
  "slider_images": [
    {
      "id": "1708603200000-a7f3b2c1",
      "title": "sunset.jpg",
      "imageUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
      "createdAt": 1708603200000
    },
    {
      "id": "1708603210000-b8g4c3d2",
      "title": "landscape.png",
      "imageUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhE...",
      "createdAt": 1708603210000
    }
  ]
}
```

## Responsive Breakpoints

```
Mobile (< 640px)
├─ Card Width: w-40 (160px)
├─ Behavior: Swipe scroll
└─ Visible Cards: 1-2

Tablet (640px - 1024px)
├─ Card Width: md:w-48 (192px)
├─ Behavior: Swipe + Arrow scroll
└─ Visible Cards: 2-3

Desktop (> 1024px)
├─ Card Width: lg:w-56 (224px)
├─ Behavior: Mouse drag + Arrow scroll
└─ Visible Cards: 3-5
```

## Animation Stack

```
Framer Motion
├── ImageCard Scale
│   ├─ whileHover: { scale: 1.05 }
│   └─ transition: { type: 'spring', stiffness: 300 }
│
├── Text Overlay Fade
│   ├─ initial: { opacity: 0 }
│   ├─ whileHover: { opacity: 1 }
│   └─ transition: { duration: 0.3 }
│
└── SliderRow Scroll
    └─ behavior: 'smooth' (CSS native)
```

## Performance Optimization

```
Rendering
├── React.FC (Functional Components)
├── useCallback (Memoized Callbacks)
├── Lazy Image Loading
│   └── loading="lazy" attribute
└── CSS-in-JS (Tailwind Classes)

Bundling
├── Vite Code Splitting
├── Tree Shaking
└── Production Minification

Network
├── CSS: 5.61 kB (gzip: 1.70 kB)
├── JS: 316 kB (gzip: 101 kB)
└── Images: User provided (base64)
```

## Testing Architecture

```
Test Suites
│
├── Component Tests
│   ├── ImageCard.test.tsx
│   │   └─ Rendering verification
│   │
│   ├── SliderRow.test.tsx
│   │   ├─ Image rendering
│   │   └─ Navigation buttons
│   │
│   └── UploadArea.test.tsx
│       ├─ File detection
│       ├─ Callback invocation
│       └─ FileReader mocking
│
└── Integration Tests
    └── App.test.tsx
        ├─ End-to-end upload
        ├─ LocalStorage persistence
        └─ Component interaction
```

## Configuration Hierarchy

```
Project Config
│
├── TypeScript Config
│   ├── tsconfig.json (root)
│   ├── tsconfig.app.json (app - ES2022, ESM)
│   └── tsconfig.jest.json (tests - CommonJS)
│
├── Build Config
│   └── vite.config.ts
│       └── React Plugin
│
├── Styling Config
│   ├── tailwind.config.js
│   │   └── Content scanning
│   └── postcss.config.cjs
│       ├── @tailwindcss/postcss
│       └── autoprefixer
│
├── Testing Config
│   └── jest.config.ts
│       ├── ts-jest transformer
│       ├── jsdom environment
│       └── setupTests.ts
│
└── Code Quality Config
    └── eslint.config.js
        └── TypeScript ESLint rules
```

## Deployment Architecture

```
Source Code
    │
    ▼
npm run build
    │
    ├─ TypeScript Compilation
    │   └─ tsc -b
    │
    └─ Vite Build
        ├─ Module bundling
        ├─ Code splitting
        ├─ Asset compression
        └─ CSS minification

    ▼
/dist Folder
    │
    ├─ index.html
    ├─ assets/
    │   ├─ index-*.css (optimized)
    │   └─ index-*.js (optimized)
    └─ (ready for deployment)
```

---

This architecture ensures:

- ✅ Clean separation of concerns
- ✅ Reusable components
- ✅ Predictable data flow
- ✅ Easy testing
- ✅ Scalable structure
- ✅ Performance optimization
- ✅ Type safety throughout

**Last Updated**: February 2026
