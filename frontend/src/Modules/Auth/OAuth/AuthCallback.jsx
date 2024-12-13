import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CustomSkeleton from '../../Loaders/CustomSkeleton/CustomSkeleton';
import { oAuthService } from '../../../_services';
import { addToSessionStorage } from '../../../Utility/utility';
import toast from 'react-hot-toast';

const AuthCallback = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get('code');
  const { type } = useParams();  

  const sendToBackend = async () => {
      const body = {
        code: code,
        type: type.toUpperCase()
      };
    oAuthService.sendCode(body, true).then((response) => {
        const jwtToken = response.accessToken;
        addToSessionStorage('ps-auth-token', jwtToken);
        console.log(jwtToken)
        console.log(response.login)
        if (!response.login)
          navigate('/modal')
        navigate('/dashboard');
      }
    ).catch(({ error }) => {
      console.log(error);
      toast.error(error?.message);
      if (error?.code == 'auth109') {
        setTimeout(() => {
        navigate('/signin')
        }, 2000)
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
      <CustomSkeleton />
    </div>
  );
};

export default AuthCallback;
