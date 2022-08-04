import React from "react";
import {NavLink} from "react-router-dom";

export const SidebarNavLink = ({route, variant, icon, text}) => {
    const className = "nav-item nav-link";
    return (
        <NavLink to={route} className={className + ' ' + variant}>
            <div
                className={'d-flex align-items-center justify-content-center justify-content-sm-start justify-content-md-center ' +
                    'justify-content-lg-start  flex-column flex-sm-row flex-md-column flex-lg-row w-100'}>
                {icon}
                <span className={'sidebar-navlink-text'}>{text}</span>
            </div>
        </NavLink>
    )
}
