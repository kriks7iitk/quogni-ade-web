import React from 'react';
import '../ai-board.theme.scss';

export default function UserPrompt({ message, type }) {
  return (
    <div
      className="user-prompt"
      style={
        type === 'prompt' ? { marginLeft: 'auto' } : { marginRight: 'auto' }
      }
    >
      {message}
    </div>
  );
}
