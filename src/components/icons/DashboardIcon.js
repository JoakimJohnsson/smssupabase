import React from "react";
import {PresentationChartLineIcon} from "@heroicons/react/solid";


export const DashboardIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <PresentationChartLineIcon className={className}/>
    )
}
