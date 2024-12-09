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
import { Link } from 'react-router-dom';

function SignIn() {
  const [signIn, setSignIn] = useState({});
  const navigate = useNavigate();
  const [serverError, setError] = useState({});
  const [searchParams] = useSearchParams();

  const handleSignIn = () => {
    if (!signIn?.phoneNumber) {
      serverError['phoneNumber'] = 'Please enter the phone number';
      return;
    }
    authenticationService
      .sendOtp(signIn)
      .then((data) => {
        navigate('/otp-verify', {
          state: {
            phoneNumber: data?.phoneNumber,
            userId: data?.id,
          },
        });
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
      <div style={{ marginTop: '20%' }}>
        <div className="logo-title">
          <Icon name="piggie-white" fill="#000b50" width="35" />
          <PiggieStackName
            firstColor="#F08788"
            secondColor="#000b50"
            size={25}
          />
        </div>
        <div className="intro-line">
          <div style={{ fontSize: '30px' }}>
            <span style={{ color: 'var(--ps-dark-blue)' }}>Stack </span>
            <span style={{ color: 'var(--ps-pink)' }}>Smarter</span>
          </div>
        </div>
        <div className="intro-line-2">
          <span style={{ color: 'var(--ps-dark-blue)' }}>Log in to </span>
          <span style={{ color: 'var(--ps-pink)' }}>
            power up your portfolio using
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
          <div>
            <span
              style={{
                fontSize: '12px',
                marginBottom: '8px',
                fontWeight: '500',
                color: 'var(--ps-dark-blue)',
              }}
            >
              Phone number
            </span>
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
                  setSignIn({ ...signIn, phoneNumber: value });
                }}
              />
              {serverError?.phoneNumber && (
                <span className="error-label">{serverError?.phoneNumber}</span>
              )}
            </div>
          </div>
        </div>
        <div class="or-divider">
          <span>Or</span>
        </div>

        <div className="oauth-buttons-container ">
          <SolidButton
            leftIcon="google"
            iconFill="#ffffff"
            hoverIconFill="#ffffff"
            customClass="auth-btn"
          >
            Login with Google
          </SolidButton>
          <SolidButton
            leftIcon="linkedin"
            iconFill="#ffffff"
            hoverIconFill="#ffffff"
            customClass="auth-btn"
          >
            Login with LinkedIn
          </SolidButton>
        </div>
        <div className="confirm-button">
          <SolidButton
            customClass="btn-class"
            borderColor="none"
            bgColor={'var(--ps-pink)'}
            onClick={() => {
              handleSignIn();
            }}
          >
            Send OTP
          </SolidButton>
        </div>
        <div className="redirection-text">
          New to{' '}
          <span style={{ color: 'var(--ps-dark-blue)', fontWeight: '500' }}>
            Piggie
          </span>
          <span style={{ color: 'var(--ps-pink)', fontWeight: '500' }}>
            Stack?{' '}
          </span>
          <span>
          {' '} <Link to="/signup" style={{textDecoration: "underline"}}>Sign Up</Link> {' '}
          </span>
          and Evolve your investment
        </div>
      </div>
    </div>
  );
}

export default SignIn;
