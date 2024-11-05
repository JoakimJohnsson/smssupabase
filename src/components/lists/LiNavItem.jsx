import {NavLink} from "react-router-dom";
import React from "react";
import {Icon} from "../icons";
import {useAppContext} from "../../context/AppContext";
import {faBellExclamation, faEyeSlash, faLightbulbOn} from "@fortawesome/pro-regular-svg-icons";

export const LiNavItem = ({
                              route,
                              onClick,
                              icon,
                              text,
                              customClass,
                              doShowNotification = false,
                              isUserNotification = false,
                              isAdminNotification = false
                          }) => {

    const defaultClass = "nav-item";
    const className = customClass ? defaultClass + " " + customClass : defaultClass;
    const {showUserNotification, showAdminNotification, showAdminTodoNotification} = useAppContext();


    return (
        <li className={className}>
            <NavLink exact={"true"} to={route} className={`nav-link ${customClass}`} onClick={onClick}>
                {icon}
                <span className={"sms-nav-link--text"}>{text}</span>
                {
                    doShowNotification && isUserNotification && showUserNotification &&
                    <div className="message-notification">
                        <Icon icon={faLightbulbOn} className={"fa-fw m-0 text-white"}/>
                    </div>
                }
                {
                    doShowNotification && isAdminNotification && showAdminNotification && !showAdminTodoNotification &&
                    <div className="message-notification">
                        <Icon icon={faEyeSlash} className={"fa-fw m-0 text-danger"}/>
                    </div>
                }
                {
                    doShowNotification && isAdminNotification && showAdminTodoNotification &&
                    <div className="message-notification">
                        <Icon icon={faBellExclamation} className={"fa-fw m-0 text-title"}/>
                    </div>
                }
            </NavLink>
        </li>
    )
}
