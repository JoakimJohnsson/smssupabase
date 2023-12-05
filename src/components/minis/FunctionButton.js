import React from "react";
import {Icon} from "../icons";


export const FunctionButton = ({customClass, variant, onClick, label, icon, showLabel = true}) => {

    const defaultClass = `btn btn-outline-${variant} sms-function-btn ms-0 me-2 mb-3`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <button onClick={onClick} className={className}>
            <Icon icon={icon} className={"fa-xl fa-fw"}/> {showLabel && <span className={"mx-3"}>{label}</span>}
        </button>
    )
}
