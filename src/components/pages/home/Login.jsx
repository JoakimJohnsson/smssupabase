import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {simpleInputValidation} from "../../../helpers/validations";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {Icon, loginIcon, loginIconDuoTone} from "../../icons";
import {updateProfileLastLogin} from "../../../services/profileService";
import {supabase} from "../../../supabase/supabaseClient.js";


const Login = () => {

    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [passwordValidated, setPasswordValidated] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const {error} = await supabase.auth.signInWithPassword({email, password});

        if (error) {
            setFormErrorMessage(error.message);
            setShowFormError(true);
        } else {
            try {
                await updateProfileLastLogin(email);
            } catch (error) {
                console.error("Failed to update last login:", error);
            }
            navigate("/");
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"sms-section--light mb-5"} id={"login-section"}>
            <div className={"text-center mb-4 mb-sm-5"}>
                <Icon icon={loginIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
                <h2>{LABELS.COMMON.LOG_IN}</h2>
            </div>
            <label className={"form-label"} htmlFor="input-email">{LABELS.COMMON.EMAIL}</label>
            <input id="input-email"
                   type="email"
                   ref={emailRef}
                   onChange={(e) => simpleInputValidation(e, setEmailValidated)}
                   className={emailValidated ? "form-input--success" : "form-input--default"}
                   placeholder={LABELS.COMMON.PLACEHOLDER_MAIL}
                   required/>
            <label className={"form-label"} htmlFor="input-password">{LABELS.COMMON.PASSWORD}</label>
            <input id="input-password"
                   type="password"
                   ref={passwordRef}
                   onChange={(e) => simpleInputValidation(e, setPasswordValidated)}
                   className={passwordValidated ? "form-input--success" : "form-input--default"}
                   placeholder={"********"}
                   required/>
            <div className={"text-center mb-3"}>
                <a href={"#forgot-password-section"}>{LABELS.COMMON.FORGOT_PASSWORD}</a>
            </div>
            <button type="submit" className={emailValidated && passwordValidated ? "btn btn-primary sms-btn" : "btn btn-primary sms-btn disabled"}>
                <Icon icon={loginIcon} className={"me-2"}/>{LABELS.COMMON.LOG_IN}
            </button>
            {showFormError && <p className={"alert alert-danger mt-3"} role={"alert"}>{formErrorMessage}</p>}
        </form>
    )
}

export default Login;
