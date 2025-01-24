import React from 'react';
import './left-panel.theme.scss';
import LeftPanelContainer from './LeftPanelContainer';
import AgentsLogsContainer from './AgentsLogsContainer';
import SubNavigation from '../../../Navigation/SubNavigation/SubNavigation';
import { LeftPanelProvider } from './LeftPanelProvider';

export default function LeftPanel() {
  return (
    <LeftPanelProvider>
      <div className="left-panel">
        <div className="left-panel-main">
          <SubNavigation />
          <LeftPanelContainer />
        </div>

        <AgentsLogsContainer />
      </div>
    </LeftPanelProvider>
  );
}
