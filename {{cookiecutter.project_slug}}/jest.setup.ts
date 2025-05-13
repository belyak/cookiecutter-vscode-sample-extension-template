// jest.setup.ts
import '@testing-library/jest-dom';

// Mock the VS Code API
global.acquireVsCodeApi = jest.fn(() => ({
  postMessage: jest.fn(),
  setState: jest.fn(),
  getState: jest.fn(),
}));
