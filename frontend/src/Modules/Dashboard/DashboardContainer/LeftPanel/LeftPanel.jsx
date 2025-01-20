import React from 'react';
import './left-panel.theme.scss';
import LeftPanelContainer from './LeftPanelContainer';
import AgentsLogsContainer from './AgentsLogsContainer';

export default function LeftPanel() {
  return (
    <div className="left-panel">
      <LeftPanelContainer />
      <AgentsLogsContainer />
    </div>
  );
}
