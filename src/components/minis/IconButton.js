import React from "react";
import {Icon} from "../icons";

export const IconButton = ({customClass, variant, onClick, label, icon}) => {

    const defaultClass = `btn btn-${variant} sms-btn`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <button onClick={onClick} className={className} aria-label={label}>
            <Icon icon={icon} className={"me-2"}/><span>{label}</span>
        </button>
    )
}
