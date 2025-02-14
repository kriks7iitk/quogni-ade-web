import React, { createContext, useState, useContext } from 'react';
import './left-panel.theme.scss';

const LeftPanelContext = createContext();

export const useLeftPanel = () => useContext(LeftPanelContext);

export const LeftPanelProvider = ({ children }) => {

  const [activeTab, setActiveTab] = useState(null)

  return (
    <LeftPanelContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </LeftPanelContext.Provider>
  );
};

export default function LeftPanel({ children, width }) {
  return (
    <LeftPanelProvider>
      <div className="left-panel" style={ {maxWidth:`${width}%` , minWidth:`${width}%` }}>
        <div className="left-panel-main">
          <div className="container-card left-panel-container">
            { children }
          </div>
        </div>
      </div>
    </LeftPanelProvider>
  );
}