import React from 'react';
import SolidButton from '../../../_components/Buttons/SolidButton';

const clientId = '862eqspemtvr0p';  
const redirectUri = 'http://localhost:8082/oauth/callback/linkedin&mode=signup'; 

const LinkedInOAuthButton = () => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20email%20profile`;

  const handleLogin = () => {
    window.location.href = authUrl;
  };

  return (
    <>
        <SolidButton
          leftIcon="linkedin"
          iconFill="#ffffff"
          hoverIconFill="#ffffff"
          customClass="auth-btn"
          onClick={() => handleLogin()}
        >
          Login with LinkedIn
        </SolidButton>
    </>
  );
};

export default LinkedInOAuthButton;
