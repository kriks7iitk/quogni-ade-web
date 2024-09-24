import React, {useState, useEffect} from 'react';
import { authroizationService } from '../../_services';
import { camelCaseToNormal } from '../../Utility/utility';
import '../Auth/auth.theme.scss'


function SignIn() {
  const [signInData ,setSignInData] = useState({phoneNumber:''});
  const [otp, setOtp] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  
  const handleSubmit = () => {
    authroizationService.signUp(signInData)
    .then((res) => {
      console.log(res);
      setShowOtpInput(true)
    })
  }

//   const handleSubmitOtp = () => {
     
//   }
  useEffect(() => {
  }, [])
  
  


  return (
    <div>
      <div style={{ marginBottom: "10px" }} className='singup-modal'>
        <form onSubmit={handleSubmit} >
          {
            Object.keys(signInData).map((key,index) => {
              return (
              <div className='field' key={index}>
                <div className='input-container'>
                  <div className='icon-container'></div>
                  <input
                    type="text"
                    id="mobile"
                    value={signInData[key]}
                    onChange={(e) => setSignInData({
                      ...signInData,
                      [key]:e.target.value,
                    })}
                    placeholder={camelCaseToNormal(key)}
                    style={{ padding: "5px" }}
                  />
                </div>
              </div>
              )
            })
          }
          {
            showOtpInput && (
                <div>
                  <div className='input-container'>
                  <div className='icon-container'></div>
                  <input
                    type="text"
                    id="mobile"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ padding: "5px" }}
                  />
                </div>  
                </div>
            )
          }
        <button className='singup-btn' type="submit" style={{ padding: "5px 10px" }}>Sign Up</button>
      </form>
      </div>
    </div>
  )
}

export default SignIn