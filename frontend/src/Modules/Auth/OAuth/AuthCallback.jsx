import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomSkeleton from '../../Loaders/CustomSkeleton/CustomSkeleton';
import { oAuthService } from '../../../_services';
import { addToSessionStorage } from '../../../Utility/utility';

const AuthCallback = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const type = location.pathname.split('/')[3];  

  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const sendToBackend = async () => {
    try {
      const body = {
        code: code,
        type: type
      };
    const response = await oAuthService.sendCode(body);
    const jwtToken = response.accessToken;
    addToSessionStorage('token', jwtToken);
    
    setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  
  useEffect(async () => {
    if (code && type) {
      sendToBackend();
    }
  }, []);

  return (
    <div className="callback-container">
      {loading ? (
          <CustomSkeleton />
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="success-message">
          <h2>Login Successful!</h2>
          <p>Your access token has been stored successfully.</p>
        </div>
      )}
    </div>
  );
};

export default AuthCallback;
