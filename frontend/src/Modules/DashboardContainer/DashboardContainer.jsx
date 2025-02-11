import React, { useEffect,useContext, createContext, useState } from 'react';
import './dashboard-container.theme.scss';
import AIBoard from '../AIBoard/AIBoard';
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';
import { AiUiProvider } from '../Ai-Ui/AiUiProvider';

export const DashboardContext = createContext();

export const useDashboard = () => {
  return useContext(DashboardContext);
};

const DashboardProvider = ({ children }) => {
 
  const [messagesAi, setMessagesAi] = useState([]);
  const [tool, setTool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Ask anything using our piggiestack AI')
  const [agentLogs, setAgentLogs] = useState([])
  const [responseCode, setResponseCode ] = useState({});

  const handleAgentResponse = (response) => {
    setResponseCode(response);
  };

  useEffect(() => {
    console.log("prinitng tool");
    console.log(tool);
    
  
    
  }, [tool])
  

  return (
    <DashboardContext.Provider
      value={{
        messagesAi,
        setMessagesAi,
        isLoading,
        setIsLoading,
        placeholder, setPlaceHolder,
        agentLogs, setAgentLogs,
        tool, setTool,
        responseCode, setResponseCode,
        handleAgentResponse
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export function DashboardContainerUI() {
  const {tool, handleAgentResponse } = useDashboard();
  return (
    <div className="dashboard-container">
      <AiUiProvider toolId={tool?.id} onAgentResponse={handleAgentResponse} >
        <LeftPanel/>
        <AIBoard />
        <RightPanel/>
      </AiUiProvider>
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
