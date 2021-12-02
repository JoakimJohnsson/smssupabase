import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';
import {simpleInputValidation} from "../helpers/validations";

const Login = () => {

    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [passwordValidated, setPasswordValidated] = useState(false);

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
            <form onSubmit={handleSubmit} className={"sms-form"}>
                <label className={"form-label"} htmlFor="input-email">Email</label>
                <input id="input-email"
                       type="email"
                       ref={emailRef}
                       onChange={(e) => simpleInputValidation(e, setEmailValidated)}
                       className={emailValidated ? "form-control success mb-3" : "form-control mb-3"}
                       placeholder={"name@myplace.se"}
                       required/>
                <label className={"form-label"} htmlFor="input-password">Password</label>
                <input id="input-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => simpleInputValidation(e, setPasswordValidated)}
                       className={passwordValidated ? "form-control success mb-3" : "form-control mb-3"}
                       placeholder={"********"}
                       required/>
                <button type="submit" className={emailValidated && passwordValidated ? "btn btn-primary" : "btn btn-primary disabled"}>Log in</button>
                {showFormError && <p className={"alert alert-danger mt-3"} role={"alert"}>{formErrorMessage}</p>}
            </form>
        </div>
    )
}

export default Login;
