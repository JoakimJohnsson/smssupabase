import React from "react";
import {Icon} from "../icons/Icons.jsx";


export const NavDropdownTitle = ({icon, label}) => {
    return (
        <>
            <span>{label}</span>
            <Icon className={"ms-1"} icon={icon} size={"2x"}/>
        </>
    )
}
