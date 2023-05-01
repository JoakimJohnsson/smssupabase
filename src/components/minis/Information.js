import React, {useEffect, useState} from "react";
import {ALERT_VARIANTS, MESSAGES} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {faTimes} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";


export const Information = ({message}) => {
    const [timeStamp, setTimeStamp] = useState("");
    const [messageText, setMessageText] = useState("");
    const statusClass = message.status ? message.status.toString().charAt(0) : 4;
    const alertVariant = ALERT_VARIANTS[statusClass].variant;
    const alertIcon = ALERT_VARIANTS[statusClass].icon;
    const {setInformationMessage} = useAppContext();
    const doShow = message && message.show ? "show" : "";

    useEffect(() => {
        setTimeStamp(new Date().toLocaleTimeString())
        if (message.status && typeof message.error !== "string") {
            setMessageText(MESSAGES.CODES[message.status]);
        } else if (message.error) {
            setMessageText(message.error.toString());
        } else {
            setMessageText(MESSAGES.ERROR.GENERAL_ERROR);
        }
    }, [message]);

    return message && message.show && (
        <div className={`alert alert-${alertVariant} alert-dismissible fade ${doShow} sms-information-message`} role={"alert"}>
            <div className={"d-flex"}>
            <div>
                {alertIcon}
            </div>
            <div>
                <time className={"small d-block mb-1"}>{timeStamp}</time>
                <p className={"mb-0"}>{messageText}</p>
            </div>
            </div>
            <button type="button" className="position-absolute top-0 end-0 p-2 btn sms-icon-btn text-black-50" data-bs-dismiss="alert"
                    aria-label="Stäng"
                    onClick={() => setInformationMessage(MESSAGES.EMPTY)}>
                <Icon icon={faTimes} className={"fa-lg sms-icon--hovering"}/>
            </button>
        </div>
    )
}
