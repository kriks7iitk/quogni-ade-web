import React from 'react';
import { useDevelopmentEnvironment } from '../AgentDevelopmentEnvironment/AgentDevelopmentEnvironment';
import UserPrompt from './_component/UserPrompt';
import AiTyping from '../../_components/AiTyping/AiTyping';
import './ai-board.theme.scss';
import AnalysitAgentOutput from './_component/AnalysitAgentOutput';

export default function ResultBoard() {
  const { messagesAi, isLoading } = useDevelopmentEnvironment();
  
  
  return (
    <div className="result-board">
      {isLoading ? <AiTyping /> : <></>}
      {messagesAi.map((message, index) => {
        if (message?.agent === 'analyst-agent') {
          return <AnalysitAgentOutput key={index} message={message} />;
        }
        return <UserPrompt key={index} message={message?.data} agent={message?.agent} />;
      })}
    </div>
  );
}
