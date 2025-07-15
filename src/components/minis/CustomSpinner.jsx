import React from "react";
import {faSpinner} from "@fortawesome/pro-regular-svg-icons";
import {Icon} from "../icons/Icons.jsx";

export const CustomSpinner = ({size, color, className}) => {
    let spinnerClass = "";
    if (className) {
        spinnerClass += className + " ";
    }
    if (color) {
        spinnerClass += color;
    }

    return (
        <Icon icon={faSpinner} size={size} className={spinnerClass} spin/>
    )
}
