import * as React from 'react';
import { Card, Heading } from '../styles/components';
import { TimeDisplay } from './TimeDisplay';
import { StatusMessage } from './StatusMessage';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface StatusPanelProps {
  message?: string;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ 
  message
}) => {
  // Get status from Redux store
  const status = useSelector((state: RootState) => state.status);
  
  return (
    <Card>
      <Heading level={2}>Status Information</Heading>
      <StatusMessage message={message || status.message} error={status.error} />
      <TimeDisplay />
    </Card>
  );
};
