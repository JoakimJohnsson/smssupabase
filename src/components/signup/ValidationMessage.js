import React from "react";
import {CheckCircleIcon, ExclamationCircleIcon} from "@heroicons/react/solid";

const ValidationMessage = ({success, message}) => {
    return (
        message !== "" &&
        <p className={"form-text"}>
            {success ?
                <CheckCircleIcon className={"sms-icon--text-md text-success"}/>
                :
                <ExclamationCircleIcon className={"sms-icon--text-md text-danger"}/>
            }
            {message}
        </p>
    )
}

export default ValidationMessage;
