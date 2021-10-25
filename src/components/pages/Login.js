import {useRef} from 'react';
import {useHistory, Link} from 'react-router-dom';
import {useAuth} from '../../contexts/Auth';

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    // Get signUp function from the auth context
    const {signIn} = useAuth()

    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Calls `signIn` function from the context
        const {error} = await signIn({email, password})

        if (error) {
            alert('error signing in')
        } else {
            // Redirect user to Dashboard
            history.push('/')
        }
    }

    return (
        <div className={"p-6 prose"}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-email">Email</label>
                <input id="input-email" type="email" ref={emailRef} className={"block rounded text-sm mb-2"}/>
                <label htmlFor="input-password">Password</label>
                <input id="input-password" type="password" ref={passwordRef} className={"block rounded text-sm mb-5"}/>
                <button type="submit" className={"button"}>Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    )
}

export default Login;
