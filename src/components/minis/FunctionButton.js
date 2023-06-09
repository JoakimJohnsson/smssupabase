import React from "react";
import {Icon} from "../icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


export const FunctionButton = ({customClass, variant, onClick, label, icon, id}) => {

    const defaultClass = `btn btn-${variant} sms-function-btn ms-0`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <OverlayTrigger
            key={id}
            placement={"top"}
            overlay={
                <Tooltip id={id}>
                    {label}
                </Tooltip>
            }
        >
            <button onClick={onClick} className={className} aria-label={label}>
                <Icon icon={icon} className={"fa-xl fa-fw"}/>
            </button>
        </OverlayTrigger>

    )
}
