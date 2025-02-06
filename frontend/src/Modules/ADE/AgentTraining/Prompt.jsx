import React, { useState } from 'react'

const Prompt = ({ prompt }) => {
  const [editablePrompt, setEditablePrompt] = useState(prompt);

  const handleChange = (event) => {
    setEditablePrompt(event.target.value);
  };

  return (
    <input 
      type="text" 
      value={editablePrompt} 
      onChange={handleChange} 
    />
  );
}

export default Prompt