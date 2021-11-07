import {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useAuth} from '../contexts/Auth';
import {TwButtonPrimary} from "./tw-components/buttons";
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
            setFormErrorMessage(MESSAGES.ERROR.VALIDATION_SIGNUP_FORM);
            setShowFormError(true);
        } else {
            //             // todo checkbox (I understand)
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
            <form onSubmit={handleSubmit} className={""}>
                <label className={""} htmlFor="input-email">Email</label>
                <input id="input-email"
                       type="email"
                       ref={emailRef}
                       onChange={(e) => handleEmailValidation(e)}
                       className={emailInputClass}
                       placeholder={"name@myplace.se"}
                       required/>
                <p className={""}>{emailValidationMessage !== "" ? emailValidationMessage : false}</p>

                <label className={""} htmlFor="input-password">Password</label>
                <input id="input-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => handlePasswordValidation(e)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <p className={"mb-3 mt-2 text-gray-500"}>{passwordValidationMessage !== "" ? passwordValidationMessage : false}</p>
                <TwButtonPrimary type="submit" label={"Sign up"} className={enableSubmitButton() === true ? "" : ""}/>
                {showFormError ?
                    <p className={""}>{formErrorMessage}</p>
                    :
                    false
                }
            </form>
        </>
    )
}

export default Signup;
