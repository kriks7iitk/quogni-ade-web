import { AI_SERVER_HOST } from ".";
import { handleResponse } from '../Utility/responseHandler';

export const eventAgentService = {
    getEvents
};


function getEvents(page) {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${AI_SERVER_HOST}/events?page=${page}`, requestPayload).then(
    handleResponse,
  );
}