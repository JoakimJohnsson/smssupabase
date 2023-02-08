import React from "react";
import {ArrowLeftIcon} from "@heroicons/react/solid";


export const ArrowLeftButton = ({customClass, onClick, label}) => {

    const className = customClass ? "btn btn-outline-primary " + customClass : "btn btn-outline-primary";

    return (
        <button onClick={onClick} className={className} aria-label={label}>
            <ArrowLeftIcon className="sms-icon--text-lg"/><span>{label}</span>
        </button>
    )
}
