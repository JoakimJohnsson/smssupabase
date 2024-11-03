import React from "react";
import {Icon} from "../icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


export const FunctionButton = ({customClass, variant, onClick, label, icon, showLabel = true, disabled = false}) => {

    const defaultClass = `sms-function-btn ${variant}`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return showLabel ?
        <button onClick={onClick} className={className} disabled={disabled} aria-label={label}>
            {icon && <Icon icon={icon} className={"fa-xl fa-fw"}/>}
            {showLabel && <span className={"mx-3"}>{label}</span>}
        </button>
        :
        <OverlayTrigger
            key={"func-btn-tooltip"}
            placement={"top"}
            overlay={
                <Tooltip id={"func-btn-tooltip"}>
                    {label}
                </Tooltip>
            }
        >
            <button onClick={onClick} className={className} disabled={disabled} aria-label={label}>
                {icon && <Icon icon={icon} className={"fa-xl fa-fw"}/>}
                {showLabel && <span className={"mx-3"}>{label}</span>}
            </button>
        </OverlayTrigger>

}
