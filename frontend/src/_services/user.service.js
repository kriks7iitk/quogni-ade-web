import { handleResponse } from '../Utility/responseHandler';
import { SERVER_HOST } from '.';
import { generateHeader } from '../Utility/authorization';

export const userService = {
  updateUserDetails,
};

function updateUserDetails(body) {
  const requestPayload = {
    method: 'PUT',
    headers: generateHeader(),
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/user/update`, requestPayload).then(
    handleResponse,
  );
}
