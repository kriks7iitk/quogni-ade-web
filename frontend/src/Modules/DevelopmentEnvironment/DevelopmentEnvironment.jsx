import React, { useEffect,useContext, createContext, useState } from 'react';
import './dashboard-container.theme.scss';
import AIBoard from '../AIBoard/AIBoard';
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';
import { AiUiProvider } from '../Ai-Ui/AiUiProvider';

export const EnvironmentContext = createContext();

export const useDevelopmentEnvironment = () => {
  return useContext(EnvironmentContext);
};

const EnvironmentProvider = ({ children }) => {
 
  const [messagesAi, setMessagesAi] = useState([]);
  const [tool, setTool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Ask anything using our piggiestack AI')
  const [agentLogs, setAgentLogs] = useState([])
  const [responseCode, setResponseCode ] = useState({});

  const handleAgentResponse = ({ response, prompt }) => {
    setResponseCode({ prompt,response });
  };

  useEffect(() => {
  }, [tool])
  

  return (
    <EnvironmentContext.Provider
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
    </EnvironmentContext.Provider>
  );
};

export function EnvironmentContainerUI() {
  const {tool, handleAgentResponse } = useDevelopmentEnvironment();
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

export default function EnvironmentContainer() {
  return (
    <EnvironmentProvider>
      <EnvironmentContainerUI />
    </EnvironmentProvider>
  );
}
