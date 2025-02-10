import React from 'react';
import './right-panel.theme.scss';
import TrainingList from '../ADE/AgentTraining/TrainingList'
import AgentTraining from '../ADE/AgentTraining/AgentTraining';
  
export default function RightPanel() {
  return (
    <div className="container-card right-panel">
      <AgentTraining/>
      {/* <TrainingList promptList={["this my promt","second prompt"]} response={{
        "isCollapsed": false,
        "height": 12
      }} /> */}
      </div>
  );
}
