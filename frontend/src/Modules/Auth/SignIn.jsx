import React, { useState, useEffect } from 'react';
import { authenticationService } from '../../_services';
import { camelCaseToNormal, camelToSnakeCase, addToSessionStorage } from '../../Utility/utility';
import '../Auth/auth.theme.scss';
import { toast } from 'react-hot-toast';
import InputField from '../../_components/Form/inputField';
import SolidButton from '../../_components/Buttons/SolidButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoogleOAuthLoginButton from './OAuth/GoogleOAuthLogin';
import LinkedInOAuthLoginButton from './OAuth/LinkedInOAuthLogin';
import LogoFullColoured from '../../_logo/LogoFullColoured';
import { authorize } from '../../Utility/authorization';

function SignIn() {
  const [signIn, setSignIn] = useState({});
  const navigate = useNavigate();
  const [serverError, setError] = useState({});
  const [appLoadingState, setAppLoadingState] = useState(false)

  const handleSignIn = () => {
    console.log("this is calling");
    
    if (!signIn?.email) {
      serverError['emain'] = 'Please enter the email';
      return;
    }
    const body = {
      ...camelToSnakeCase(signIn),
    };
    setAppLoadingState(true)
    authenticationService
      .login(body)
      .then((data) => {
        toast.success('Login successful');
        const jwtToken = data.token;
        addToSessionStorage('q-auth-token', jwtToken);
        authorize()
      })
      .catch(({ error }) => {
        if (error?.code === 'auth101') {
          const errorMessages = error?.meta?.target?.reduce((acc, item) => {
            acc[item] = `${camelCaseToNormal(item)} already exist`;
            return acc;
          }, {});
          setError({ ...errorMessages });
        }
        toast.error(error?.error);
      })
      .finally(() => {
        setAppLoadingState(false)
      });
      
  };

  return (
    <div className="sign-up-page">
      <div style={{ marginTop: '20%' }}>
        <div className="logo-title">
         <LogoFullColoured/>
        </div>
        <div className="intro-line">
          <div style={{ fontSize: '30px' }}>
            <span style={{ color: 'var(--gray-900)' }}>Make AI </span>
            <span style={{ color: 'var(--ps-pink)' }}>simpler</span>
          </div>
        </div>
        <div className="intro-line-2">
          <span style={{ color: 'var(--gray-900)' }}>Log in to </span>
          <span style={{ color: 'var(--ps-pink)' }}>
            power up your organization using
            <span style={{ color: 'var(--gray-900)', fontWeight: 'bold' }}>
              {' '}
              AI{' '}
            </span>
          </span>
        </div>
        <div className="sign-up-form">
          <div className="input-container">
            <InputField
              leftIcon="email"
              type="email"
              id="email"
              placeholder="Enter your email"
              required={true}
              onChange={(value) => {
                setSignIn({ ...signIn, email: value });
              }}
              isError={!!serverError?.email}
              value={signIn?.email}
            />
            {serverError?.phoneNumber && (
              <span className="error-label">{serverError?.phoneNumber}</span>
            )}
          </div>
          <div className="input-container">
            <InputField
              leftIcon="lock"
              type="text"
              id="password-input"
              placeholder="Password"
              required={true}
              onChange={(value) => {
                setSignIn({ ...signIn, password: value });
              }}
              value={signIn?.password}
            />
          </div>
        </div>
        <div class="or-divider">
          <span>Or</span>
        </div>

        <div className="oauth-buttons-container ">
              <GoogleOAuthLoginButton />
              <LinkedInOAuthLoginButton />
        </div>
        <div className="confirm-button">
          <SolidButton
            customClass="btn-class"
            bgColor={'var(--gray-900)'}
            onClick={() => {
              handleSignIn();
            }}
            color='var(--ps-white-1)'
          >
            Sign In
          </SolidButton>
        </div>
        <div className="redirection-text">
          New to{' '}
          <span style={{ color: 'var(--gray-900)', fontWeight: '500' }}>
            Piggie
          </span>
          <span style={{ color: 'var(--ps-pink)', fontWeight: '500' }}>
            Stack?{' '}
          </span>
          <span>
          {' '} <Link to="/sign-up" style={{textDecoration: "underline"}}>Sign Up</Link> {' '}
          </span>
          and Evolve your investment
        </div>
      </div>
    </div>
  );
}

export default SignIn;
