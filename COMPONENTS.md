# Component Documentation

## Overview

The Photo Slider application uses a component-based architecture with React functional components and TypeScript. Each component is responsible for a single piece of functionality and can be composed together to build the complete application.

## Components

### ImageCard

**File**: `src/components/ImageCard.tsx`

Displays a single photo with hover animations and overlay text.

**Props**:

```typescript
interface ImageCardProps {
  item: ImageItem;
}
```

**Features**:

- Rounded corners (16px radius)
- Scale animation on hover (springs to 1.05x)
- Gradient overlay on hover (black to transparent)
- Text title fades in on hover
- Maintains aspect ratio
- Lazy loaded

**Usage**:

```tsx
<ImageCard item={imageItem} />
```

**Animations** (Framer Motion):

```typescript
whileHover={{ scale: 1.05 }}
transition={{ type: 'spring', stiffness: 300 }}
```

**Styling**:

- Container: `relative flex-shrink-0 w-40 md:w-48 lg:w-56 h-60 rounded-lg`
- Image: `object-cover w-full h-full`
- Gradient: `bg-gradient-to-t from-black via-transparent`

---

### SliderRow

**File**: `src/components/SliderRow.tsx`

Horizontal scrollable container with navigation arrows and drag support.

**Props**:

```typescript
interface SliderRowProps {
  items: ImageItem[];
}
```

**Features**:

- Horizontal scroll with hidden scrollbar
- Left/right arrow navigation buttons
- Mouse drag support (grab cursor)
- Touch/swipe support (native scroll)
- 300px scroll increment per arrow click
- Smooth scroll with `behavior: 'smooth'`

**Usage**:

```tsx
<SliderRow items={images} />
```

**Navigation**:

- Left arrow: Scrolls left 300px
- Right arrow: Scrolls right 300px
- Mouse drag: Click and drag to scroll
- Touch: Swipe to scroll

**Styling**:

- Container: `flex space-x-4 overflow-x-scroll scrollbar-hide`
- Buttons: `absolute left-0/right-0 top-1/2 transform -translate-y-1/2`
- Button bg: `bg-black bg-opacity-50 hover:bg-opacity-75`

**DOM Elements**:

- Ref: `containerRef` for scroll container
- State: `isDragging`, `startX`, `scrollLeft` for drag tracking

---

### UploadArea

**File**: `src/components/UploadArea.tsx`

Upload interface with drag & drop support.

**Props**:

```typescript
interface UploadAreaProps {
  onAdd: (item: ImageItem) => void;
}
```

**Features**:

- File input with multiple selection
- Drag & drop zone
- Accept only image files (`image/*`)
- FileReader API for base64 encoding
- Automatic ID generation
- Timestamp creation

**Usage**:

```tsx
<UploadArea onAdd={(item) => addImage(item)} />
```

**Event Handlers**:

- `handleFiles(files: FileList)`: Processes selected files
- `handleDrop(e)`: Handles drop events
- `handleDragOver(e)`: Enables drop zone
- `handleChange(e)`: Handles input change

**File Processing**:

1. Create FileReader for each file
2. Read file as DataURL (base64)
3. Extract filename as title
4. Generate unique ID
5. Add timestamp
6. Invoke callback

**Styling**:

- Container: `border-2 border-dashed border-gray-500 rounded-lg p-6`
- Text: `text-center text-gray-400`
- Hover: `hover:border-gray-300`

**Input Properties**:

- `type="file"`
- `accept="image/*"`
- `multiple`
- Hidden: `className="hidden"`

---

## Hooks

### useImageStore

**File**: `src/hooks/useImageStore.ts`

Custom hook for managing images with LocalStorage persistence.

**Returns**:

```typescript
{
  images: ImageItem[];
  addImage: (item: ImageItem) => void;
  clear: () => void;
}
```

**Function Details**:

#### `useEffect()` - Initialization

Loads images from LocalStorage on mount:

