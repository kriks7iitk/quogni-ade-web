import React from 'react';
import '../ai-board.theme.scss';
import Markdown from 'react-markdown';

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
