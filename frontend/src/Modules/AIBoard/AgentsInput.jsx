import React, { useContext } from 'react';
import './ai-board.theme.scss';
import ThemeButton from '../../_components/Buttons/ThemeButton';
import { useAiUi } from '../Ai-Ui/AiUiProvider';

export default function AgentsInput({ parentContext }) {
  const {
    isLoading,
    placeholder,
    setMessagesAi
  } = useContext(parentContext);


  const { setPrompt,prompt,sendMessage } = useAiUi();
  

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        return;
      } else {
        setMessagesAi((message) => ([...message, { data: prompt, agent:'user' }] ))
        sendMessage();
      }
    }
  };

  return (
    <div className="agent-input-container">
      <div className="agent-selection-container">
        <div className="input-container-main">
          <div className="input-container">
            <textarea
              disabled={isLoading}
              value={prompt}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
              placeholder={placeholder}
            ></textarea>
          </div>
          <div className="button-section">
            <ThemeButton
              leftIcon="enter"
              className="enter-btn"
              iconFill="var(--slate-400)"
              onClick={() => {
                sendMessage();
              }}
            />
          </div>
        </div>
      </div>
      <div className="message-container"></div>
    </div>
  );
}
