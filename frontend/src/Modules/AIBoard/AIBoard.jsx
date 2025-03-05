import React from 'react';
import { useDevelopmentEnvironment } from '../DevelopmentEnvironment/DevelopmentEnvironment';
import ResultBoard from './ResultBoard';
import AgentsInput from './AgentsInput';
import './ai-board.theme.scss';

export default function AIBoard() {
  const { aiMode,toolId } = useDevelopmentEnvironment();
  const styleObject = { padding: '0 2%' };

  const activeTabComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        
        return ;
      case 'saved-screens':
        break;
      default:
        break;
    }
  };

  return (
    <div className="ai-board-dashboard">
      <div
        style={{
          ...styleObject,
        }}
        className="main-panel"
        
      >
        <ResultBoard/>
      </div>
      <AgentsInput />
    </div>
  );
}
