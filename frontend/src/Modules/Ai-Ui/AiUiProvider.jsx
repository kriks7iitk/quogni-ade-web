import React, { createContext, useState, useEffect, useContext } from 'react';
import { SocketProvider, useSocket } from './SocketProvider';
import { aiAgent } from '../../_services';
import { useDevelopmentEnvironment } from '../DevelopmentEnvironment/DevelopmentEnvironment';

const AiUiContext = createContext();

function AiUiComponent({ children, toolId, onAgentResponse }) {  
    const [data, setData] = useState();
    const [prompt, setPrompt] = useState('');
    const { setMessagesAi } = useDevelopmentEnvironment();

    useEffect(() => {
    }, []);

    const sendMessage = () => {
        const body = {
            prompt,
            tool_id:toolId
        };

        aiAgent.sendToAgent(body)
            .then((response) => {
                console.log("response is");
                console.log(response);
                onAgentResponse({ response:response["state"], prompt })
                setMessagesAi((messages) => ([...messages, { data: response["explanation"], agent: 'ai' }]))
                setPrompt('');
        })
        .catch((error) => {
            console.error(error);
        })
    };

    return (
        <AiUiContext.Provider value={{ data, setPrompt, sendMessage, setData, prompt }}>
            {children}
        </AiUiContext.Provider>
    );
}

export function AiUiProvider({ children, onAgentResponse, agentUrl, toolId }) {
    return (
        <SocketProvider agentUrl={agentUrl}>
            <AiUiComponent onAgentResponse={onAgentResponse} toolId={toolId}>
                {children}
            </AiUiComponent>
        </SocketProvider>
    );
}

export const useAiUi = () => useContext(AiUiContext);
