import React from "react";
import {Icon} from "../icons/Icons.jsx";
import {Link} from "react-router-dom";


export const IconLinkCtaLg = ({ customClass, variant, path, label, icon }) => {
    const defaultClass = `btn btn-${variant} btn-cta btn-cta__lg`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;
    const isAnchorLink = path.startsWith("#");

    const content = (
        <>
            <div className={`btn-cta--icon-wrapper bg-${variant}--darker border border-3 border-${variant}`}>
                <Icon icon={icon} size={"2x"} className={`btn-cta--icon text-${variant}--lighter`} />
            </div>
            <span className={"pt-4"}>{label}</span>
        </>
    );

    return isAnchorLink ? (
        <a href={path} className={className}>
            {content}
        </a>
    ) : (
        <Link to={path} className={className}>
            {content}
        </Link>
    );
};


