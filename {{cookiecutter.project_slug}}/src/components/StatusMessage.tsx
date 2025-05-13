import * as React from 'react';
import { styled } from '../styles/theme';

interface StatusMessageProps {
  message?: string;
  error?: string | null;
}

const MessageContainer = styled('div')`
  padding: 10px;
  margin-bottom: 10px;
  background-color: var(--vscode-editor-background);
  border-radius: 4px;
  border-left: 4px solid var(--vscode-editorInfo-border);
`;

const ErrorContainer = styled('div')`
  padding: 10px;
  margin-bottom: 10px;
  background-color: var(--vscode-editor-background);
  border-radius: 4px;
  border-left: 4px solid var(--vscode-errorForeground);
  color: var(--vscode-errorForeground);
`;

export const StatusMessage: React.FC<StatusMessageProps> = ({ message = 'Extension is ready', error }) => {
  return (
    <>
      <MessageContainer>
        {message}
      </MessageContainer>
      {error && (
        <ErrorContainer>
          {error}
        </ErrorContainer>
      )}
    </>
  );
};
