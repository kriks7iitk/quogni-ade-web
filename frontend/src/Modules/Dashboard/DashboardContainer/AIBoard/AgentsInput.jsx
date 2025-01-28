import React, { useState } from 'react';
import { useDashboard } from '../DashboardContainer';
import './ai-board.theme.scss';
import SolidButton from '../../../../_components/Buttons/SolidButton';
import ThemeButton from '../../../../_components/Buttons/ThemeButton';
import { dataInsight } from '../../../../_services/dataInsight.service'
import { screenerAgent } from '../../../../_services/analystAagent.service'
import DataTable from '../../../../_components/DataTable/DataTable'
import toast from 'react-hot-toast';

export default function AgentsInput() {
  const {
    aiMode,
    setAiMode,
    messagesAi,
    toggleEventsRightContainer,
    setMessagesAi,
    isLoading,
    setIsLoading,
  } = useDashboard();

  const [message, setMessage] = useState('');

  const toggleEventOnCondition = () => {
    if (messagesAi.length === 0) {
      toggleEventsRightContainer();
    }

  };

  const sendMessage = (agentName) => {
    setIsLoading(true)
    const messageObject = {
      type: 'prompt',
      user: message,
      time: new Date().toISOString(),
    };
    setMessagesAi((prevState) => {
      return [messageObject, ...prevState];
    });

    console.log(agentName, "hi from sendMessage")

    if (agentName === 'Data and insight agent') {
      const body = {
        "symbol": "icici",
        "prompt": message
      }

      dataInsight.getInsight(body)
        .then((data) => {
          console.log(data);
          const aiResponse = {
            type: 'agent',
            user: data["data"]["message"],
            time: new Date().toISOString(),
          }
          console.log(aiResponse)
          setIsLoading(false)
          setMessagesAi((prevState) => {
            return [aiResponse, ...prevState,];
          });
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
          toast.error(error?.error)
        })
    }

    if (agentName === 'Analyst agent') {
      const body = {
        "prompt": message
      }
      console.log(body)
      screenerAgent.getScreener(body)
        .then((data) => {
          console.log(data);
          const aiResponse = {
            type: 'agent',
            user: data["data"],
            time: new Date().toISOString(),
            agentname: agentName,
            description: data["description"]
          }
          console.log(aiResponse)
          setIsLoading(false);
          setMessagesAi((prevState) => {
            return [aiResponse, ...prevState];
          });
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
          toast.error(error?.error)
        })
    }


    setMessage('')
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Allow normal newline behavior
        return;
      } else {
        event.preventDefault();
        sendMessage('Analyst agent');
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
              disabled={isLoading}
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
                onClick={() => { sendMessage('Analyst agent') }}
              />
            );
          })}
        </div>
      </div>
      <div className="message-container"></div>
    </div>
  );
}
