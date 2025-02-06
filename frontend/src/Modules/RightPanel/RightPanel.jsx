import React from 'react';
import './right-panel.theme.scss';
import TrainingList from '../ADE/AgentTraining/TrainingList'
  
export default function RightPanel() {
  return (
    <div className="right-panel">
      <TrainingList promptResponsePairs={[{
        "prompt": "this my promt", "response": {
        "state1": true
      }}]} />
    </div>
  );
}
