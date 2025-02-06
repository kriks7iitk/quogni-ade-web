import React, { createContext, useState, useEffect, useContext } from 'react';
import { SocketProvider, useSocket } from './SocketProvider';
import { aiAgent } from '../../_services';

const AiUiContext = createContext();

function AiUiComponent({ children, onAgentResponse }) {  
    const [data, setData] = useState({
        leftSidePanelOpen:false
    });
    const [contextMemory, setContextMemory] = useState({});
    const [logs, setLogs] = useState([]);
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        // if (!socket) return;
    
        // socket.on("message", (response) => {
        //     setData((prevState) => ({ ...prevState, ...response }));
        //     onAgentResponse(response);
        //     setLogs((prevState) => [...prevState, response]);
        //     setContextMemory((prevState) => ({ ...prevState, ...response }));
        // });
    
        // return () => {
        //     socket.off("message");
        // };
    }, []);

    const sendMessage = () => {
        // if (!socket || !prompt.trim()) return;

        const body = {
            stateDescription:{
                leftSidePanelOpen:'This state define if left side menu panel is open or not'
            },
            currentRoute: 'dashboard',
            data,
            prompt,
        };

        aiAgent.sendToAgent(body)
        .then((response) => {
           console.log("response is");
            
           console.log(response);
           
        })
        .catch((error) => {
            console.error(error);
        })
    };

    return (
        <AiUiContext.Provider value={{ data, logs, setPrompt, sendMessage ,setData,setLogs,setContextMemory}}>
            {children}
        </AiUiContext.Provider>
    );
}

export function AiUiProvider({ children, onAgentResponse, agentUrl }) {
    return (
        <SocketProvider agentUrl={agentUrl}>
            <AiUiComponent onAgentResponse={onAgentResponse}>
                {children}
            </AiUiComponent>
        </SocketProvider>
    );
}

export const useAiUi = () => useContext(AiUiContext);
