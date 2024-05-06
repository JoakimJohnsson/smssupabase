import React, {useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../helpers/constants/configConstants";
import {Icon, sendIcon, questionIconDuoTone} from "../../icons";
import {requestPasswordResetForEmail} from "../../../services/serviceFunctions";


const ForgotPassword = () => {

    const [message, setMessage] = useState({show: false, text: "", isError: false});
    const [email, setEmail] = useState("");

    return (
        <form onSubmit={(e) => requestPasswordResetForEmail(email, setMessage, e)} className={"sms-section--light mb-5"}
              id={"forgot-password-section"}>
            <div className={"text-center mb-4 mb-sm-5"}>
                <Icon icon={questionIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
                <h2>{LABELS_AND_HEADINGS.FORGOT_PASSWORD}</h2>
            </div>
            <label className={"form-label"} htmlFor="input-forgot-email">{LABELS_AND_HEADINGS.EMAIL_SEND}</label>
            <input id="input-forgot-email"
                   type="email"
                   onChange={(e) => setEmail(e.target.value)}
                   className={"form-control"}
                   placeholder={LABELS_AND_HEADINGS.PLACEHOLDER_MAIL}
                   required/>
            <div className={"form-text mb-3"}>{TEXTS.CHANGE_PASSWORD_SEND_INFO}</div>
            <button type="submit" className={"btn btn-primary sms-btn"} disabled={email === ""}>
                <Icon icon={sendIcon} className={"me-2"}/>{LABELS_AND_HEADINGS.SEND}
            </button>
            {message.show && <p className={`alert ${message.isError ? "alert-danger" : "alert-success"} mt-3`} role={"alert"}>{message.message}</p>}
        </form>
    )
}

export default ForgotPassword;
