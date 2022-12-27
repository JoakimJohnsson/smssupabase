import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext";
import {simpleInputValidation} from "../helpers/validations";
import {CLASSES, LABELS_AND_HEADINGS} from "../helpers/constants";

const Login = () => {

    // Error and validation handling
    const [showFormError, setShowFormError] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const [emailValidated, setEmailValidated] = useState(false);
    const [passwordValidated, setPasswordValidated] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const {signIn} = useAppContext();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const {error} = await signIn({email, password});

        if (error) {
            setFormErrorMessage(error.message);
            setShowFormError(true);
        } else {
            navigate("/");
        }
    }

    return (
        <div className={"w-100"}>
            <form onSubmit={handleSubmit} className={"sms-form"}>
                <label className={"form-label"} htmlFor="input-email">{LABELS_AND_HEADINGS.EMAIL}</label>
                <input id="input-email"
                       type="email"
                       ref={emailRef}
                       onChange={(e) => simpleInputValidation(e, setEmailValidated)}
                       className={emailValidated ? "form-control success mb-3" : CLASSES.FORM_INPUT_DEFAULT}
                       placeholder={"name@myplace.se"}
                       required/>
                <label className={"form-label"} htmlFor="input-password">{LABELS_AND_HEADINGS.PASSWORD}</label>
                <input id="input-password"
                       type="password"
                       ref={passwordRef}
                       onChange={(e) => simpleInputValidation(e, setPasswordValidated)}
                       className={passwordValidated ? "form-control success mb-3" : CLASSES.FORM_INPUT_DEFAULT}
                       placeholder={"********"}
                       required/>
                <button type="submit" className={emailValidated && passwordValidated ? "btn btn-primary" : "btn btn-primary disabled"}>{LABELS_AND_HEADINGS.LOG_IN}</button>
                {showFormError && <p className={"alert alert-danger mt-3"} role={"alert"}>{formErrorMessage}</p>}
            </form>
        </div>
    )
}

export default Login;
