import { handleResponse } from '../Utility/responseHandler';
import { AI_SERVER_HOST } from '.';

export const aiAgent = {
    sendToAgent
};

function sendToAgent(body) {
    const requestPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return fetch(`${AI_SERVER_HOST}/statefullAgent/agent`, requestPayload).then(
        handleResponse,
      );
}



