import {NavLink} from "react-router-dom";
import React from "react";
import {faBellOn, faLightbulbOn} from "@fortawesome/pro-solid-svg-icons";
import {Icon} from "../icons";

export const LiNavItem = ({route, onClick, icon, text, customClass, showUserNotification = false, showAdminNotification = false}) => {

    const defaultClass = "nav-item";
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <li className={className}>
            <NavLink exact={"true"} to={route} className={"nav-link"} onClick={onClick}>
                {icon}
                <span className={"sms-nav-link--text"}>{text}</span>
                {
                    showUserNotification &&
                    <div className="message-notification">
                        <Icon icon={faLightbulbOn} className={"fa-fw m-0 text-white"}/>
                    </div>
                }
                {
                    showAdminNotification &&
                    <div className="message-notification">
                        <Icon icon={faBellOn} className={"fa-fw m-0 text-title"}/>
                    </div>
                }
            </NavLink>
        </li>
    )
}
