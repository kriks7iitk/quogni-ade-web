import React from 'react';
import { useDashboard } from '../DashboardContainer';
import UserPrompt from './_component/UserPrompt';

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
