import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';

const Login = () => {

    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const {signIn} = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const {error} = await signIn({email, password});

        if (error) {
            setFormErrorMessage(error.message);
            setShowFormError(true);
        } else {
            history.push('/')
        }
    }

    return (
        <div className={"w-100"}>
            <h2 className={"mb-4"}>Log in</h2>
            <form onSubmit={handleSubmit} className={"sms-form"}>
                <label className={"form-label"} htmlFor="input-email">Email</label>
                <input id="input-email"
                       type="email"
                       ref={emailRef}
                       className={"form-control mb-3"}
                       placeholder={"name@myplace.se"}
                       required/>
                <label className={"form-label"} htmlFor="input-password">Password</label>
                <input id="input-password"
                       type="password"
                       ref={passwordRef}
                       className={"form-control mb-3"}
                       placeholder={"********"}
                       required/>
                <button type="submit" className={"btn btn-primary"}>Log in</button>
                {showFormError ?
                    <p className={"alert alert-danger mt-3"} role={"alert"}>{formErrorMessage}</p>
                    :
                    false
                }
            </form>
        </div>
    )
}

export default Login;
