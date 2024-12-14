import { handleResponse } from '../Utility/responseHandler';

export { sendCode, sendOAuthUserDetails };
import { SERVER_HOST } from '.';
import { getFromSessionStorage } from '../Utility/utility';

const sendCode = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  };
  return fetch(`${SERVER_HOST}/oauth/register`, requestPayload).then(
    handleResponse,
  );
};

const sendOAuthUserDetails = (body) => {
  const authToken = getFromSessionStorage('ps-auth-token');

  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`, 
    },
    body: JSON.stringify(body)
  };
  return fetch(`${SERVER_HOST}/oauth/update-user`, requestPayload).then(
    handleResponse,
  );
}



