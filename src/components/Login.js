import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';
import {TwButtonPrimary} from "./tw-components/buttons";
import {CLASSES, MESSAGES} from "../helpers/constants";
import {validateEmail, validatePassword} from "../helpers/validations";

const Login = () => {
    // Success and error variants of form-input is available
    const [emailInputClass, setEmailInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [passwordInputClass, setPasswordInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [emailValidationMessage, setEmailValidationMessage] = useState("");
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");

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
            setFormErrorMessage(MESSAGES.ERROR.VALIDATION_SIGNUP_FORM);
            setShowFormError(true);
        } else {
            history.push('/')
        }
    }

    const handleEmailValidation = (e) => {
        validateEmail(e) ? handleEmailSuccess() : handleEmailError();
    }

    const handlePasswordValidation = (e) => {
        validatePassword(e) ? handlePasswordSuccess() : handlePasswordError();
    }

    const handleEmailSuccess = () => {
        setEmailInputClass(CLASSES.FORM_INPUT_SUCCESS);
        setEmailValidationMessage(MESSAGES.SUCCESS.VALIDATION_EMAIL);
    }

    const handleEmailError = () => {
        setEmailInputClass(CLASSES.FORM_INPUT_ERROR);
        setEmailValidationMessage(MESSAGES.ERROR.VALIDATION_EMAIL);
    }
    const handlePasswordSuccess = () => {
        setPasswordInputClass(CLASSES.FORM_INPUT_SUCCESS);
        setPasswordValidationMessage(MESSAGES.SUCCESS.VALIDATION_PASSWORD);
    }

    const handlePasswordError = () => {
        setPasswordInputClass(CLASSES.FORM_INPUT_ERROR);
        setPasswordValidationMessage(MESSAGES.ERROR.VALIDATION_PASSWORD);
    }

    return (
        <div className={"w-100"}>
            <h2 className={""}>Log in</h2>
            <form onSubmit={handleSubmit} className={"sms-form"}>
                <label className={"form-label"} htmlFor="input-email">Email</label>
                <input id="input-email"
                       type="email"
                       ref={emailRef}
                       onChange={(e) => handleEmailValidation(e)}
                       className={emailInputClass}
                       placeholder={"name@myplace.se"}
                       required/>
                <p className={"form-text"}>{emailValidationMessage !== "" ? emailValidationMessage : false}</p>
                <label className={"form-label"} htmlFor="input-password">Password</label>
                <input id="input-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => handlePasswordValidation(e)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <p className={"form-text"}>{passwordValidationMessage !== "" ? passwordValidationMessage : false}</p>
                <TwButtonPrimary type="submit" label={"Log in"} className={"btn btn-primary"}/>
                {showFormError ?
                    <p className={""}>{formErrorMessage}</p>
                    :
                    false
                }
            </form>
        </div>
    )
}

export default Login;
