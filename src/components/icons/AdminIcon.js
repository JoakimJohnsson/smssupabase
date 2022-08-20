import React from "react";
import {ShieldExclamationIcon} from "@heroicons/react/solid";


export const AdminIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <ShieldExclamationIcon className={className}/>
    )
}
