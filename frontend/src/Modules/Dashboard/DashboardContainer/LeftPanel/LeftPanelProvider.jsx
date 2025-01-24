import React, { createContext, useState, useContext } from 'react';

const LeftPanelContext = createContext();

export const useLeftPanelContext = () => useContext(LeftPanelContext);

export const LeftPanelProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('saved-events');

  return (
    <LeftPanelContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </LeftPanelContext.Provider>
  );
};
