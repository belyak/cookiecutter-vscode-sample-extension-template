import * as React from 'react';
import { styled } from './theme';
import { JSX } from 'react';

// Common components for the UI

export const Card = styled('div')`
  background-color: var(--vscode-editor-background);
  border: 1px solid var(--vscode-editorWidget-border);
  border-radius: 5px;
  padding: 16px;
  margin: 10px 0;
  box-shadow: 0 2px 8px var(--vscode-widget-shadow);
`;

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({ level, children, ...props }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const styles = {
    color: 'var(--vscode-foreground)',
    fontWeight: 'bold',
    margin: level === 1 ? '0 0 16px 0' : '8px 0',
    fontSize: `${1.6 - (level - 1) * 0.2}em`,
  };
  
  return <Tag style={styles} {...props}>{children}</Tag>;
};

export const Button = styled('button')`
  background-color: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  border-radius: 2px;
  padding: 6px 14px;
  cursor: pointer;
  font-family: var(--vscode-font-family);
  font-size: var(--vscode-font-size);
  
  &:hover {
    background-color: var(--vscode-button-hoverBackground);
  }
  
  &:active {
    background-color: var(--vscode-button-secondaryBackground);
  }
  
  &:focus {
    outline: 1px solid var(--vscode-focusBorder);
    outline-offset: 2px;
  }
`;

export const TextField = styled('input')`
  background-color: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  border: 1px solid var(--vscode-input-border, transparent);
  padding: 6px 8px;
  border-radius: 2px;
  font-family: var(--vscode-font-family);
  font-size: var(--vscode-font-size);
  
  &:focus {
    border-color: var(--vscode-focusBorder);
    outline: none;
  }
`;
