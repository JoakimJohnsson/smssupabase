import React from "react";
import {CheckCircleIcon, ExclamationCircleIcon} from "@heroicons/react/solid";

const SignupValidationMessage = ({success, message}) => {
    return (
        message !== "" ?
            <p className={"form-text"}>

                {success ?
                    <CheckCircleIcon className={"sms-icon--text"}/>
                    :
                    <ExclamationCircleIcon className={"sms-icon--text"}/>
                }
                {message}
            </p>
            :
            false
    )
}

export default SignupValidationMessage;
