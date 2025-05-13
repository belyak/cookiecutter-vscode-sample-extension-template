import * as React from 'react';
import { JSX } from 'react';

// Theme context
type ThemeContextType = { isDark: boolean };

const ThemeContext = React.createContext<ThemeContextType>({ isDark: true });

// Styled component system
export function styled(tag: keyof JSX.IntrinsicElements) {
  return (styles: TemplateStringsArray, ...args: any[]) => {
    return ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => {
      const { isDark } = React.useContext(ThemeContext);
      
      const css = styles.reduce((acc, part, i) => {
        let arg = args[i] || '';
        if (typeof arg === 'function') {
          arg = arg({ isDark });
        }
        return acc + part + arg;
      }, '');
      
      const style = React.useMemo(() => ({ ...props.style, cssText: css }), [css, props.style]);
      
      return React.createElement(tag, { ...props, style }, children);
    };
  };
}

// Theme provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = React.useState(true);
  
  React.useEffect(() => {
    // Check if VS Code is in dark mode
    const isDarkMode = document.body.classList.contains('vscode-dark') || 
      !document.body.classList.contains('vscode-light');
    
    setIsDark(isDarkMode);
    
    // Listen for theme changes from VS Code
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'vscode-theme-changed') {
        const isDarkMode = document.body.classList.contains('vscode-dark') || 
          !document.body.classList.contains('vscode-light');
        setIsDark(isDarkMode);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  return (
    <ThemeContext.Provider value={ { "isDark": isDark } }>
      {children}
    </ThemeContext.Provider>
  );
};
