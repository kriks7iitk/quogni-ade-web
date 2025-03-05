import React, { useState, useEffect } from 'react';
import { authenticationService } from '../../_services';
import { camelCaseToNormal, camelToSnakeCase } from '../../Utility/utility';
import '../Auth/auth.theme.scss';
import { toast } from 'react-hot-toast';
import InputField from '../../_components/Form/inputField';
import SolidButton from '../../_components/Buttons/SolidButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GoogleOAuthButton from './OAuth/GoogleOAuth';
import LinkedInOAuthButton from './OAuth/LinkedInOAuth';
import { Link } from 'react-router-dom';
import LogoFullColoured from '../../_logo/LogoFullColoured';

function SignUp() {
  const [signUp, setSignUp] = useState({});
  const [serverError, setError] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSignUp = () => {
    const body = {
      ...camelToSnakeCase(signUp),
    };
    setError({});
    authenticationService
      .signUp(body)
      .then(() => {
        toast.success('Account created successfully');
        navigate('/sign-in');
      })
      .catch(({ error }) => {
        if (error?.code === 'um101') {
          const errorMessages = error?.meta?.target?.reduce((acc, item) => {
            acc[item] = `${camelCaseToNormal(item)} already exist`;
            return acc;
          }, {});
          setError({ ...errorMessages });
        }
        toast.error(error?.error);
      });
  };

  useEffect(() => {
    const toastMessage = searchParams.get('toastMessage');
    if (toastMessage) {
      toast.error(decodeURIComponent(toastMessage));
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('toastMessage');
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${newParams.toString()}`,
      );
    }
  }, [searchParams]);

  return (
    <div className="sign-up-page">
      <div className="logo-title">
        <LogoFullColoured/>
      </div>
      <span
        style={{
          color: 'var(--slate-800)',
          fontSize: '20px',
          fontWeight: '500',
        }}
      >
        Create a new account
      </span>
      {/* <div className="intro-line-2">
        <span style={{ color: 'var(--gray-900)' }}>
          Make AI adoption seamless{' '}
        </span>
        <span style={{ color: 'var(--ps-pink)' }}>
          using
          <span style={{ color: 'var(--gray-900)', fontWeight: 'bold' }}>
            {' '}
            Agentic development Eviromnemnt{' '}
          </span>
        </span>
      </div> */}
      <div className="sign-up-form">
        <InputField
          leftIcon="user"
          type="text"
          id="user-input"
          placeholder="Full name"
          required={true}
          onChange={(value) => {
            setSignUp({ ...signUp, fullName: value });
          }}
          value={signUp?.fullName}
        />
        <div className="input-container">
          <InputField
            leftIcon="email"
            type="email"
            id="email"
            placeholder="Enter your email"
            required={true}
            onChange={(value) => {
              setSignUp({ ...signUp, email: value });
            }}
            isError={!!serverError?.email}
            value={signUp?.email}
          />
          {serverError?.email && (
            <span className="error-label">{serverError?.email}</span>
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
              setSignUp({ ...signUp, password: value });
            }}
            value={signUp?.password}
          />
        </div>
      </div>
      <div class="or-divider">
        <span>Or</span>
      </div>

      <div className="oauth-buttons-container ">
        <GoogleOAuthButton />
        <LinkedInOAuthButton />
      </div>
      <div className="confirm-button">
        <div className="term-container">
          <input type="checkbox"  onChange={()=> {
            setSignUp(prevState => ({
              ...prevState,
              agreeTC: !prevState.agreeTC
            }))
            }} 
            value={signUp?.agreeTC}/>
          <span>
            I agree to{' '}
            <u>
              <b>term and policy</b>
            </u>
          </span>
        </div>
        <SolidButton
          customClass="btn-class"
          borderColor="none"
          bgColor={'var(--gray-900)'}
          onClick={() => {
            handleSignUp();
          }}
          color='var(--ps-white-1)'
        >
          Sign up
        </SolidButton>
      </div>
      <div className="redirection-text">
        Already have a account?{' '}
        <Link style={{ textDecoration: 'underline' }} to="/sign-in">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
