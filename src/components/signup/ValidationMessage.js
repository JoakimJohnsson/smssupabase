import React from "react";
import {faBadgeCheck, faOctagonExclamation} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons";

const ValidationMessage = ({success, message}) => {
    return (
        message !== "" &&
        <p className={"form-text"}>
            {success ?
                <Icon icon={faBadgeCheck} size={"1x"} className={"text-success me-2"}/>
                :
                <Icon icon={faOctagonExclamation} size={"1x"} className={"text-danger me-2"}/>
            }
            {message}
        </p>
    )
}

export default ValidationMessage;
