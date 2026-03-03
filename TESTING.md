# Testing Guide

## Overview

This project uses Jest and React Testing Library for unit and integration testing. Tests ensure components work correctly and catch regressions.

## Setup

### Jest Configuration

**File**: `jest.config.ts`

```typescript
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
```

### Setup File

**File**: `src/setupTests.ts`

```typescript
import "@testing-library/jest-dom";
```

Adds custom Jest matchers from React Testing Library.

### TypeScript for Jest

**File**: `tsconfig.jest.json`

```jsonc
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node",
    "verbatimModuleSyntax": false,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "isolatedModules": false,
  },
}
```

## Running Tests

### Commands

```bash
# Run all tests once
npm test

# Run in watch mode (rerun on changes)
npm run test:watch

# Generate coverage report
npm test -- --coverage

# Run specific test file
npm test -- UploadArea.test.tsx

# Clear cache and rerun
npx jest --clearCache && npm test
```

### Test Output

```
PASS  src/components/__tests__/SliderRow.test.tsx
PASS  src/components/__tests__/UploadArea.test.tsx
PASS  src/__tests__/App.test.tsx

Test Suites: 3 passed, 3 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.5s
```

## Test Files

### ImageCard Tests

**File**: `src/components/__tests__/ImageCard.test.tsx`

```typescript
import { render } from '@testing-library/react';
import ImageCard from '../ImageCard';
import type { ImageItem } from '../../types';

const mockItem: ImageItem = {
  id: '1',
  title: 'Test Image',
  imageUrl: 'data:image/jpeg;base64,...',
  createdAt: Date.now(),
};

it('renders image with title', () => {
  const { getByAltText } = render(<ImageCard item={mockItem} />);
  expect(getByAltText('Test Image')).toBeInTheDocument();
});
```

### SliderRow Tests

**File**: `src/components/__tests__/SliderRow.test.tsx`

Tests slider rendering and navigation:

```typescript
it('renders images passed as props', () => {
  const items: ImageItem[] = [
    { id: '1', title: 'One', imageUrl: 'url1', createdAt: 1 },
    { id: '2', title: 'Two', imageUrl: 'url2', createdAt: 2 },
  ];

  const { getByAltText } = render(<SliderRow items={items} />);
  expect(getByAltText('One')).toBeInTheDocument();
  expect(getByAltText('Two')).toBeInTheDocument();
});
```

### UploadArea Tests

**File**: `src/components/__tests__/UploadArea.test.tsx`

Tests file upload and drag-drop:

```typescript
it('calls onAdd when files are selected', async () => {
  const mockAdd = jest.fn();
  const { container } = render(<UploadArea onAdd={mockAdd} />);

  const input = container.querySelector('input[type="file"]') as HTMLInputElement;
  const file = new File(['test data'], 'test.png', { type: 'image/png' });

  fireEvent.change(input, { target: { files: [file] } });

  await waitFor(() => {
    expect(mockAdd).toHaveBeenCalled();
  }, { timeout: 2000 });
});
```

### Integration Tests

**File**: `src/__tests__/App.test.tsx`

Tests complete app flow:

```typescript
it('uploads an image and displays it in slider', async () => {
  render(<App />);

  const file = new File(['dummy'], 'photo.jpg', { type: 'image/jpeg' });
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

  Object.defineProperty(fileInput, 'files', {
    value: [file],
  });

  fireEvent.change(fileInput);

  await waitFor(() => {
    expect(screen.getByAltText('photo.jpg')).toBeInTheDocument();
  });

  // Verify persistence
  expect(JSON.parse(localStorage.getItem('slider_images') || '[]')[0].title).toBe('photo.jpg');
});
```

## React Testing Library API

### Query Functions

```typescript
// Get single element - throws if not found
(getByRole, getByTestId, getByAltText, getByText, getByPlaceholderText);

// Get multiple elements
(getAllByRole, getAllByTestId);

// Query optional - returns null if not found
(queryByRole, queryByTestId);

// Find async - waits for element
(findByRole, findByTestId);
```

### User Interactions

```typescript
import { fireEvent, userEvent, waitFor } from "@testing-library/react";

// Simulate events
fireEvent.click(element);
fireEvent.change(input, { target: { value: "text" } });
fireEvent.submit(form);

// Wait for async operations
await waitFor(
  () => {
    expect(element).toBeInTheDocument();
  },
  { timeout: 2000 },
);
```

### Assertions

```typescript
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(input).toHaveValue("test");
expect(element).toHaveClass("active");
expect(spy).toHaveBeenCalled();
expect(spy).toHaveBeenCalledWith(arg);
```

## Common Testing Patterns

### Testing File Upload

```typescript
const file = new File(["content"], "name.png", { type: "image/png" });
const input = container.querySelector('input[type="file"]');

fireEvent.change(input, { target: { files: [file] } });
```

### Testing LocalStorage

