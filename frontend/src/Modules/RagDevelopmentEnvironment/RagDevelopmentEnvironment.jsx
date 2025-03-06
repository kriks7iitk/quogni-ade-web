import React, { useEffect,useContext, createContext, useState } from 'react';
import './rag-development-environment.scss';
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';
import {AiUiProvider} from '../Ai-Ui/AiUiProvider';
import RagSetting from '../RDE/RagSetting/RagSetting';
export const EnvironmentContext = createContext();

export const useDevelopmentEnvironment = () => {
  return useContext(EnvironmentContext);
};

const EnvironmentProvider = ({ children }) => {
 
  const [messagesAi, setMessagesAi] = useState([]);
  const [tool, setTool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Ask anything using our quaogni AI')
  const [agentLogs, setAgentLogs] = useState([])
  const [responseCode, setResponseCode ] = useState({});

  const handleAgentResponse = ({ response, prompt }) => {
    setResponseCode({ prompt,response:response["state"]});
    setMessagesAi((messages) => ([...messages, { data: response["explanation"], agent: 'ai' }]))
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

export function RagEnvironmentContainerUI() {
  const {tool, handleAgentResponse } = useDevelopmentEnvironment();
  return (
    <div className="dashboard-container">
      <AiUiProvider toolId={tool?.id} onAgentResponse={handleAgentResponse} >
        <LeftPanel>
        <RagSetting/>
        </LeftPanel>
        <RightPanel>

        </RightPanel>
      </AiUiProvider>
    </div>
  );
}

export default function RagEnvironmentContainer() {
  return (
    <EnvironmentProvider>
      <RagEnvironmentContainerUI />
    </EnvironmentProvider>
  );
}
