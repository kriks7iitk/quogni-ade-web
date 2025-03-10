import { handleResponse } from '../Utility/responseHandler';
import { SERVER_HOST } from '.';
import { generateHeader } from '../Utility/authorization';


export const agentsService = {
  createAgent,
  getAgent
};

function createAgent(body) {
  const requestPayload = {
    method: 'POST',
    headers: generateHeader(),
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/agents`, requestPayload).then(
    handleResponse,
  );
}

function getAgent(id) {
  const requestPayload = {
    method: 'GET',
    headers: generateHeader(),
  };
  return fetch(`${SERVER_HOST}/agents/${id}`, requestPayload).then(
    handleResponse,
  );
}

