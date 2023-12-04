import supabase from "../utilis/supabase.js";
import {Link, useNavigate} from "react-router-dom";

export default function SignUp() {
    const navigation = useNavigate();

    async function handleSignUp (e) {
        e.preventDefault();

        const { data, error } = await supabase.auth.signUp( {
                email: e.target.elements[2].value,
                password: e.target.elements[3].value,
            options: {
                    data: {
                    name: e.target.elements[0].value,
                    surname: e.target.elements[1].value,
                }
            },
        });

        if(!error) {
            console.log(data);

            navigation('/signin');
            return;
        }
        console.error(error);
    }

    return (
        <>
            <div className="flex_container">
                <div className="signup_container">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSignUp}>
                        <input className="input_field " placeholder="name" />
                        <input className="input_field " placeholder="surname" />
                        <input className="input_field " placeholder="email" />
                        <input className="input_field " placeholder="password" type="password" />
                        <button className="signup_button">Sign up</button>
                        <p>Already have an account? <Link to='/signin'>Sign In</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}