```typescript
beforeEach(() => {
  localStorage.clear();
});

it("saves to localStorage", () => {
  useImageStore().addImage(item);
  expect(JSON.parse(localStorage.getItem("slider_images"))).toContainEqual(
    item,
  );
});
```

### Testing Callbacks

```typescript
const mockCallback = jest.fn();
render(<Component onAdd={mockCallback} />);

fireEvent.click(button);

expect(mockCallback).toHaveBeenCalledWith(expectedValue);
expect(mockCallback).toHaveBeenCalledTimes(1);
```

### Testing Async Operations

```typescript
it('loads data asynchronously', async () => {
  render(<Component />);

  // Wait for element to appear
  const element = await screen.findByText('Loaded');
  expect(element).toBeInTheDocument();
});
```

### Testing Hooks

```typescript
import { renderHook, act } from "@testing-library/react";
import { useImageStore } from "./useImageStore";

it("adds image to store", () => {
  const { result } = renderHook(() => useImageStore());

  act(() => {
    result.current.addImage(mockItem);
  });

  expect(result.current.images).toHaveLength(1);
});
```

## Coverage Report

Run coverage:

```bash
npm test -- --coverage
```

Expected output:

```
File               | % Stmts | % Branch | % Funcs | % Lines
ImageCard.tsx      |     100 |      100 |     100 |     100
SliderRow.tsx      |      48 |        0 |      22 |      50
UploadArea.tsx     |      75 |       25 |      67 |      75
useImageStore.ts   |      78 |       50 |      80 |      78
```

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 70%
- **Functions**: > 80%
- **Lines**: > 80%

## Best Practices

### 1. Test User Behavior, Not Implementation

```typescript
// ❌ Bad - testing internals
expect(component.state.isOpen).toBe(true);

// ✅ Good - testing user sees result
expect(screen.getByText("Modal Content")).toBeInTheDocument();
```

### 2. Use Semantic Queries

```typescript
// ❌ Bad
const { container } = render(<Button>Click me</Button>);
container.querySelector('button'); // HTML element query

// ✅ Good
getByRole('button', { name: /click me/i }); // Semantic query
```

### 3. Test One Thing Per Test

```typescript
// ❌ Bad - multiple assertions
it('works', () => {
  render(<Component />);
  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
  fireEvent.click(getByRole('button'));
  expect(mock).toHaveBeenCalled();
});

// ✅ Good - focused test
it('renders title', () => {
  render(<Component />);
  expect(screen.getByText('Title')).toBeInTheDocument();
});

it('calls callback on button click', () => {
  render(<Component onSubmit={mock} />);
  fireEvent.click(getByRole('button'));
  expect(mock).toHaveBeenCalled();
});
```

### 4. Use Descriptive Test Names

```typescript
// ❌ Bad
it("works", () => {});

// ✅ Good
it("renders upload area with drag and drop text", () => {});
it("calls onAdd callback after file selection", () => {});
it("persists images to localStorage", () => {});
```

### 5. Always Cleanup

Jest automatically cleans up after each test, but for custom setup:

```typescript
afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});
```

## Mocking

### Mock Functions

```typescript
const mock = jest.fn();
const mockWithReturn = jest.fn().mockReturnValue("value");
const mockAsync = jest.fn().mockResolvedValue(data);

expect(mock).toHaveBeenCalled();
expect(mock).toHaveBeenCalledWith(arg);
```

### Mock Modules

```typescript
jest.mock("../module", () => ({
  exportedFunction: jest.fn(() => "mocked"),
}));
```

### Reset Mocks

```typescript
jest.clearAllMocks(); // Clears call history
jest.resetAllMocks(); // Resets everything
jest.restoreAllMocks(); // Restores functions
```

## Debugging Tests

### Print Debug Info

```typescript
import { render, screen } from '@testing-library/react';

it('debug test', () => {
  const { debug } = render(<Component />);
  debug(); // Prints DOM tree to console

  screen.debug(element); // Prints specific element
});
```

### Run Single Test

```bash
npm test -- --testNamePattern="specific test name"
npm test -- ImageCard.test.tsx
```

### Enable Console Logs

```typescript
it('logs during test', () => {
  console.log('This will show in test output');
  render(<Component />);
});
```

## CI/CD Integration

### GitHub Actions Example

```yaml
- name: Run Tests
  run: npm test -- --coverage

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## Troubleshooting

### 1. "Cannot find module"

```bash
npx jest --clearCache
npm install
npm test
```

### 2. "Element not found"

```typescript
// Wait for async operations
await waitFor(() => {
  expect(screen.getByText("Text")).toBeInTheDocument();
});
```

### 3. "jest.fn() is not a function"

Ensure jest is imported:

```typescript
import { jest } from "@jest/globals";
```

### 4. localStorage errors

Mock localStorage before tests:

```typescript
beforeEach(() => {
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.clear = jest.fn();
});
```

---

**Last Updated**: February 2026
