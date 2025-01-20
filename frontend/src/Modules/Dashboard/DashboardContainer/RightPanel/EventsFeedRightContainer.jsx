import React, { useState } from 'react';

export default function EventsFeedRightContainer() {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized((prevState) => !prevState);
  };

  return (
    <div
      className={`container-card event-feeds-right ${
        isMaximized ? 'maximized' : 'minimized'
      }`}
    >
      <div className="controls ">
        <button onClick={toggleMaximize}>
          {isMaximized ? 'Minimize' : 'Maximize'}
        </button>
      </div>
      EventsFeedRightContainer
    </div>
  );
}
