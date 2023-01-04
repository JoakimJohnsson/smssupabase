import React from "react";
import {MESSAGES} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {XIcon} from "@heroicons/react/solid";

export const Information = ({message}) => {
    const statusClass = message.status ? message.status.toString().charAt(0) : 1;
    const alertVariants = {
        1: "info",
        2: "success",
        3: "warning",
        4: "danger",
        5: "danger"
    }
    const alertVariant = alertVariants[statusClass];
    const {setInformationMessage} = useAppContext();

    return message && message.show && (
        <>
            <div className={`alert alert-${alertVariant} alert-dismissible fade show sms-information-message`} role={"alert"}>
                {/*Optional info*/}
                {/*<p>Status: {message.status}.</p>*/}
                {/*{*/}
                {/*    message.error ?*/}
                {/*        <>*/}
                {/*            <p>Error: ...{message.error.message}.</p>*/}
                {/*            <p>Details: {message.error.details}</p>*/}
                {/*        </>*/}
                {/*        :*/}
                {/*        ""*/}
                {/*}*/}
                {MESSAGES.CODES[message.status]}
                <button type="button" className="position-absolute top-0 end-0 p-2 btn sms-icon-btn text-black-50" data-bs-dismiss="alert"
                        aria-label="Stäng"
                        onClick={() => setInformationMessage(MESSAGES.EMPTY)}>
                    <XIcon className={"sms-icon--hamburger"}/>
                </button>
            </div>
        </>
    )
}
