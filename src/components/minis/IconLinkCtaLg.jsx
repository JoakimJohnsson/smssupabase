import React from "react";
import {Icon} from "../icons";
import {Link} from "react-router-dom";


export const IconLinkCtaLg = ({customClass, variant, path, label, icon}) => {

    const defaultClass = `btn btn-${variant} btn-cta btn-cta__lg`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <Link to={path} className={className}>
            <Icon icon={icon} size={"2x"} className={"btn-cta--icon"}/>
            <span>
                {label}
            </span>
        </Link>
    )
}


