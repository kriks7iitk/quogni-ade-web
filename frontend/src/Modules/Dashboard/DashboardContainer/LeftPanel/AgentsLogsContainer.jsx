import React, { useState } from 'react';
import ResizableContainer from '../../../../_components/Containers/ResizableContainer';
import './left-panel.theme.scss'
import LogViewer from '../LogsVIewer/LogViewer';
import { useDashboard } from '../DashboardContainer';
// import LogViewer from './Logs/LogsViewer';

export default function AgentsLogsContainer() {
  const { maximizeAgentLogs, toggleAgentsContainer, agentLogs } = useDashboard();
  const logs = [
    {
      timestamp: 1634777951000,
      agent: 'data-insight-agent',
      metadata: {},
      query:'Give me revenue of reliance for last two years'
    },
    {
      timestamp: 1634777832000,
      agent: 'event-agent',
      metadata: {},
      query:'Tell me how this event can effect the revenue of the company'
    },
    {
      timestamp: 1634777808000,
      agent: 'analyst-agent',
      metadata: {},
      query:'Give me stock whoich revenue has doubled from last two year'
    },
    {
      timestamp: 1634774117000,
      agent: 'analyst-agent',
      metadata: {},
      query:'Give me stock whoich is investing in rnd for last two year'
    },
    {
      timestamp: 1603290671000,
      agent: 'event-agent',
      metadata: {},
      query:'How this event will effect automobile industry'
    },
  ];

  return (
    <ResizableContainer
      customClass="agents-logs-container"
      title="Agents logs"
      isMaximized={maximizeAgentLogs}
      toggleMaximize={toggleAgentsContainer}
    >
      <LogViewer logs={agentLogs} />
    </ResizableContainer>
  );
}
