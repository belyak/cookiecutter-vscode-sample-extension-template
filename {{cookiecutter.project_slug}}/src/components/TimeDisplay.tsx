import * as React from 'react';
import { styled } from '../styles/theme';

const TimeContainer = styled('div')`
  margin: 10px 0;
  padding: 8px;
  background-color: var(--vscode-editor-background);
  border: 1px dashed var(--vscode-editorLineNumber-foreground);
  border-radius: 4px;
  font-family: var(--vscode-editor-font-family);
`;

const TimeLabel = styled('span')`
  margin-right: 8px;
  font-weight: bold;
  color: var(--vscode-editorLineNumber-activeForeground);
`;

export const TimeDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState<string>(new Date().toLocaleTimeString());
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <TimeContainer>
      <TimeLabel>Current time:</TimeLabel>
      {currentTime}
    </TimeContainer>
  );
};
