import { handleResponse } from '../Utility/responseHandler';
import { SERVER_HOST } from '.';

export { signUp, sendOtp, authorize, getOccupations, resendOtp };

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
  return fetch(`${SERVER_HOST}/auth/authorize`, requestPayload).then(
    handleResponse,
  );
};

const resendOtp = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/auth/resend-otp`, requestPayload).then(
    handleResponse,
  );
};
