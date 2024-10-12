import React from "react";
import {Icon} from "../icons";


export const IconLinkCta = ({customClass, variant, path, label, icon}) => {

    const defaultClass = `btn btn-${variant} btn-cta`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <a href={path} className={className}>
            <Icon icon={icon} className={"btn-cta--icon"}/>
            <span>
                {label}
            </span>
        </a>
    )
}


