import { handleResponse } from '../Utility/responseHandler';
import { SERVER_HOST } from '.';
import { generateHeader } from '../Utility/authorization';

export const oAuthService = {
  sendCode,
  updateUserDetails,
};

function sendCode(body) {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/oauth/register`, requestPayload).then(
    handleResponse,
  );
}

function updateUserDetails(body) {
  const requestPayload = {
    method: 'PUT',
    headers: generateHeader(),
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/oauth/update`, requestPayload).then(
    handleResponse,
  );
}
