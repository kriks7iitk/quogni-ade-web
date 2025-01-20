import React, { useState } from 'react';
import CardHeader from './CardHeader';
import ThemeButton from '../Buttons/ThemeButton';
import './container.theme.scss'

export default function ResizableContainer({
    maximizeHeightInPercentage = 25,
    minimizeHeight = 40,
    allowResizeButton = true,
    leftButton,
    customClass,
    children,
    title
  }) {
    const [isMaximized, setIsMaximized] = useState(false);
  
    const toggleMaximize = () => {
      setIsMaximized((prevState) => !prevState);
    };
  
    const maxMinButton = () => {
      return <ThemeButton leftIcon={isMaximized ?  'maximize' : "minimize"} onClick={toggleMaximize} />;
    };
  
    const styleContainer = { height: isMaximized ? `${maximizeHeightInPercentage}%` : `${minimizeHeight}px` };
    return (
      <div
        className={`container-card ${customClass}`}
        style={styleContainer}
      >
        <CardHeader title={title} leftButton={allowResizeButton ? maxMinButton() : leftButton} />
        <div className='container-content'>{isMaximized && children}</div>
      </div>
      
    );
  }
