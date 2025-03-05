import React from "react";
import './AiTyping.scss'

const AiTyping = () => {
    return (
        <div className="typing-indicator">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <span className="text">Agent Typing...</span>
        </div>
    );
};

export default AiTyping;
