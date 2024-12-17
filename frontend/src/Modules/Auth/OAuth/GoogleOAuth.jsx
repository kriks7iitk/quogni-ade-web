import React from "react";
import { useGoogleLogin } from '@react-oauth/google';
import SolidButton from "../../../_components/Buttons/SolidButton";
import { useNavigate } from "react-router-dom";
const GoogleOAuthButton = () => {
    const navigate = useNavigate();
    const googleLogin = useGoogleLogin({
        onSuccess: (codeResponse) => navigate(`/oauth/callback/google?code=${codeResponse.access_token}&mode=signup`),
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
    });
    return (
            <>
                <SolidButton
                    leftIcon="google"
                    iconFill="#ffffff"
                    hoverIconFill="#ffffff"
                    customClass="auth-btn"
                    onClick={() => googleLogin()}
                >
                Login with Google
                </SolidButton>
            </>
    );
};
export default GoogleOAuthButton;