import React from 'react';
import '../ai-board.theme.scss';

export default function UserPrompt({ message }) {
  return <div className="user-prompt">{message}</div>;
}
