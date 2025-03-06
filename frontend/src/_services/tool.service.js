import { handleResponse } from '../Utility/responseHandler';
import { SERVER_HOST } from '.';
import { generateHeader } from '../Utility/authorization';


export const toolsService = {
  createTool
};

function createTool(body) {
  const requestPayload = {
    method: 'POST',
    headers: generateHeader(),
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/tools`, requestPayload).then(
    handleResponse,
  );
}

