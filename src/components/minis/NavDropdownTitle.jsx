import React from "react";
import {Icon} from "../icons";


export const NavDropdownTitle = ({icon, label}) => {
    return (
        <>
            <Icon icon={icon} size={"2x"}/>
            <span>{label}</span>
        </>
    )
}
