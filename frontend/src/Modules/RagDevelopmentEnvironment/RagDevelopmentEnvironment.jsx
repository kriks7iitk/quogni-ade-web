import React, { useEffect,useContext, createContext, useState } from 'react';
import './rag-development-environment.scss';
import LeftPanel from '../LeftPanel/LeftPanel';
import RightPanel from '../RightPanel/RightPanel';
import {AiUiProvider} from '../Ai-Ui/AiUiProvider';
import AgentSetting from '../ADE/AgentsSetting/AgentSetting';
export const RagEnvironmentContext = createContext();

export const useRagDevelopmentEnvironment = () => {
  return useContext(RagEnvironmentContext);
};

const RagEnvironmentProvider = ({ children }) => {
 
  const [messagesAi, setMessagesAi] = useState([]);
  const [tool, setTool] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [placeholder, setPlaceHolder] = useState('Ask anything using our quaogni AI')

  const handleAgentResponse = ({ response, prompt }) => {
   
  };

  useEffect(() => {
  }, [tool])
  

  return (
    <RagEnvironmentContext.Provider
      value={{
        messagesAi,
        setMessagesAi,
        isLoading,
        setIsLoading,
        placeholder, setPlaceHolder,
        tool, setTool,
        handleAgentResponse
      }}
    >
      {children}
    </RagEnvironmentContext.Provider>
  );
};

export function RagEnvironmentContainerUI() {
  const {tool, handleAgentResponse } = useRagDevelopmentEnvironment();
  return (
    <div className="dashboard-container">
      <AiUiProvider toolId={tool?.id} onAgentResponse={handleAgentResponse} >
        <LeftPanel>
        
        </LeftPanel>
        <RightPanel>

        </RightPanel>
      </AiUiProvider>
    </div>
  );
}

export default function RagEnvironmentContainer() {
  return (
    <RagEnvironmentProvider>
      <RagEnvironmentContainerUI />
    </RagEnvironmentProvider>
  );
}
