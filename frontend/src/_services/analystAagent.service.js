
import { handleResponse } from '../Utility/responseHandler';

export const screenerAgent = {
    getScreener,
    getScreenerChat,
};

function getScreener(body) {
    const requestPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return fetch("http://13.202.100.162:8001/screener/screens/", requestPayload).then(
        handleResponse,
    );
}

function getScreenerChat(body) {
    const requestPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return fetch("http://13.202.100.162:8001/screener/chat/", requestPayload).then(
        handleResponse,
    );
}
