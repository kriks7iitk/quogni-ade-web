
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
    return fetch("http://13.202.100.162:8001/pdfAgent/pdfagent/", requestPayload).then(
        handleResponse,
    );
}
