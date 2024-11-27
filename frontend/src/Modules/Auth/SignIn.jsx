import React, { useState, useEffect } from 'react';
import { authorizationService } from '../../_services';
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

function SignIn() {
  const [signIn, setSignIn] = useState({});

  const handleSignIn = () => {
    authorizationService.sendOtp(signIn).then((data) => {
      console.log('printing data');
      console.log(data);
      //redirect to otp verification route of application
    });
  };

  useEffect(() => {}, []);

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
              onChange={(value) => {
                setSignIn({ ...signIn, phoneNumber: value });
              }}
            />
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
            Login
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
            <a
              style={{
                color: 'var(--ps-pink)',
                fontWeight: '400',
                textDecoration: 'underline',
              }}
              href=""
            >
              Sign up{' '}
            </a>
          </span>
          and Evolve your investment
        </div>
      </div>
    </div>
  );
}

export default SignIn;
