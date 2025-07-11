import React from "react";
import {Icon} from "../../../icons/index.jsx";
import {faLocationXmark, faLocationSmile} from "@fortawesome/pro-solid-svg-icons";


export const SmsMapCustomPin = ({isDestination = false}) => {

    const icon = isDestination ? faLocationXmark : faLocationSmile;
    const location = isDestination ? "Mål" : "Start";

    return (
        <div className={"sms-custom-pin"}>
            <p className={"location-text"}>{location}</p>
            <Icon icon={icon}/>
        </div>
    )
}
