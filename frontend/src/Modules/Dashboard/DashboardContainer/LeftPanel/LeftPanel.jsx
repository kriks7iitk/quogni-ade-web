import React from 'react';
import './left-panel.theme.scss';
import LeftPanelContainer from './LeftPanelContainer';
import AgentsLogsContainer from './AgentsLogsContainer';
import SubNavigations from '../../../Navigation/SubNavigations/SubNavigations';

export default function LeftPanel() {
  return (
    <div className="left-panel">
      <div className='left-panel-main'>
        <SubNavigations/>
        <LeftPanelContainer /></div>
      
      <AgentsLogsContainer />
    </div>
  );
}
