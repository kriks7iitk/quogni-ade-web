import React from 'react';
import '../ai-board.theme.scss';
import Markdown from 'react-markdown';

export default function UserPrompt({ message, type, agent }) {

  var classNames =""
  
  if (agent == 'user') {
    classNames = "user-prompt"
  }
  else if (agent == 'ai')
  {
    classNames = "ai-explanation"
  }
  else
  {
    classNames = "aiTrainer-explanation" 
  }
  return (
    <div
      className={classNames}
      style={
        type === 'prompt' ? { marginLeft: 'auto' } : { marginRight: 'auto' }
      }
    >
      {message}
    </div>
  );
}
