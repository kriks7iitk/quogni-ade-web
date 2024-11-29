import { handleResponse } from '../Utility/responseHandler';

export { sendCode };
import { SERVER_HOST } from '.';

const sendCode = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };
  return fetch(`http://localhost:3000/oauth/register`, requestPayload).then(
    handleResponse,
  );
};



