import React from 'react';
import './right-panel.theme.scss';
import TrainingList from '../ADE/AgentTraining/TrainingList'
  
export default function RightPanel() {
  return (
    <div className="right-panel">
      <TrainingList promptList={["this my promt","second prompt"]} response={{
        "isCollapsed": false,
        "height": 12
      }} />
    </div>
  );
}
