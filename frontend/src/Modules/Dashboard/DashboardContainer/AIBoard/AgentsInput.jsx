import React, { useState } from 'react';
import { useDashboard } from '../DashboardContainer';
import './ai-board.theme.scss';
import SolidButton from '../../../../_components/Buttons/SolidButton';
import ThemeButton from '../../../../_components/Buttons/ThemeButton';

export default function AgentsInput() {
  const {
    aiMode,
    setAiMode,
    messagesAi,
    toggleEventsRightContainer,
    setMessagesAi,
  } = useDashboard();

  const [message, setMessage] = useState('');

  const toggleEventOnCondition = () => {
    if (messagesAi.length === 0) {
      toggleEventsRightContainer();
    }
    
  };

  const sendMessage = () => {
    const messageObject = {
      type:'prompt',
      user: message,
      time: new Date().toISOString(),
    };
    setMessagesAi((prevState) => {

      return [...prevState, messageObject];
    });
    //api calll - Subham api call
    setMessage('')
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Allow normal newline behavior
        return;
      } else {
        event.preventDefault();
        sendMessage();
      }
    }
  };

  const currentAgents = [
    {
      name: 'Data and insight agent',
      iconName: 'data-insight-agent',
    },

    {
      name: 'Analyst agent',
      iconName: 'analyst-agent',
    },
    {
      name: 'Event detail agent',
      iconName: 'event-agent',
    },
  ];
  return (
    <div className="agent-input-container">
      <div className="agent-selection-container">
        <div className="input-container-main">
          <div className="input-container">
            <textarea
            value={message}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                toggleEventOnCondition();
                setAiMode(true);
              }}
              onBlur={() => {
                toggleEventOnCondition();
                if (messagesAi.length === 0) {
                  
                  setAiMode(false);
                }
              }}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Type your message..."
            ></textarea>
          </div>
          <div className="button-section">
            <ThemeButton
              leftIcon="enter"
              className="enter-btn"
              iconFill="var(--slate-400)"
            />
          </div>
        </div>
        <div className="agent-selection-section">
          {currentAgents.map((agent, index) => {
            return (
              <SolidButton
                key={index}
                leftIcon={agent?.iconName}
                iconWidth={15}
                customClass="icon-class"
                iconFill={'var(--slate-400)'}
                onClick={sendMessage}
              />
            );
          })}
        </div>
      </div>
      <div className="message-container"></div>
    </div>
  );
}
