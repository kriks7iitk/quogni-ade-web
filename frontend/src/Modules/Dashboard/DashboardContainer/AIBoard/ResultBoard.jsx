import React from 'react';
import { useDashboard } from '../DashboardContainer';
import UserPrompt from './_component/UserPrompt';
import './ai-board.theme.scss';

export default function ResultBoard() {
  const { messagesAi } = useDashboard();
  return (
    <div className="result-board">
      {messagesAi.map((message) => {
        return <UserPrompt message={message?.user} />;
      })}
    </div>
  );
}
