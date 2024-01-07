import React from "react";
import {Icon} from "../icons";
import {CustomSpinner} from "./CustomSpinner";

export const IconButton = ({customClass, variant, onClick, label, icon, disabled = false, loading = false}) => {

    const defaultClass = `btn btn-${variant} sms-btn`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <button onClick={onClick} className={className} aria-label={label} disabled={disabled}>
            {
                loading ?
                    <CustomSpinner size={"1x"} className={"me-2"}/>
                    :
                    <Icon icon={icon} className={"me-2"}/>

            }
            <span>{label}</span>
        </button>
    )
}
