import {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../contexts/Auth';
import {TwButtonPrimary} from "../tw-components/buttons";

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
        <div className={"p-10 bg-yellow-50"}>
            <h1 className={"font-bold mb-3"}>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-email">Email</label>
                <input id="input-email" type="email" ref={emailRef} className={"block rounded text-sm mb-2"}/>
                <label htmlFor="input-password">Password</label>
                <input id="input-password" type="password" ref={passwordRef} className={"block rounded text-sm mb-5"}/>
                <TwButtonPrimary type="submit" label={"Log in"}/>
            </form>
        </div>
    )
}

export default Login;
