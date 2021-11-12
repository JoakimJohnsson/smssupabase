import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';
import {MESSAGES, CLASSES} from "../helpers/constants";
import {validateEmail, validatePassword} from "../helpers/validations";

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

    const emailRef = useRef();
    const passwordRef = useRef();
    const {signUp} = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const {error} = await signUp({email, password});

        if (error) {
            setFormErrorMessage(error.message);
            setShowFormError(true);
        } else {
            history.push('/success')
        }
    }

    const handleEmailValidation = (e) => {
        // Send true for success
        validateEmail(e) ? handleEmailInput(true) : handleEmailInput(false);
    }

    const handlePasswordValidation = (e) => {
        validatePassword(e) ? handlePasswordInput(true) : handlePasswordInput(false);
    }

    const handleEmailInput = (success) => {
        if (success) {
            setEmailInputClass(CLASSES.FORM_INPUT_SUCCESS);
            setEmailValidated(true);
            setEmailValidationMessage(MESSAGES.SUCCESS.VALIDATION_EMAIL);
        } else {
            setEmailInputClass(CLASSES.FORM_INPUT_ERROR);
            setEmailValidated(false);
            setEmailValidationMessage(MESSAGES.ERROR.VALIDATION_EMAIL);
        }
    }

    const handlePasswordInput = (success) => {
        if (success) {
            setPasswordInputClass(CLASSES.FORM_INPUT_SUCCESS);
            setPasswordValidated(true);
            setPasswordValidationMessage(MESSAGES.SUCCESS.VALIDATION_PASSWORD);
        } else {
            setPasswordInputClass(CLASSES.FORM_INPUT_ERROR);
            setPasswordValidated(false)
            setPasswordValidationMessage(MESSAGES.ERROR.VALIDATION_PASSWORD);
        }
    }

    const enableSubmitButton = () => {
        return emailValidated && passwordValidated;
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
                <button type="submit" className={enableSubmitButton() === true ? "btn btn-primary" : "btn btn-primary disabled"}>Sign up</button>
                {showFormError ?
                    <p className={"alert alert-danger mt-3"}>{formErrorMessage}</p>
                    :
                    false
                }
            </form>
        </>
    )
}

export default Signup;
