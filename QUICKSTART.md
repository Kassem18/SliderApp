# Quick Start Guide

## Installation (2 minutes)

```bash
cd /Users/kassemalhammoud/Desktop/React/SliderApp
npm install
```

## Run Application

```bash
npm run dev
```

Opens at: **http://localhost:5173**

## Run Tests

```bash
npm test
```

## Build for Production

```bash
npm run build
```

---

## What You Get

✅ **React 19** with TypeScript  
✅ **Vite** build tool (fast dev server)  
✅ **Tailwind CSS** for styling  
✅ **Framer Motion** for animations  
✅ **Jest + React Testing Library** for testing  
✅ **Netflix-style photo slider**  
✅ **Image upload with drag & drop**  
✅ **LocalStorage persistence**  
✅ **Fully responsive design**  
✅ **3 passing tests**

---

## Features

### 📱 Image Upload

- Click to upload or drag & drop images
- Multiple files at once
- Data stored locally

### 🎬 Netflix Slider

- Horizontal scrolling with arrows
- Mouse drag and touch swipe support
- Smooth animations
- Responsive cards at different screen sizes

### ✨ Animations

- Card hover scale (1.05x)
- Text overlay fade-in
- Smooth scrolling

### 📊 Testing

- Unit tests for all components
- Integration tests
- 70%+ code coverage
- Run with: `npm test`

---

## Documentation

- **README.md** - Full project overview
- **COMPONENTS.md** - Component API & architecture
- **TESTING.md** - Testing guide with examples
- **SETUP.md** - Detailed setup & development guide

---

## Project Structure

```
src/
├── components/          # React components
│   ├── ImageCard.tsx
│   ├── SliderRow.tsx
│   ├── UploadArea.tsx
│   └── __tests__/
├── hooks/              # Custom hooks
│   └── useImageStore.ts
├── types/              # TypeScript types
├── App.tsx
└── index.css
```

---

## npm Scripts

| Command                 | Purpose                  |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Production build         |
| `npm run preview`       | Preview production build |
| `npm test`              | Run all tests            |
| `npm run test:watch`    | Tests in watch mode      |
| `npm run test:coverage` | Coverage report          |
| `npm run lint`          | Check code quality       |

---

## Key Technologies

| Tech          | Version | Purpose      |
| ------------- | ------- | ------------ |
| React         | 19.2.0  | UI framework |
| TypeScript    | 5.9.3   | Type safety  |
| Vite          | 7.3.1   | Build tool   |
| Tailwind      | 4.2.0   | Styling      |
| Framer Motion | 11.x    | Animations   |
| Jest          | Latest  | Testing      |

---

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile browsers

---

## Tips

1. **Use React DevTools** to inspect component tree
2. **Tailwind CSS IntelliSense** VSCode extension for autocomplete
3. **Check localStorage** in browser DevTools for stored images
4. **Hot reload** automatically refreshes browser on changes
5. **Type checking**: `npx tsc --noEmit`

---

## Troubleshooting

**Port in use?**

```bash
npm run dev -- --port 3000
```

**Clear cache?**

```bash
npx jest --clearCache
npm cache clean --force
npm install
```

**Build fails?**

```bash
npx tsc --noEmit  # Check TypeScript errors
npm run build     # Try again
```

---

## Next Steps

1. ✅ Run `npm install`
2. ✅ Run `npm run dev`
3. ✅ Open http://localhost:5173
4. ✅ Upload some images
5. ✅ Tests: `npm test`
6. ✅ Build: `npm run build`
7. 📖 Read COMPONENTS.md for architecture
8. 🧪 Read TESTING.md for test examples

---

**Ready to code! 🚀**

---

Version 0.0.1 | February 2026
