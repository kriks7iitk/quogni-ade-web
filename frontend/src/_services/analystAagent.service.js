
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
    return fetch("http://qunatlb-d0d36c677e4e4fcd.elb.ap-south-1.amazonaws.com/screener/screens/", requestPayload).then(
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
    return fetch("http://qunatlb-d0d36c677e4e4fcd.elb.ap-south-1.amazonaws.com/screener/chat/", requestPayload).then(
        handleResponse,
    );
}
