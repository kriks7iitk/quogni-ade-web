import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomSkeleton from '../../Loaders/CustomSkeleton/CustomSkeleton';
import { oAuthService } from '../../../_services';
import { addToSessionStorage } from '../../../Utility/utility';
import toast from 'react-hot-toast';

const AuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const { type } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendToBackend = () => {
    const body = {
      code: code,
      type: type.toUpperCase(),
    };
    oAuthService
      .sendCode(body)
      .then((response) => {
        const jwtToken = response.accessToken;
        addToSessionStorage('ps-auth-token', jwtToken);
        navigate('/dashboard');
      })
      .catch(({ error }) => {
        console.log(error);
        toast.error(error?.message);
        if (error?.code == 'auth109') {
          setTimeout(() => {
            navigate('/signin');
          }, 2000);
        }
      });

    setLoading(false);
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
