import React, { useState } from 'react';
import ResizableContainer from '../../../../_components/Containers/ResizableContainer';
import './left-panel.theme.scss'
import LogViewer from './Logs/LogsViewer';

export default function AgentsLogsContainer() {
  const logs = [
    {
      timestamp: 1634777951000,
      type: 'Diffx Explorer',
      message: 'Executed query on cloak_performance',
      ipAddress: '127.0.0.1:64050',
    },
    {
      timestamp: 1634777832000,
      type: 'Jakub Hampel',
      message: 'Altered Diffx Explorer permissions',
      ipAddress: '127.0.0.1:53760',
    },
    {
      timestamp: 1634777808000,
      type: 'Jakub Hampel',
      message: 'Logged in',
      ipAddress: '127.0.0.1:53760',
    },
    {
      timestamp: 1634774117000,
      type: 'Jakub Hampel',
      message: 'Executed query on cloak_performance',
      ipAddress: '127.0.0.1:58952',
    },
    {
      timestamp: 1603290671000,
      type: 'Jakub Hampel',
      message: 'Logged in',
      ipAddress: '127.0.0.1:61648',
    },
  ];

  return (
    <ResizableContainer customClass="agents-logs-container" title="Agents logs">
      <LogViewer logs={logs} />
    </ResizableContainer>
  );
}
