import { handleResponse } from "../Utility/responseHandler";

export { signUp, sendOtp, authorize };



const signUp = (body) => {
  const requestPayload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
  }
  // eslint-disable-next-line no-undef
  return fetch(`${import.meta.env.VITE_SERVER_HOST}/auth/signup`, requestPayload).then(handleResponse);
}

const sendOtp = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
  return fetch(`${import.meta.env.VITE_SERVER_HOST}/auth/sendotp`, requestPayload).then(handleResponse);
}


const authorize = (body) => {
  const requestPayload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }
  return fetch(`${import.meta.env.VITE_SERVER_HOST}/auth/authroize`, requestPayload).then(handleResponse);
}
