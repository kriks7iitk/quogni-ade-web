import { handleResponse } from '../Utility/responseHandler';
import { AI_SERVER_HOST } from '.';

export const toolService = {
    saveAgentDescription,
    toolTraining
};



function saveAgentDescription(body) {
    const requestPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return fetch(`${AI_SERVER_HOST}/statefullAgent/tool`, requestPayload).then(
        handleResponse,
      );
}

function toolTraining(body) {
    const requestPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return fetch(`${AI_SERVER_HOST}/statefullAgent/training`, requestPayload).then(
        handleResponse,
    );
}