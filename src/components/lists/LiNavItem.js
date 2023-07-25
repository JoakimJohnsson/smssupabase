import {NavLink} from "react-router-dom";
import React from "react";

export const LiNavItem = ({route, onClick, icon, text, customClass}) => {

    const defaultClass = "nav-item";
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <li className={className}>
            <NavLink exact={"true"} to={route} className={"nav-link"} onClick={onClick}>
                {icon}
                <span className={"sms-nav-link--text"}>{text}</span>
            </NavLink>
        </li>
    )
}
