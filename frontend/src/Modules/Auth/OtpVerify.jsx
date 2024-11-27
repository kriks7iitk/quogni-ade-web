import React, { useState, useEffect } from 'react';
import { authorizationService } from '../../_services';
import { camelCaseToNormal } from '../../Utility/utility';
import '../Auth/auth.theme.scss';
import OtpVerify from './OtpVerify';
import { toast } from 'react-hot-toast';
import SolidThemeIcon from '../../_icons/svgs/SolidThemeIcons';
import Icon from '../../_icons/svgs/SolidIcons';
import PiggieStackName from '../BrandAndLogo/PiggieStackName';
import InputField from '../../_components/Form/inputField';
import SingleSelect from '../../_components/Form/SingleSelect';
import SolidButton from '../../_components/Buttons/SolidButton';
import { OCCUPATIONS } from './constants/auth.constant';
import { convertOccupationData } from './utils/utilityFunction';

function OtpVerify({ phoneNumber }) {
  const [otpData, setOTPData] = useState({});

  // const handleSignIn = () => {
  //   authorizationService.sendOtp(signIn).then((data) => {
  //     console.log('printing data');
  //     console.log(data);
  //     //redirect to otp verification route of application
  //   });
  // };

  return <div className="sign-up-page"></div>;
}

export default OtpVerify;
