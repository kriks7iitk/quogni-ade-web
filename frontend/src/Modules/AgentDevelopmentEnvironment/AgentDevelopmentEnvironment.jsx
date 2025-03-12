import React, { useEffect,useContext, createContext, useState } from 'react';
import './dashboard-container.theme.scss';
import AIBoard from '../AIBoard/AIBoard';
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';
import { AiUiProvider } from '../Ai-Ui/AiUiProvider';
import AgentSetting from '../ADE/AgentsSetting/AgentSetting';
import AgentTraining from '../ADE/AgentTraining/AgentTraining';
import { agentsService } from '@/_services';
import { useParams } from "react-router-dom";

export const AgentDevelopmentEnvironmentContext = createContext();

export const useAgentDevelopmentEnvironment = () => {
  return useContext(AgentDevelopmentEnvironmentContext);
};

const ADEProvider = ({ children }) => {

  const { agentId } = useParams();
 
  const [messagesAi, setMessagesAi] = useState([]);
  const [agent, setAgent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Ask anything using our piggiestack AI')
  const [responseCode, setResponseCode ] = useState({});

  const handleAgentResponse = ({ response, prompt }) => {
    setResponseCode({ prompt,response:response["state"]});
    setMessagesAi((messages) => ([...messages, { data: response["explanation"], agent: 'ai' }]))
  };

  const fetchAgent = () => {
    agentsService.getAgent(agentId)
      .then((response) => {
        setAgent(response)
    })
  }

  useEffect(() => {
    fetchAgent()
  }, [agentId])
  

  return (
    <AgentDevelopmentEnvironmentContext.Provider
      value={{
        messagesAi,
        setMessagesAi,
        isLoading,
        setIsLoading,
        placeholder, setPlaceHolder,
        agent, setAgent,
        responseCode, setResponseCode,
        handleAgentResponse
      }}
    >
      {children}
    </AgentDevelopmentEnvironmentContext.Provider>
  );
};

export function AgentDevelopmentEnvironmentContainerUI() {
  const {tool, handleAgentResponse } = useAgentDevelopmentEnvironment();
  return (
    <div className="dashboard-container">
      <AiUiProvider>
        <LeftPanel>
          <AgentSetting />
        </LeftPanel>
        <AIBoard parentContext={AgentDevelopmentEnvironmentContext}/>
        <RightPanel>
          <AgentTraining/> 
        </RightPanel>
      </AiUiProvider>
    </div>
  );
}

export default function AgentDevelopmentEnvironment() {
  return (
    <ADEProvider>
      <AgentDevelopmentEnvironmentContainerUI />
    </ADEProvider>
  );
}
