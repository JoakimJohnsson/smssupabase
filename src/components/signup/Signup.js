import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";
import {MESSAGES, CLASSES, LABELS_AND_HEADINGS} from "../../helpers/constants";
import {validateEmail, validatePassword} from "../../helpers/validations";
import ValidationMessage from "./ValidationMessage";
import {doesEmailExist, handleEmailInput, handlePasswordInput} from "../../helpers/functions/functions";
import {RegisterIcon} from "../icons";
import {RegisterIconDuoTone} from "../icons-duotone";

export const Signup = () => {
    // Success and error variants of form-input is available
    const [emailInputClass, setEmailInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [passwordInputClass, setPasswordInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [emailValidationMessage, setEmailValidationMessage] = useState("");
    const [passwordValidationMessage, setPasswordValidationMessage] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [passwordValidated, setPasswordValidated] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const {signUp} = useAppContext();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        const emailExists = await doesEmailExist(email);

        // Never sign up if user tries to sign up with an email that already exists
        if (emailExists === true) {
            setFormErrorMessage(MESSAGES.ERROR.VALIDATION_EMAIL_EXISTS);
            setShowFormError(true);
        } else if (password !== passwordConfirm) {
            setFormErrorMessage(MESSAGES.ERROR.VALIDATION_PASSWORD_CONFIRM);
            setShowFormError(true);
        } else {
            const {error} = await signUp({email, password});
            if (error) {
                setFormErrorMessage(error.message);
                setShowFormError(true);
            } else {
                navigate("/success");
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
            <form onSubmit={handleSubmit} className={"sms-section--light mb-5"} id={"create-account-section"}>
                <div className={"text-center mb-4 mb-sm-5"}>
                    <RegisterIconDuoTone size={"2x"} className={"fa-icon--cta"}/>
                    <h2>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}</h2>
                </div>
                <label className={"form-label"} htmlFor="input-signup-email">{LABELS_AND_HEADINGS.EMAIL}</label>
                <input id="input-signup-email"
                       type="email"
                       ref={emailRef}
                       onSubmit={(e) => handleEmailValidation(e)}
                       className={emailInputClass}
                       placeholder={"name@myplace.se"}
                       required/>
                <ValidationMessage success={emailValidated} message={emailValidationMessage}/>
                <label className={"form-label d-flex"} htmlFor="input-signup-password">{LABELS_AND_HEADINGS.PASSWORD}</label>
                <input id="input-signup-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => handlePasswordValidation(e)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <label className={"form-label d-flex"} htmlFor="input-signup-password-confirm">{LABELS_AND_HEADINGS.PASSWORD_CONFIRM}</label>
                <input id="input-signup-password-confirm"
                       type="password"
                       onChange={(e) => setPasswordConfirm(e.target.value)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <ValidationMessage success={passwordValidated} message={passwordValidationMessage}/>
              {/*  <button type="submit" className={"btn btn-primary sms-btn"} disabled={!passwordValidated || passwordRef.current.value !== passwordConfirm}>
                    <RegisterIcon className={"me-2"}/>{LABELS_AND_HEADINGS.CREATE_ACCOUNT}
                </button>*/}
                <button className={"btn btn-danger sms-btn"} disabled={true}>
                    <RegisterIcon className={"me-2"}/>{LABELS_AND_HEADINGS.DISABLED}
                </button>
                {showFormError && <p className={"alert alert-danger mt-3"}>{formErrorMessage}</p>}
            </form>
        </>
    )
}
