import React from "react";
import {PresentationChartLineIcon, ShieldExclamationIcon} from "@heroicons/react/solid";

export const AdminIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <ShieldExclamationIcon className={className}/>
    )
}

export const DashboardIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <PresentationChartLineIcon className={className}/>
    )
}