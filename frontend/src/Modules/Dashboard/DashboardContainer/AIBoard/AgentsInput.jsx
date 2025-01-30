import React, { useState } from 'react';
import { useDashboard } from '../DashboardContainer';
import './ai-board.theme.scss';
import SolidButton from '../../../../_components/Buttons/SolidButton';
import ThemeButton from '../../../../_components/Buttons/ThemeButton';
import { dataInsight } from '../../../../_services/dataInsight.service';
import { screenerAgent } from '../../../../_services/analystAagent.service';
import DataTable from '../../../../_components/DataTable/DataTable';
import toast from 'react-hot-toast';
import StockButton from '../../../../_components/Buttons/StockButton';

export default function AgentsInput() {
  const {
    aiMode,
    setAiMode,
    messagesAi,
    toggleEventsRightContainer,
    setMessagesAi,
    currentActiveAgent,
    setCurrentActiveAgent,
    isLoading,
    setIsLoading,
    selectedStock,
  } = useDashboard();

  const [message, setMessage] = useState('');

  const toggleEventOnCondition = () => {
    if (messagesAi.length === 0) {
      toggleEventsRightContainer();
    }
  };

  const transformAIOutput = (response) => {
    const metaData = {
      type: 'agent',
      time: new Date().toISOString(),
      agent: currentActiveAgent ? currentActiveAgent : 'ai-chat',
    };
    switch (currentAgents) {
      case 'data-insight-agent':
        return {
          ...metaData,
          data: response?.message,
        };
      case 'analyst-agent':
        return {
          ...metaData,
          data: response?.data,
          description: data?.description,
        };
      default:
        return {
          ...metaData,
          data: response?.message,
        };
    }
  };

  const sendMessage = () => {
    setIsLoading(true);
    const messageObject = {
      type: 'prompt',
      data: message,
    };
    setMessagesAi((prevState) => {
      return [messageObject, ...prevState];
    });

    const body = { prompt: message };
    if (currentActiveAgent === 'data-insight-agent')
      body.symbol = selectedStock;

    const agentMap = {
      'data-insight-agent': dataInsight.getInsight,
      'analyst-agent': screenerAgent.getScreener,
      'event-agent': () => {
        console.log('this is not ready');
      },
    };

    const agentFunction = currentActiveAgent
      ? agentMap[currentActiveAgent]
      : screenerAgent.getScreenerChat;

    agentFunction(body)
      .then((response) => {
        const aiResponse = transformAIOutput(response);
        setIsLoading(false);
        setMessagesAi((prevState) => [aiResponse, ...prevState]);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        toast.error(error?.error);
      });
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
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
          <div className="agent-list">
            {currentAgents.map((agent, index) => {
              const isActiveAgent = currentActiveAgent == agent?.iconName;
              return (
                <SolidButton
                  key={index}
                  leftIcon={agent?.iconName}
                  iconWidth={15}
                  customClass={`icon-class ${isActiveAgent ? 'active' : 'un-active'}`}
                  iconFill={
                    isActiveAgent ? 'var(--ps-dark-blue)' : 'var(--slate-400)'
                  }
                  onClick={() => {
                    if (isActiveAgent) {
                      setCurrentActiveAgent(null);
                      return;
                    }
                    setCurrentActiveAgent(agent?.iconName);
                  }}
                />
              );
            })}
          </div>
          <div className="selected-stock">
            {selectedStock && <span className="title-sec">Selected:</span>}
            {selectedStock && (
              <StockButton
                symbol={selectedStock}
                showChangeSymbol={false}
                customClass="stock-btn-class"
              />
            )}
          </div>
        </div>
      </div>
      <div className="message-container"></div>
    </div>
  );
}
