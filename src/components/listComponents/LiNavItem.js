import {NavLink} from "react-router-dom";
import React from "react";

const LiNavItem = ({route, onClick, icon, text}) => {

    return (
        <li className="nav-item">
            <NavLink exact to={route} className={"nav-link"} onClick={onClick}>
                {icon}
                <span className={"sms-nav-link--text"}>{text}</span>
            </NavLink>
        </li>
    )
}

export default LiNavItem;