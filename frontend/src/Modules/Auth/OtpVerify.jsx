import React, { useState, useEffect } from 'react';
import { authorizationService } from '../../_services';
import { addToSessionStorage, camelCaseToNormal } from '../../Utility/utility';
import '../Auth/auth.theme.scss';
import { toast } from 'react-hot-toast';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';
import Icon from '../../_icons/svgs/SolidIcons';
import PiggieStackName from '../BrandAndLogo/PiggieStackName';
import OtpInput from '../../_components/Form/OtpInput';
import SolidButton from '../../_components/Buttons/SolidButton';
import { useLocation } from 'react-router-dom';

function OtpVerify() {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const { phoneNumber, userId } = location.state || {};
  const [timer, setTimer] = useState(30);

  const handleOtpChange = (otpValue) => {
    if (otpValue?.length == 4) {
      setOtp(otpValue);
      authorizationService
        .authorize({ userId, otp: otpValue })
        .then((response) => {
          addToSessionStorage('token', response?.accessToken);
        });
      return;
    }
    setOtp(otpValue);
  };

  const resendOTP = () => {
    authorizationService
      .resendOtp({ phoneNumber, userId })
      .then((response) => {
        toast.success('OTP sent success');
      })
      .catch(() => {
        toast.error('Error occur in sending OTPß');
      });
  };

  return (
    <div className="otp-verify-container">
      <div className="logo-title">
        <Icon name="piggie-white" fill="#000b50" width="35" />
        <PiggieStackName firstColor="#F08788" secondColor="#000b50" size={25} />
      </div>

      <div className="otp-input-container">
        <span
          style={{
            fontSize: 'var(--ps-txt-xs)',
            width: 'inherit',
            padding: '20px',
          }}
        >
          Please enter the verification code send to your mobile number{' '}
          <b>{phoneNumber}</b>
        </span>
        <OtpInput setOTP={handleOtpChange} otp={otp} />
      </div>
      <div className="resend-otp">
        <span>Didn't receive OTP?</span>
        <span>Resend OTP in {} seconds</span>
      </div>
    </div>
  );
}

export default OtpVerify;
