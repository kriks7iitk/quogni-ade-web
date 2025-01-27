
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

// function fetchWithTimeout(url, options, timeout = 5000) {
//     return Promise.race([
//         fetch(url, options),
//         new Promise((_, reject) =>
//             setTimeout(() => reject(new Error('Request timed out')), timeout)
//         ),
//     ]);
// }

// // Example usage
// function getInsight(body) {
//     const requestPayload = {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     };

//     return fetchWithTimeout("http://localhost:8001/events/saved/", requestPayload, 10000) // 10-second timeout
//         .then(handleResponse)
//         .catch((error) => {
//             console.error('Error:', error.message);
//         });
// }
