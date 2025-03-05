import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomSkeleton from '../../Loaders/CustomSkeleton/CustomSkeleton';
// import { oAuthService } from '../../../_services';
import { addToSessionStorage } from '../../../Utility/utility';
import toast from 'react-hot-toast';
import Loader from '../utils/Loader';

const AuthCallback = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const { type } = useParams();
  const mode = queryParams.get('mode');
  useEffect(() => {
    const sendToBackend = async () => {
      try {
        const isLogin = async () => {
          if (mode === 'login') {
            return true;
          } else {
            return false;
          }
        };

        const body = {
          code: code,
          type: type.toUpperCase(),
          login: await isLogin(mode),
        };

        // const response = await oAuthService.sendCode(body);
        // const jwtToken = response.accessToken;
        addToSessionStorage('q-auth-token', jwtToken);
        window.location.href = '/workspace/tools';
      } catch ({ error }) {
        toast.error(error?.message);
        if (error?.code === 'auth109') {
          setTimeout(() => {
            navigate('/signin');
          }, 2000);
        }
      }
    };

    if (code && type) {
      sendToBackend();
    }
  }, [code, type, navigate]);

  return (
    <div className="callback-container">
      <Loader />
    </div>
  );
};

export default AuthCallback;
