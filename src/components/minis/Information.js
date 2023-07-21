import React, {useCallback, useEffect, useState} from "react";
import {ALERT_VARIANTS, LABELS_AND_HEADINGS, MESSAGES} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {faTimes, faPause} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";


export const Information = ({message}) => {
    const INFORMATION_MESSAGE_MAX_AGE = 10;
    const [counter, setCounter] = useState(INFORMATION_MESSAGE_MAX_AGE);
    const [pauseCounter, setPauseCounter] = useState(false);
    const [messageText, setMessageText] = useState("");
    const statusClass = message.status ? message.status.toString().charAt(0) : 4;
    const alertVariant = ALERT_VARIANTS[statusClass].variant;
    const alertIcon = ALERT_VARIANTS[statusClass].icon;
    const {setInformationMessage} = useAppContext();
    const doShow = message && message.show ? "show" : "";

    const closeInformationMessage = useCallback(() => {
        setCounter(INFORMATION_MESSAGE_MAX_AGE);
        setInformationMessage(null);
        setPauseCounter(false);
    }, [setInformationMessage]);

    useEffect(() => {
        if (message && message.show && !pauseCounter) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
            if (counter === 0) {
               closeInformationMessage();
            }
        }
    }, [counter, message, closeInformationMessage, pauseCounter]);

    useEffect(() => {
        if (message.status && typeof message.error !== "string") {
            setMessageText(MESSAGES.CODES[message.status]);
        } else if (message.error) {
            setMessageText(message.error.toString());
        } else {
            setMessageText(MESSAGES.ERROR.GENERAL_ERROR);
        }
    }, [message]);

    return message && message.show && (
        <div className={`alert alert-${alertVariant} alert-dismissible fade ${doShow} sms-information-message`} role={"alert"} aria-live="assertive">
            <div className={"d-flex"}>
                <div>
                    {alertIcon}
                </div>
                <div>
                    <p className={"mb-2"}>{messageText}</p>
                    {
                        !pauseCounter &&
                        <p className={"small d-block mb-0"}>{MESSAGES.INFO.WILL_CLOSE_1} <span className={"fs-6"}>{counter}</span> {MESSAGES.INFO.WILL_CLOSE_2}</p>
                    }
                </div>
            </div>
            <div className={"position-absolute top-0 end-0"}>
                {
                    !pauseCounter ?
                    <button type="button" className="p-1 m-0 btn sms-icon-btn text-black-50" aria-label={LABELS_AND_HEADINGS.PAUSE}
                            onClick={() => setPauseCounter(!pauseCounter)}>
                        <Icon icon={faPause} className={"fa-lg sms-icon--hovering"}/>
                    </button>
                        :
                        <button type="button" className="p-1 m-0 btn sms-icon-btn text-black-50" aria-label={LABELS_AND_HEADINGS.CLOSE}
                                onClick={() => closeInformationMessage()}>
                            <Icon icon={faTimes} className={"fa-lg sms-icon--hovering"}/>
                        </button>
                }

            </div>
        </div>
    )
}
