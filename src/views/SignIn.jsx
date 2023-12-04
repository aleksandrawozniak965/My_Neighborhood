import supabase from "../utilis/supabase.js";
import {Link, useNavigate} from "react-router-dom";


export default function SignIn({setToken}) {
    const navigation = useNavigate();

    async function handleSingIn(e){
        e.preventDefault();

        const {data, error} = await supabase.auth.signInWithPassword({
            email: e.target.elements[0].value,
            password: e.target.elements[1].value,
        });

        if (!error) {
            setToken(data);
            navigation('/mainpage');

        }  else {
            console.error("Authentication error:", error.message, error);
        }
    }

    return (
        <>
            <div className="flex_container">
            <div className="signin_container">
                <h1>Sign In</h1>
                <form onSubmit={handleSingIn}>
                    <input className="input_field " placeholder="email" />
                    <input className="input_field " placeholder="password" type="password" />
                    <button className="signin_button">Sign in</button>
                    <p className="signin_paragraph">Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                </form>
            </div>
            </div>
        </>
    )
}