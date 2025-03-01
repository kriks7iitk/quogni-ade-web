import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../Utility/responseHandler';
import { SERVER_HOST } from '.';
import { generateHeader } from '../Utility/authorization';

const currentSessionSubject = new BehaviorSubject({
  user: null,
});

export const authenticationService = {
  signUp,
  login,
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
  console.log("header is");
  console.log(generateHeader());
  
  
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
  return fetch(`${SERVER_HOST}/auth/register`, requestPayload).then(
    handleResponse,
  );
}


function login(body) {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${SERVER_HOST}/auth/login`, requestPayload).then(
    handleResponse,
  );
}
