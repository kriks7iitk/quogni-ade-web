import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const OtpVerify = ({ phoneNumber, onSubmitOTP }) => {
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = () => {
    if (otp.length === 0) {
      alert('Please enter OTP');
      return;
    }
    onSubmitOTP({otp:otp,phoneNumber:phoneNumber}); // Call the function passed via props
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', width: '300px' }}>
      <h3>Phone Number: {phoneNumber}</h3>
      <div>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          maxLength="6" // Assuming OTP is up to 6 digits
        />
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Verify OTP
      </button>
    </div>
  );
};

// Define prop types
OtpVerify.propTypes = {
  phoneNumber: PropTypes.string.isRequired, // Ensure phoneNumber is a string and required
  onSubmitOTP: PropTypes.func.isRequired,   // Ensure onSubmitOTP is a function and required
};

export default OtpVerify;
