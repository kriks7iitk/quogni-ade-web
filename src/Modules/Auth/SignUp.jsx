import React, { useState, useEffect } from 'react';
import { authroizationService } from '../../_services';
import { camelCaseToNormal } from '../../Utility/utility'
import '../Auth/auth.theme.scss'
import OtpVerify from './OtpVerify';
import { toast } from 'react-hot-toast';

function SignUp() {
  const [signUpData, setSignupData] = useState({
    username: '',
    phoneNumber: '',
    dateOfBirth: '',
    salarySlab: '',
    occupation: ''
  });
  const [showOtpInput, setShowOtpInput] = useState(false);
  // const [createdUser,setCreatedUser] = useState(null);
  // const [showSignInRedirection, setShowSignInRedirection] = useState(null);
  

  const handleSubmit = (e) => {
    e.preventDefault(); 
    authroizationService.signUp(signUpData)
      .then((res) => {
        console.log(res);
        setShowOtpInput(true);
      })
      .catch(({error}) => {
        if(error?.code=='um101'){
          toast.error(error?.error)
          // setShowSignInRedirection(true);
        }
      });
  };

  useEffect(() => {
    console.log("Logging signup data", signUpData);
  }, [signUpData]);

  return (
    <div>
      <div style={{ marginBottom: "10px" }} className='signup-modal'> {/* Fixed class name */}
        {showOtpInput ? <OtpVerify phoneNumber={signUpData?.phoneNumber} />  : <form onSubmit={handleSubmit}>
          {Object.keys(signUpData).map((key, index) => {
            return (
              <div className='field' key={index}>
                <div className='input-container'>
                  <div className='icon-container'></div>
                  <input
                    type={key === "dateOfBirth" ? "date" : "text"}
                    id={key} // Use `key` as a unique id
                    value={signUpData[key]}
                    onChange={(e) => setSignupData({
                      ...signUpData,
                      [key]: e.target.value,
                    })}
                    placeholder={camelCaseToNormal(key)}
                    style={{ padding: "5px" }}
                  />
                </div>
              </div>
            );
          })}
          {
            
          }
          <button className='signup-btn' type="submit" style={{ padding: "5px 10px" }}>Sign Up</button>
        </form>}
        
      </div>
    </div>
  );
}

export default SignUp;
