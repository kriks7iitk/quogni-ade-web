import React from 'react';
import { useDashboard } from '../DashboardContainer';
import './ai-board.theme.scss';

export default function AgentsInput() {
  const { aiMode, setAiMode } = useDashboard();
  return (
    <div className="agent-input-container">
      <div className="agent-selection-container">
        <div className="input-container-main">
          <div className="input-container">
            <textarea
              onFocus={() => {
                setAiMode(true);
              }}
              onBlur={() => {
                setAiMode(false);
              }}
              placeholder="Type your message..."
            ></textarea>
          </div>
          <div className="button-section"></div>
        </div>
        <div className="agent-selection-section"></div>
      </div>
      <div className="message-container"></div>
    </div>
  );
}
