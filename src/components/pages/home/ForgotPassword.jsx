import React, {useState} from "react";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {Icon, sendIcon, questionIconDuoTone} from "../../icons/Icons.jsx";
import {requestPasswordResetForEmail} from "../../../services/serviceFunctions";


const ForgotPassword = () => {

    const [message, setMessage] = useState({show: false, text: "", isError: false});
    const [email, setEmail] = useState("");

    return (
        <form onSubmit={(e) => requestPasswordResetForEmail(email, setMessage, e)} className={"sms-section--light mb-5"}
              id={"forgot-password-section"}>
            <div className={"text-center mb-4 mb-sm-5"}>
                <Icon icon={questionIconDuoTone} size={"2x"} className={"fa-icon--cta"}/>
                <h2>{LABELS.COMMON.FORGOT_PASSWORD}</h2>
            </div>
            <label className={"form-label"} htmlFor="input-forgot-email">{LABELS.COMMON.EMAIL_SEND}</label>
            <input id="input-forgot-email"
                   type="email"
                   onChange={(e) => setEmail(e.target.value)}
                   className={"form-control"}
                   placeholder={LABELS.COMMON.PLACEHOLDER_MAIL}
                   required/>
            <div className={"form-text mb-3"}>{TEXTS.CHANGE_PASSWORD_SEND_INFO}</div>
            <button type="submit" className={"btn btn-primary sms-btn"} disabled={email === ""}>
                <Icon icon={sendIcon} className={"me-2"}/>{LABELS.COMMON.SEND}
            </button>
            {message.show && <p className={`alert ${message.isError ? "alert-danger" : "alert-success"} mt-3`} role={"alert"}>{message.message}</p>}
        </form>
    )
}

export default ForgotPassword;
