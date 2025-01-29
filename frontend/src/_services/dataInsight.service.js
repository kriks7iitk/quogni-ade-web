
import { handleResponse } from '../Utility/responseHandler';

export const dataInsight = {
    getInsight,
};

function getInsight(body) {
    const requestPayload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    };
    return fetch("http://qunatlb-d0d36c677e4e4fcd.elb.ap-south-1.amazonaws.com/pdfAgent/pdfagent/", requestPayload).then(
        handleResponse,
    );
}
