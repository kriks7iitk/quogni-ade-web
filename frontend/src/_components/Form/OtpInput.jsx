import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import './form.theme.scss';

export default function CustomOtp({ setOTP, otp }) {
  const [focused, setFocused] = useState(null);
  const CustomOtpInput = (props) => {
    return (
      <div>
        <input {...props} className="custom-otp-input" />
      </div>
    );
  };
  return (
    <div>
      <OtpInput
        value={otp}
        onChange={setOTP}
        numInputs={4}
        renderSeparator={<span style={{ width: '30px' }}></span>}
        renderInput={CustomOtpInput}
        inputStyle={{ width: '50px', height: '50px' }}
        skipDefaultStyles={true}
      />
    </div>
  );
}
