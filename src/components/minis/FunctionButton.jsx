import React from "react";
import {Icon} from "../icons";


export const FunctionButton = ({customClass, variant, onClick, label, icon, showLabel = true, disabled = false}) => {

    const defaultClass = `sms-function-btn ${variant}`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <button onClick={onClick} className={className} disabled={disabled} aria-label={label}>
            {icon && <Icon icon={icon} className={"fa-xl fa-fw"}/>}
            {showLabel && <span className={"mx-3"}>{label}</span>}
        </button>
    )
}
