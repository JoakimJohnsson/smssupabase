import React from "react";
import {PlusIcon} from "@heroicons/react/solid";

export const PlusButton = ({customClass, onClick, label}) => {

    const className = "btn btn-primary " + customClass;

    return (
        <button onClick={onClick} className={className} aria-label={label}>
            <PlusIcon className="sms-icon--text-lg"/><span>{label}</span>
        </button>
    )
}
