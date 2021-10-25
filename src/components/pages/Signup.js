import { useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/Auth';

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    // Get signUp function from the auth context
    const { signUp } = useAuth();

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Calls `signUp` function from the context
        const { error } = await signUp({ email, password })

        if (error) {
            alert('error signing in')
        } else {
            // Redirect user to Dashboard
            history.push('/')
        }

    }

    return (
        <div className={"p-6"}>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-email">Email</label>
                <input id="input-email" type="email" ref={emailRef} />

                <label htmlFor="input-password">Password</label>
                <input id="input-password" type="password" ref={passwordRef} />

                <br />

                <button type="submit">Sign up</button>
            </form>

            <br />

            <p>
                Already have an account? <Link to="/login">Log In</Link>
            </p>
        </div>
    )
}

export default Signup;
