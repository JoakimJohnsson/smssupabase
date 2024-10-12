import React from "react";
import {NavLink} from "react-router-dom";


export const FooterDashboardNavLink = ({route, variant, icon, text}) => {
    const className = "nav-item nav-link";
    return (
        <NavLink to={route} className={className + " " + variant} title={text}>
            <div className={"d-flex flex-column align-items-center justify-content-center w-100"}>
                {icon}
                <span className={"footer-navlink-text"}>{text}</span>
            </div>
        </NavLink>
    )
}
