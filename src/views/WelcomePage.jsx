import React from "react";
import { useNavigate} from "react-router-dom";


function WelcomePage () {
    const navigate = useNavigate();

    function goToSignInPage() {
        navigate('/signin');
    }

    function goToSignUpPage() {
        navigate('/signup');
    }

    return (
        <>
            <div className="main_container">
                <h2>Home is where the Neighborhood is.</h2>
            <div className="buttons">
                <button onClick={goToSignUpPage}>Sign Up</button>
                <button onClick={goToSignInPage}>Sign In</button>
            </div>
            </div>
        </>
    )
}

export default WelcomePage;