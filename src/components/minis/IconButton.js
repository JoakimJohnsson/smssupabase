import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconButton = ({customClass, variant, onClick, label, icon}) => {

    const defaultClass = `btn btn-${variant} d-flex align-items-center`;
    const className = customClass ? defaultClass + " " + customClass : defaultClass;

    return (
        <button onClick={onClick} className={className} aria-label={label}>
            <FontAwesomeIcon className={"me-2"} icon={icon}/><span>{label}</span>
        </button>
    )
}
