import React from 'react';
import { useDashboard } from '../DashboardContainer';
import UserPrompt from './_component/UserPrompt';
import './ai-board.theme.scss';
import AnalysitAgentOutput from './_component/AnalysitAgentOutput'

export default function ResultBoard() {
  const { messagesAi } = useDashboard();
  return (
    <div className="result-board">
      {messagesAi.map((message, index) => {
        if (message?.agentname === 'Analyst agent') {
          return (<AnalysitAgentOutput key={index} message={message} />);
        }
        return <UserPrompt key={index} message={message?.user} />;
      })}
    </div>
  );
}
