import React from 'react';
import './left-panel.theme.scss';
import LeftPanelContainer from './LeftPanelContainer';
import { LeftPanelProvider } from './LeftPanelProvider';

export default function LeftPanel() {
  return (
    <LeftPanelProvider>
      <div className="left-panel">
        <div className="left-panel-main">
          <LeftPanelContainer />
        </div>
      </div>
    </LeftPanelProvider>
  );
}