```typescript
useEffect(() => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      setImages(JSON.parse(stored));
    } catch {
      setImages([]);
    }
  }
}, []);
```

#### `save()` - Persist to Storage

Updates state and saves to LocalStorage:

```typescript
const save = useCallback((items: ImageItem[]) => {
  setImages(items);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}, []);
```

#### `addImage()` - Add Single Image

Appends new image to array:

```typescript
const addImage = useCallback(
  (item: ImageItem) => {
    save([...images, item]);
  },
  [images, save],
);
```

#### `clear()` - Clear All Images

Removes all images:

```typescript
const clear = useCallback(() => {
  save([]);
}, [save]);
```

**Storage Key**: `slider_images`

**Error Handling**: Catches JSON parse errors gracefully

---

## Main App Component

**File**: `src/App.tsx`

Main application component orchestrating all features.

**Layout**:

```tsx
<div className="min-h-screen bg-gray-900 text-white p-4">
  <header>Photo Slider</header>
  <UploadArea />
  {images.length > 0 && <SliderRow />}
  {images.length > 0 && <ClearButton />}
</div>
```

**State**:

- Uses `useImageStore` hook for image management
- Destructures: `{ images, addImage, clear }`

**Conditional Rendering**:

- Slider shown only when images exist
- Clear button shown only when images exist

**Styling**:

- Full height: `min-h-screen`
- Dark theme: `bg-gray-900 text-white`
- Padding: `p-4`

---

## Component Composition

```
App
├── UploadArea
├── SliderRow
│   ├── ImageCard (multiple)
│   ├── Left Arrow Button
│   └── Right Arrow Button
└── Clear Button
```

---

## Type Definitions

**File**: `src/types/index.ts`

```typescript
export interface ImageItem {
  id: string; // Unique identifier (timestamp + random)
  title: string; // Original filename
  imageUrl: string; // Base64 encoded data URL
  createdAt: number; // Unix timestamp (milliseconds)
}
```

---

## Common Patterns

### Error Handling

- FileReader uses try-catch for JSON parsing
- Graceful fallback to empty array on error

### React Hooks

- `useState`: Local component state
- `useRef`: DOM element references (SliderRow container)
- `useCallback`: Memoized callbacks to prevent re-renders
- `useEffect`: Side effects (initialization)

### TypeScript

- Strict mode enabled
- Type-only imports: `import type { ... }`
- Explicit event type annotations

### Performance

- Lazy image loading
- Component memoization where needed
- Callback memoization with `useCallback`
- No unnecessary re-renders

---

## Adding New Components

To add a new component:

1. **Create file** in `src/components/NewComponent.tsx`
2. **Define interface** for props
3. **Export as default** React.FC component
4. **Add TypeScript** types
5. **Create test file** in `__tests__/` folder
6. **Write unit tests** with React Testing Library
7. **Import and use** in App or other components

**Template**:

```typescript
import React from 'react';
import type { SomeType } from '../types';

interface NewComponentProps {
  prop: SomeType;
}

const NewComponent: React.FC<NewComponentProps> = ({ prop }) => {
  return <div>{prop}</div>;
};

export default NewComponent;
```

---

## Testing Components

Each component has test file in `__tests__/`:

```typescript
import { render } from '@testing-library/react';
import Component from '../Component';

describe('Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Component prop="value" />);
    expect(container.querySelector('...')).toBeInTheDocument();
  });
});
```

---

## Performance Tips

1. **Use React.memo** for heavy components
2. **Memoize callbacks** with `useCallback`
3. **Lazy load images** with `loading="lazy"`
4. **Use CSS-in-JS** sparingly (Tailwind preferred)
5. **Split large components** into smaller pieces
6. **Avoid inline functions** in render

---

## Debugging

Enable React DevTools:

1. Install React DevTools browser extension
2. Open DevTools > Components tab
3. Inspect component tree
4. Check props and state

---

**Last Updated**: February 2026
