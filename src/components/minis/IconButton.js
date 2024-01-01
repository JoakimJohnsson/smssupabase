import React from "react";
import {Icon} from "../icons";

export const IconButton = ({customClass, variant, onClick, label, icon, disabled = false}) => {

    const defaultClass = `btn btn-${variant} sms-btn`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <button onClick={onClick} className={className} aria-label={label} disabled={disabled}>
            <Icon icon={icon} className={"me-2"}/><span>{label}</span>
        </button>
    )
}
