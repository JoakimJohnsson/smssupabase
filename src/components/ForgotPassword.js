import React, {useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../helpers/constants";
import {SendIcon} from "./icons";
import {QuestionIconDuoTone} from "./icons-duotone";
import {requestPasswordResetForEmail} from "../helpers/functions/serviceFunctions/serviceFunctions";

const ForgotPassword = () => {

    const [message, setMessage] = useState({show: false, text: "", isError: false});
    const [email, setEmail] = useState("");

    return (
        <form onSubmit={(e) => requestPasswordResetForEmail(email, setMessage, e)} className={"sms-section--light mb-5"}
              id={"forgot-password-section"}>
            <div className={"text-center mb-4 mb-sm-5"}>
                <QuestionIconDuoTone size={"2x"} className={"text-primary mb-3"}/>
                <h2>{LABELS_AND_HEADINGS.FORGOT_PASSWORD}</h2>
            </div>
            <label className={"form-label"} htmlFor="input-email">{LABELS_AND_HEADINGS.EMAIL_SEND}</label>
            <input id="input-email"
                   type="email"
                   onChange={(e) => setEmail(e.target.value)}
                   className={"form-control"}
                   placeholder={"name@myplace.se"}
                   required/>
            <div className={"form-text mb-3"}>{TEXTS.EMAIL_SEND_INFO}</div>
            <button type="submit" className={"btn btn-primary sms-btn"}>
                <SendIcon className={"me-2"}/>{LABELS_AND_HEADINGS.SEND}
            </button>
            {message.show && <p className={`alert ${message.isError ? "alert-danger" : "alert-success"} mt-3`} role={"alert"}>{message.message}</p>}
        </form>
    )
}

export default ForgotPassword;
