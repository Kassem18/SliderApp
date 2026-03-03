# Setup & Developer Guide

## Project Overview

Photo Slider is a Netflix-inspired web application built with React, TypeScript, and modern web technologies. It demonstrates best practices in component architecture, state management, testing, and responsive design.

## Environment Setup

### Prerequisites

Ensure you have installed:

- **Node.js** v18 or higher ([download](https://nodejs.org/))
- **npm** (comes with Node.js) or **Yarn**
- **Git** (for version control)
- **VS Code** (recommended editor)

### Verify Installation

```bash
node --version    # Should be v18+
npm --version     # Should be 9+
git --version     # Should be installed
```

## Initial Project Setup

### 1. Navigate to Project Directory

```bash
cd /Users/kassemalhammoud/Desktop/React/SliderApp
```

### 2. Install Dependencies

This installs all required packages specified in `package.json`:

```bash
npm install
```

This will install:

- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Jest & Testing Library
- ESLint

**Install Time**: 1-2 minutes

**Output Should Include**:

```
added XXX packages in XXs
```

### 3. Verify Installation

```bash
npm test -- --version  # Show Jest version
npx tsc --version      # Show TypeScript version
```

## Running the Application

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

**Output**:

```
VITE v7.3.1  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Access the app**: Open http://localhost:5173 in your browser

**Hot Reload**: Changes to files automatically refresh the browser

**Stop Server**: Press `Ctrl+C` in terminal

### Production Build

Create an optimized production build:

```bash
npm run build
```

**Output**:

```
dist/index.html                   0.46 kB
dist/assets/index.css             5.61 kB (gzip: 1.70 kB)
dist/assets/index.js            316.08 kB (gzip: 101.28 kB)
✓ built in 1.18s
```

**Output Location**: `./dist/` folder

**Serving Build**:

```bash
npm run preview
```

Opens at http://localhost:4173

### Linting

Check code quality:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint -- --fix
```

## Testing

### Run All Tests

```bash
npm test
```

Shows test results:

```
PASS  src/components/__tests__/SliderRow.test.tsx
PASS  src/components/__tests__/UploadArea.test.tsx
PASS  src/__tests__/App.test.tsx

Tests:       3 passed, 3 total
```

### Watch Mode

Re-run tests when files change:

```bash
npm run test:watch
```

**Controls**:

- Press `a` to run all tests
- Press `f` to run failed tests
- Press `q` to quit
- Press `p` to filter by filename

### Coverage Report

Generate coverage report:

```bash
npm test -- --coverage
```

**Output**:

```
File               | % Stmts | % Branch | % Funcs | % Lines
ImageCard.tsx      |     100 |      100 |     100 |     100
SliderRow.tsx      |      48 |        0 |      22 |      50
UploadArea.tsx     |      75 |       25 |      67 |      75
```

## Project Structure Explained

```
SliderApp/
├── src/
│   ├── components/              # React components
│   │   ├── ImageCard.tsx       # Photo card component
│   │   ├── SliderRow.tsx       # Scrollable slider
│   │   ├── UploadArea.tsx      # Upload interface
│   │   └── __tests__/          # Component tests
│   ├── hooks/                   # Custom React hooks
│   │   └── useImageStore.ts    # LocalStorage hook
│   ├── types/                   # TypeScript types
│   │   └── index.ts           # Type definitions
│   ├── pages/                   # Page components (future)
│   ├── utils/                   # Utility functions (future)
│   ├── __tests__/              # Integration tests
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   └── setupTests.ts           # Jest setup
├── public/                      # Static assets
├── dist/                        # Production build (after npm run build)
├── node_modules/               # Dependencies (auto-generated)
├── package.json                # Project metadata & dependencies
├── package-lock.json           # Locked dependency versions
├── tsconfig.json               # TypeScript configuration
├── tsconfig.app.json           # App TypeScript config
├── tsconfig.jest.json          # Jest TypeScript override
├── jest.config.ts              # Jest configuration
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
├── postcss.config.cjs          # PostCSS config
├── eslint.config.js            # ESLint rules
├── index.html                  # HTML entry point
├── README.md                   # Project overview
├── COMPONENTS.md               # Component docs
├── TESTING.md                  # Testing guide
└── SETUP.md                    # This file
```

## Configuration Files Explained

### TypeScript

**tsconfig.json**: Root configuration

- Extends both app and node configs

**tsconfig.app.json**: Application TypeScript settings

- `target: ES2022`
- `module: ESNext`
- `jsx: react-jsx`
- `strict: true`

**tsconfig.jest.json**: Jest-specific overrides

- CommonJS module for Jest compatibility
- Node module resolution

### Vite

**vite.config.ts**: Build and dev configuration

- React plugin
- TypeScript support
- Hot module replacement

### Tailwind CSS

**tailwind.config.js**:

```typescript
{
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

**postcss.config.cjs**: CSS processing pipeline

### Jest

**jest.config.ts**: Testing framework configuration

- `testEnvironment: jsdom` for DOM testing
- ts-jest for TypeScript support
- Module mapping for CSS files

## Development Workflow

### 1. Feature Development

```bash
# Start dev server
npm run dev

# Make changes to components
# Browser auto-refreshes

# Write tests for new feature
# Run tests in watch mode
npm run test:watch
```

### 2. Code Quality

```bash
# Check for linting errors
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix

# Run type checking
npx tsc --noEmit
```

### 3. Before Committing

```bash
# Run all tests
npm test

# Check coverage
npm test -- --coverage

# Run linting
npm run lint

# Build for production
npm run build
```

## Common Development Tasks

### Add New Component

1. Create file: `src/components/NewComponent.tsx`
2. Create test: `src/components/__tests__/NewComponent.test.tsx`
3. Import in App or parent component
4. Run tests: `npm test`

### Add New Hook

1. Create file: `src/hooks/useNewHook.ts`
2. Create test: `src/hooks/__tests__/useNewHook.test.ts`
3. Export from hook file
4. Use in components

### Update Styles

1. Work in component: `className="..."`
2. Tailwind classes auto-complete in VS Code
3. No build step needed (Vite handles it)
4. Changes appear instantly with HMR

### Add New Tests

1. Create test file: `src/components/__tests__/Component.test.tsx`
2. Import component and React Testing Library
3. Write test cases
4. Run: `npm test`

## Database/Storage

Currently uses **Browser LocalStorage** only:

```javascript
// Stored at: localStorage['slider_images']
// Format: JSON array of ImageItem objects
[
  {
    id: "1708603200000-a7f3b2c1",
    title: "sunset.jpg",
    imageUrl: "data:image/jpeg;base64,...",
    createdAt: 1708603200000,
  },
];
```

**Limits**:

- ~5-10 MB per domain
- Persists across sessions
- No backend required

## Environment Variables

Currently no environment variables needed. For future backend integration:

```bash
# Create .env.local
VITE_API_URL=http://localhost:3000
VITE_ENV=development
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Browser DevTools

### React DevTools

Install extension:

- [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/)

**Usage**:

1. Open DevTools (F12)
2. Go to "Components" tab
3. Inspect component tree
4. View props and state

### Tailwind CSS IntelliSense

For VS Code:

1. Install: "Tailwind CSS IntelliSense" extension
2. Get autocomplete for Tailwind classes
3. See class definitions on hover

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
# Build production
npm run build

# Deploy dist/ folder to Netlify
```

### Deploy to GitHub Pages

Add to `package.json`:

```json
"homepage": "https://username.github.io/photo-slider"
```

## Troubleshooting

### Port Already in Use

```bash
# Change port
npm run dev -- --port 3000

# Or kill process on 5173
lsof -ti:5173 | xargs kill -9
```

### Clear Cache

```bash
# Clear npm cache
npm cache clean --force

# Clear Jest cache
npx jest --clearCache

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Fails

```bash
# Check TypeScript errors
npx tsc --noEmit

# Check all build steps
npm run build -- --debug
```

### Tests Failing

```bash
# Clear cache
npx jest --clearCache

# Run with verbose output
npm test -- --verbose

# Run single test
npm test -- --testNamePattern="test name"
```

## Performance Optimization

### Code Splitting

Vite automatically code-splits components.

### Image Optimization

Currently stores as base64. For production:

- Consider compression library
- Implement image resizing
- Use CDN for storage

### Bundle Analysis

```bash
npm install -D rollup-plugin-visualizer

# Then check dist size
```

## Git Workflow

### Initial Commit

```bash
git init
git add .
git commit -m "Initial commit: Netflix-style photo slider"
git branch -M main
git remote add origin <repo-url>
git push -u origin main
```

### Feature Branch

```bash
git checkout -b feature/new-feature
# Make changes
git add .
git commit -m "feat: describe changes"
git push origin feature/new-feature
# Create Pull Request on GitHub
```

## Next Steps

1. **Explore Components**: Read `COMPONENTS.md`
2. **Write Tests**: Read `TESTING.md`
3. **Customize Styling**: Modify Tailwind config
4. **Add Features**: Follow development workflow
5. **Deploy**: Choose deployment platform

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Jest](https://jestjs.io/)
- [Vite Guide](https://vitejs.dev/guide/)

## Getting Help

1. Check documentation files (README.md, COMPONENTS.md, TESTING.md)
2. Review existing tests for examples
3. Check component props and types
4. Search GitHub issues
5. Ask on Stack Overflow

## Key Concepts

- **Component**: Reusable UI piece
- **Hook**: Stateful logic in functions
- **State**: Component data that changes
- **Props**: Component inputs
- **Ref**: Direct DOM access when needed
- **Effect**: Side effects (fetch, updates)

---

**Version**: 0.0.1  
**Last Updated**: February 2026  
**Ready to Develop**: ✅ All systems go!
