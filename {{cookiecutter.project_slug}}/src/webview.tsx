import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { StatusPanel } from './components/StatusPanel';
import { ThemeProvider } from './styles/theme';

// Log React version for debugging
console.log('React version:', React.version);
console.log('ReactDOM available:', !!ReactDOM);

// Declare type for the VSCode API
declare global {
  interface Window {
    acquireVsCodeApi: () => {
      postMessage: (message: any) => void;
      setState: (state: any) => void;
      getState: () => any;
    };
  }
}

// Initialize vscode API
const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : null;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    console.log('Initializing React app');
    const root = document.getElementById('root');
    
    // Add error indicator for debugging
    const errorEl = document.createElement('div');
    errorEl.style.color = 'var(--vscode-errorForeground, red)';
    errorEl.style.padding = '10px';
    errorEl.style.margin = '10px 0';
    errorEl.style.border = '1px solid var(--vscode-errorForeground, red)';
    errorEl.id = 'react-debug-info';
    errorEl.textContent = 'React initialization in progress...';
    document.body.appendChild(errorEl);
    
    if (root) {
      console.log('Root element found, setting up React app');
      // Update debug info
      errorEl.textContent = 'Root element found, initializing React components...';
      
      // Create React app with Redux store
      const App = () => {
        React.useEffect(() => {
          // Add message listener for receiving config from extension
          const messageHandler = (event: MessageEvent) => {
            const message = event.data;
            console.log('Received message from extension:', message);
          };
          
          window.addEventListener('message', messageHandler);
          
          return () => {
            window.removeEventListener('message', messageHandler);
          };
        }, []);
        
        return (
          <Provider store={store}>
            <ThemeProvider>
              <StatusPanel />
            </ThemeProvider>
          </Provider>
        );
      };
      
      // Render the React app
      const reactRoot = ReactDOM.createRoot(root);
      reactRoot.render(<App />);
      
      // Update DOM to indicate React has loaded
      document.body.classList.add('react-loaded');
      errorEl.textContent = 'React initialized successfully!';
      
      // Remove debug element after a delay
      setTimeout(() => {
        if (errorEl && errorEl.parentNode) {
          errorEl.parentNode.removeChild(errorEl);
        }
      }, 3000);
    } else {
      console.error('Root element not found');
      errorEl.textContent = 'Error: Root element not found in DOM!';
    }
  } catch (err) {
    console.error('Error initializing React app:', err);
    const errorEl = document.getElementById('react-debug-info');
    if (errorEl) {
      errorEl.textContent = `Error initializing React: ${err instanceof Error ? err.message : String(err)}`;
    }
  }
});
