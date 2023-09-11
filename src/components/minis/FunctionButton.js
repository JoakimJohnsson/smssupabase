import React from "react";
import {Icon} from "../icons";


export const FunctionButton = ({customClass, variant, onClick, label, icon}) => {

    const defaultClass = `btn btn-outline-${variant} sms-function-btn ms-0 me-2`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <button onClick={onClick} className={className}>
            <Icon icon={icon} className={"fa-xl fa-fw"}/> <span className={"mx-3"}>{label}</span>
        </button>
    )
}
