import React, {useEffect, useState} from "react";
import {MESSAGES} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {XIcon, InformationCircleIcon, HeartIcon, ExclamationCircleIcon, ShieldExclamationIcon} from "@heroicons/react/solid";

export const Information = ({message}) => {
    const [timeStamp, setTimeStamp] = useState("");
    const [messageText, setMessageText] = useState("");
    const statusClass = message.status ? message.status.toString().charAt(0) : 4;
    const alertVariants = {
        1: {
            variant: "info",
            icon: <InformationCircleIcon className={"sms-icon--medium me-3"}/>
        },
        2: {
            variant: "success",
            icon: <HeartIcon className={"sms-icon--medium me-3"}/>
        },
        3: {
            variant: "warning",
            icon: <ExclamationCircleIcon className={"sms-icon--medium me-3"}/>
        },
        4: {
            variant: "danger",
            icon: <ShieldExclamationIcon className={"sms-icon--medium me-3"}/>
        },
        5: {
            variant: "danger",
            icon: <ShieldExclamationIcon className={"sms-icon--medium me-3"}/>
        }
    }
    const alertVariant = alertVariants[statusClass].variant;
    const alertIcon = alertVariants[statusClass].icon;
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
                <XIcon className={"sms-icon--hovering"}/>
            </button>
        </div>
    )
}
