import React, { useState, useEffect } from 'react';
import { authenticationService } from '../../_services';
import { camelCaseToNormal } from '../../Utility/utility';
import '../Auth/auth.theme.scss';
import { toast } from 'react-hot-toast';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';
import Icon from '../../_icons/svgs/SolidIcons';
import PiggieStackName from '../BrandAndLogo/PiggieStackName';
import InputField from '../../_components/Form/inputField';
import SingleSelect from '../../_components/Form/SingleSelect';
import SolidButton from '../../_components/Buttons/SolidButton';
import { OCCUPATIONS } from './constants/auth.constant';
import { convertOccupationData } from './utils/utilityFunction';
import { useNavigate, useSearchParams } from 'react-router-dom';
import GoogleOAuthButton from './OAuth/GoogleOAuth';
import LinkedInOAuthButton from './OAuth/LinkedInOAuth';
import { Link } from 'react-router-dom';

function SignUp() {
  const [signUp, setSignUp] = useState({});
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [occupation, setOccupation] = useState(null);
  const occupationData = convertOccupationData(OCCUPATIONS);
  const [serverError, setError] = useState({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSignUp = () => {
    const body = {
      ...signUp,
      occupation: occupation?.value,
      sector: occupation?.sector,
    };
    setError({});
    authenticationService
      .signUp(body)
      .then((data) => {
        navigate('/otp-verify', {
          state: {
            phoneNumber: data?.phoneNumber,
            userId: data?.id,
          },
        });
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
        <Icon name="piggie-white" fill="#000b50" width="35" />
        <PiggieStackName firstColor="#F08788" secondColor="#000b50" size={25} />
      </div>
      <div className="intro-line">
        <div style={{ fontSize: '30px' }}>
          <span style={{ color: 'var(--ps-dark-blue)' }}>Sign Up & </span>
          <span style={{ color: 'var(--ps-pink)' }}>Evolve!</span>
        </div>
      </div>
      <span
        style={{
          color: 'var(--slate-800)',
          fontSize: '20px',
          fontWeight: '500',
        }}
      >
        Create a new account to
      </span>
      <div className="intro-line-2">
        <span style={{ color: 'var(--ps-dark-blue)' }}>
          Experience financial evolution{' '}
        </span>
        <span style={{ color: 'var(--ps-pink)' }}>
          using
          <span style={{ color: 'var(--ps-dark-blue)', fontWeight: 'bold' }}>
            {' '}
            AI{' '}
          </span>
          and
          <span style={{ color: 'var(--ps-dark-blue)', fontWeight: 'bold' }}>
            {' '}
            Automation{' '}
          </span>
        </span>
      </div>
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
            leftIcon="user-name"
            type="text"
            id="user-name-input"
            placeholder="User name"
            required={true}
            onChange={(value) => {
              setSignUp({ ...signUp, username: value });
            }}
            isError={!!serverError?.userName}
            value={signUp?.userName}
          />
          {serverError?.username && (
            <span className="error-label">{serverError?.username}</span>
          )}
        </div>
        <div className="input-container">
          <InputField
            type="phone"
            id="phone-input"
            required={true}
            height={'40'}
            inputProps={{
              name: 'Phone',
              required: true,
              autoFocus: false,
            }}
            isError={!!serverError?.phoneNumber}
            onChange={(value) => {
              setSignUp({ ...signUp, phoneNumber: value });
            }}
          />
          {serverError?.phoneNumber && (
            <span className="error-label">{serverError?.phoneNumber}</span>
          )}
        </div>
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
        {/* Need to change to date picker library */}
        <InputField
          type="date"
          id="dob"
          placeholder="DOB"
          required={true}
          onChange={(value) => {
            setSignUp({ ...signUp, dateOfBirth: value });
          }}
        />
        <SingleSelect
          isClearable={true}
          isSearchable={true}
          options={occupationData}
          grouped={true}
          defaultValue={occupationData[0][0]}
          onChange={(value) => {
            setOccupation(value);
          }}
        />
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
          <input type="checkbox" />
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
          bgColor={'var(--ps-pink)'}
          onClick={() => {
            console.log('Sign up is called');

            handleSignUp();
          }}
        >
          Sign up
        </SolidButton>
      </div>
      <div className="redirection-text">
        Already have a account? <Link style={{textDecoration: "underline"}} to="/signin">Sign In</Link>
      </div>
    </div>
  );
}

export default SignUp;
