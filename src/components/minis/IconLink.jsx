import React from "react";
import {Icon} from "../icons";
import {Link} from "react-router-dom";


export const IconLink = ({customClass, variant, path, label, icon}) => {

    const defaultClass = `btn btn-${variant} sms-btn`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <Link className={className} to={path}>
            <Icon icon={icon} className={"me-2"}/>
            <span>
                {label}
            </span>
        </Link>
    )
}
