import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../../contexts/Auth';
import {MESSAGES, CLASSES} from "../../helpers/constants";
import {validateEmail, validatePassword} from "../../helpers/validations";
import SignupValidationMessage from "./SignupValidationMessage";
import {checkIfEmailExists, handleEmailInput, handlePasswordInput} from "../../helpers/functions";

const Signup = () => {
    // Success and error variants of form-input is available
    const [emailInputClass, setEmailInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [passwordInputClass, setPasswordInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [emailValidationMessage, setEmailValidationMessage] = useState("");
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [passwordValidated, setPasswordValidated] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const {signUp} = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await checkIfEmailExists(email, setEmailExists);

        // Never sign up if user tries to sign up with an email that already exists
        if (emailExists === true) {
            setFormErrorMessage(MESSAGES.ERROR.VALIDATION_EMAIL_EXISTS);
            setShowFormError(true);
        } else {
            const {error} = await signUp({email, password});
            if (error) {
                setFormErrorMessage(error.message);
                setShowFormError(true);
            } else {
                history.push('/success')
            }
        }
    }

    const handleEmailValidation = (e) => {
        // Send true for success
        validateEmail(e) ?
            handleEmailInput(true, setEmailInputClass, setEmailValidated, setEmailValidationMessage)
            :
            handleEmailInput(false, setEmailInputClass, setEmailValidated, setEmailValidationMessage);
    }

    const handlePasswordValidation = (e) => {
        validatePassword(e) ?
            handlePasswordInput(true, setPasswordInputClass, setPasswordValidated, setPasswordValidationMessage)
            :
            handlePasswordInput(false, setPasswordInputClass, setPasswordValidated, setPasswordValidationMessage);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={"sms-form"}>
                <label className={"form-label"} htmlFor="input-email">Email</label>
                <input id="input-email"
                       type="email"
                       ref={emailRef}
                       onChange={(e) => handleEmailValidation(e)}
                       className={emailInputClass}
                       placeholder={"name@myplace.se"}
                       required/>
                <SignupValidationMessage success={emailValidated} message={emailValidationMessage}/>
                <label className={"form-label"} htmlFor="input-password">Password</label>
                <input id="input-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => handlePasswordValidation(e)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <SignupValidationMessage success={passwordValidated} message={passwordValidationMessage}/>
                <button type="submit" className={emailValidated && passwordValidated ? "btn btn-secondary" : "btn btn-secondary disabled"}>
                    Sign up
                </button>
                {showFormError && <p className={"alert alert-danger mt-3"}>{formErrorMessage}</p>}
            </form>
        </>
    )
}

export default Signup;