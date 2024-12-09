import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../Utility/responseHandler';
import { SERVER_HOST } from '.';
import { generateHeader } from '../Utility/authorization';

const currentSessionSubject = new BehaviorSubject({
  user: null,
});

export const authenticationService = {
  signUp,
  sendOtp,
  authorize,
  resendOtp,
  currentSession: currentSessionSubject.asObservable(),
  get currentSessionValue() {
    return currentSessionSubject.value;
  },
  updateCurrentSession(data) {
    currentSessionSubject.next(data);
  },
  validateSession,
};

function validateSession() {
  const requestPayload = {
    method: 'GET',
    headers: generateHeader(),
  };
  return fetch(`${SERVER_HOST}/sessions/validate`, requestPayload).then(
    handleResponse,
  );
}

function signUp(body) {
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
}

function sendOtp(body) {
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
}

function authorize(body) {
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
}

function resendOtp(body) {
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
}
