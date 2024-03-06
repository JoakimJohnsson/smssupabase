import React from "react";
import {NavLink} from "react-router-dom";

export const FooterDashboardNavLink = ({route, variant, icon, text, handleClick}) => {
    const className = "nav-item nav-link";
    return (
        <NavLink to={route} className={className + " " + variant} onClick={handleClick}>
            <div
                className={"d-flex align-items-center justify-content-center " +
                    "justify-content-lg-start  flex-column flex-sm-column flex-lg-row w-100"}>
                {icon}
                <span className={"footer-navlink-text"}>{text}</span>
            </div>
        </NavLink>
    )
}
