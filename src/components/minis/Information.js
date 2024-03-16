import React, {useCallback, useEffect, useState} from "react";
import {ALERT_VARIANTS, LABELS_AND_HEADINGS, MESSAGES} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {faTimes, faPause} from "@fortawesome/pro-solid-svg-icons";
import {Icon} from "../icons";
import {ProgressBar} from "react-bootstrap";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const Information = ({message}) => {
    const INFORMATION_MESSAGE_MAX_AGE = 100;
    const [counter, setCounter] = useState(INFORMATION_MESSAGE_MAX_AGE);
    const [pauseCounter, setPauseCounter] = useState(false);
    const [messageText, setMessageText] = useState("");
    const statusClass = message.status ? message.status.toString().charAt(0) : 4;
    const alertVariant = ALERT_VARIANTS[statusClass].variant;
    const alertIcon = ALERT_VARIANTS[statusClass].icon;
    const {setInformationMessage} = useAppContext();
    const doShow = message && message.show ? "show" : "";

    useEffect(() => {
        setCounter(INFORMATION_MESSAGE_MAX_AGE);
    }, [messageText]);

    const closeInformationMessage = useCallback(() => {
        setCounter(INFORMATION_MESSAGE_MAX_AGE);
        setInformationMessage(null);
        setPauseCounter(false);
    }, [setInformationMessage]);

    useEffect(() => {
        if (message && message.show && !pauseCounter) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 100);
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
                <div className={"w-100"}>
                    <p className={"mb-2 me-5 me-sm-4"}>{messageText}</p>
                    {
                        !pauseCounter &&
                        <>
                            <p className={"small d-block mb-1"}>{MESSAGES.INFO.WILL_CLOSE}</p>
                            <ProgressBar variant={alertVariant} now={counter}/>
                        </>
                    }
                </div>
            </div>
            <div className={"position-absolute top-0 end-0 p-2"}>
                {
                    !pauseCounter &&
                    <button type="button" className="p-1 btn text-black-50" aria-label={LABELS_AND_HEADINGS.PAUSE}
                            onClick={() => setPauseCounter(!pauseCounter)}>
                        <Icon icon={faPause} className={"fa-lg sms-icon--hovering"}/>
                    </button>
                }
                <button type="button" className="p-1 btn text-black-50" aria-label={LABELS.COMMON.CLOSE}
                        onClick={() => closeInformationMessage()}>
                    <Icon icon={faTimes} className={"fa-lg sms-icon--hovering"}/>
                </button>
            </div>
        </div>
    )
}
