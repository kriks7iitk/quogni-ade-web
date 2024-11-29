import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomSkeleton from '../../Loaders/CustomSkeleton/CustomSkeleton';
import { oAuthService } from '../../../_services';

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
      await oAuthService.sendCode(body);
      console.log('success');

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  
  useEffect(async () => {
    console.log(code)
    console.log(type)
    if (code && type) {
      setLoading(true)
      await sendToBackend();
      setLoading(false)
    }
  }, [code, type]);

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
