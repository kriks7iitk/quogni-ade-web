import React, { useState } from 'react'

const Prompt = ({ prompt }) => {
  const style = {
    border: '1px solid #ccc',
    padding: '5px',
    backgroundColor: '#f9f9f9',
    borderRadius: '5px',
    margin: '2px 0'
  };

  return (
      <div style={style}>
          {
              prompt
          }
        </div>
  );
}

export default Prompt