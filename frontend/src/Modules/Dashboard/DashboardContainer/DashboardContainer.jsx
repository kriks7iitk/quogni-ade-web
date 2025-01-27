import React, { useContext, createContext, useState } from 'react';
import './dashboard-container.theme.scss';
import EventsFeedContainer from './EventsFeedContainer/EventsFeedContainer';
import AIBoard from './AIBoard/AIBoard';
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';

export const DashboardContext = createContext();

export const useDashboard = () => {
  return useContext(DashboardContext);
};

const DashboardProvider = ({ children }) => {
  const [aiMode, setAiMode] = useState(false);
  const [eventsData, setEventsData] = useState([]);
  const [messagesAi, setMessagesAi] = useState([]);
  const [maximizeAgentLogs, setMaximizeAgentLogs] = useState(false);
  const [maximizeEventsRightContainer, setMaximizeEventsRightContainer] =
    useState(false);

  const toggleAgentsContainer = () => {
    setMaximizeAgentLogs((prevState) => !prevState);
  };

  const [currentActiveAgent, setCurrentActiveAgent] = useState([]);

  const toggleEventsRightContainer = () => {
    
    setMaximizeEventsRightContainer((prevState) => !prevState);
  };

  return (
    <DashboardContext.Provider
      value={{
        aiMode,
        setAiMode,
        eventsData,
        messagesAi,
        setMessagesAi,
        maximizeAgentLogs,
        maximizeEventsRightContainer,
        toggleAgentsContainer,
        toggleEventsRightContainer,
        setMaximizeAgentLogs,
        setMaximizeEventsRightContainer,
        currentActiveAgent,
        setCurrentActiveAgent,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function DashboardContainerUI() {

  return (
    <div className="dashboard-container">
      <LeftPanel />
      <AIBoard />
      <RightPanel />
    </div>
  );
}

export default function DashboardContainer() {
  return (
    <DashboardProvider>
      <DashboardContainerUI />
    </DashboardProvider>
  );
}
