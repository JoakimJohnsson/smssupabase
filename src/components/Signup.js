import {useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';
import {TwButtonPrimary} from "./tw-components/buttons";

const Signup = () => {
    const emailRef = useRef()
    const passwordRef = useRef()

    // Get signUp function from the auth context
    const {signUp} = useAuth();

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        // Get email and password input values
        const email = emailRef.current.value
        const password = passwordRef.current.value

        // Calls `signUp` function from the context
        const {error} = await signUp({email, password})

        if (error) {
            alert('error signing in')
        } else {
            // Redirect user to Dashboard
            history.push('/')
        }
    }

    return (
        <>
            <h2 className={"font-bold mb-3"}>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="input-email">Email</label>
                <input id="input-email" type="email" ref={emailRef} className={"block rounded text-sm mb-2"}/>
                <label htmlFor="input-password">Password</label>
                <input id="input-password" type="password" ref={passwordRef} className={"block rounded text-sm mb-5"}/>
                <TwButtonPrimary type="submit" label={"Sign up"}/>
            </form>
        </>
    )
}

export default Signup;
