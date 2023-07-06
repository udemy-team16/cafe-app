import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const GoogleLoginButton = () => {
    const clientId = process.env.REACT_APP_CLIENT_ID;
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    if (loggedIn) {
        return navigate('/list');
    }
    
    return (
        <GoogleOAuthProvider clientId={clientId} >
            <GoogleLogin 
                onSuccess={(res) => {
                    console.log(res);
                    setLoggedIn(true);
                }}
                onFailure={(err) => {
                    console.log(err);
                }}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton