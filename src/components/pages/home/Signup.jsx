import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../helpers/constants/configConstants";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {MESSAGES} from "../../../helpers/constants/textConstants/messages";
import {validateEmail, validatePassword} from "../../../helpers/validations";
import SignupValidationMessage from "./SignupValidationMessage";
import {doesEmailExist, handleEmailInput, handlePasswordInput} from "../../../helpers/functions";
import {Icon, registerIcon, registerIconDuoTone} from "../../icons";
import {supabase} from "../../../supabase/supabaseClient.js";


export const Signup = () => {
    // Success and error variants of form-input is available
    const [emailInputClass, setEmailInputClass] = useState("form-input--default");
    const [passwordInputClass, setPasswordInputClass] = useState("form-input--default");
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
            const {error} = await supabase.auth.signUp({email, password});
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
                <div className={"mb-4 mb-sm-5"}>
                    <div className={"text-center"}>
                        <Icon icon={registerIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
                        <h2>{LABELS.COMMON.CREATE_ACCOUNT}</h2>
                    </div>
                    <p className={"lead"}>{TEXTS.CONSENT}</p>
                </div>


                <label className={"form-label"} htmlFor="input-signup-email">{LABELS.COMMON.EMAIL}</label>
                <input id="input-signup-email"
                       type="email"
                       ref={emailRef}
                       onSubmit={(e) => handleEmailValidation(e)}
                       className={emailInputClass}
                       placeholder={LABELS.COMMON.PLACEHOLDER_MAIL}
                       required/>
                <SignupValidationMessage success={emailValidated} message={emailValidationMessage}/>
                <label className={"form-label d-flex"}
                       htmlFor="input-signup-password">{LABELS.COMMON.PASSWORD}</label>
                <input id="input-signup-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => handlePasswordValidation(e)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <label className={"form-label d-flex"}
                       htmlFor="input-signup-password-confirm">{LABELS.COMMON.PASSWORD_CONFIRM}</label>
                <input id="input-signup-password-confirm"
                       type="password"
                       onChange={(e) => setPasswordConfirm(e.target.value)}
                       className={passwordInputClass}
                       placeholder={"********"}
                       required/>
                <SignupValidationMessage success={passwordValidated} message={passwordValidationMessage}/>
                <button type="submit" className={"btn btn-primary sms-btn"}
                        disabled={!passwordValidated || passwordRef.current.value !== passwordConfirm}>
                    <Icon icon={registerIcon} className={"me-2"}/>{LABELS.COMMON.CREATE_ACCOUNT}
                </button>
                {showFormError && <p className={"alert alert-danger mt-3"}>{formErrorMessage}</p>}
            </form>
        </>
    )
}
