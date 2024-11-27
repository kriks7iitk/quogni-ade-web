import { handleResponse } from '../Utility/responseHandler';

export { signUp, sendOtp, authorize, getOccupations };
import { SERVER_HOST } from '.';

const getOccupations = () => {
  const requestPayload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return fetch(`${SERVER_HOST}/auth/occupation`, requestPayload).then(
    handleResponse,
  );
};

const signUp = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/auth/signup`, requestPayload).then(
    handleResponse,
  );
};

const sendOtp = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/auth/send-otp`, requestPayload).then(
    handleResponse,
  );
};

const authorize = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(
    `${import.meta.env.VITE_SERVER_HOST}/auth/authroize`,
    requestPayload,
  ).then(handleResponse);
};
