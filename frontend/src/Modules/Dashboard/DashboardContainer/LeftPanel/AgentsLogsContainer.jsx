import React, { useState } from 'react';
import CardHeader from '../../../../_components/Containers/CardHeader';
import ThemeButton from '../../../../_components/Buttons/ThemeButton';

export default function AgentsLogsContainer({
  maximizeHeight,
  minimizeHeight,
}) {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized((prevState) => !prevState);
  };

  const maxMinButton = () => {
    return <ThemeButton leftIcon="minimize" />;
  };

  const styleContainer = { height: isMaximized ? '' : '' };
  return (
    <div
      className={`container-card agents-logs-container ${
        isMaximized ? 'maximized' : 'minimized'
      }`}
    >
      <CardHeader title="Agents logs" leftButton={maxMinButton()} />
      {/* <div className="controls">
        <button onClick={toggleMaximize}>
          {isMaximized ? 'Minimize' : 'Maximize'}
        </button>
      </div>
      <div className="content">AgentsLogsContainer</div> */}
    </div>
  );
}
