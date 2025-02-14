import React from 'react';
import './right-panel.theme.scss';
import TrainingList from '../ADE/AgentTraining/TrainingList'
import AgentTraining from '../ADE/AgentTraining/AgentTraining';
  
export default function RightPanel({children}) {
  return (
    <div className="container-card right-panel">
        {children}
      </div>
  );
}
