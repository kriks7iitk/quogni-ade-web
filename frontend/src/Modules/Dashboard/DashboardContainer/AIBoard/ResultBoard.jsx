import React from 'react';
import { useDashboard } from '../DashboardContainer';
import UserPrompt from './_component/UserPrompt';
import AiTyping from '../../../../_components/AiTyping/AiTyping';
import './ai-board.theme.scss';
import AnalysitAgentOutput from './_component/AnalysitAgentOutput';

export default function ResultBoard() {
  const { messagesAi, isLoading } = useDashboard();
  console.log("message logs are");
  console.log(messagesAi);
  
  
  return (
    <div className="result-board">
      {isLoading ? <AiTyping /> : <></>}
      {messagesAi.map((message, index) => {
        if (message?.agentname === 'Analyst agent') {
          return <AnalysitAgentOutput key={index} message={message} />;
        }
        return <UserPrompt key={index} message={message?.data} />;
      })}
    </div>
  );
}
