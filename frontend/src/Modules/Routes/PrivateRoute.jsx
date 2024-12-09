import React from 'react';
import { checkForSessionExist } from '../../Utility/authorization';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const sessionExist = checkForSessionExist();
  return sessionExist ? children : <Navigate to="/signup" />;
}
