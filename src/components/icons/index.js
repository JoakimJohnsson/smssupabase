import React from "react";
import {
    CogIcon,
    DocumentDuplicateIcon,
    DocumentIcon,
    HomeIcon,
    LibraryIcon,
    PresentationChartLineIcon,
    ShieldExclamationIcon
} from "@heroicons/react/solid";

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

export const PublishersIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <LibraryIcon className={className}/>
    )
}

export const SettingsIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <CogIcon className={className}/>
    )
}

export const StartIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <HomeIcon className={className}/>
    )
}

export const TitlesIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <DocumentDuplicateIcon className={className}/>
    )
}

export const IssuesIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <DocumentIcon className={className}/>
    )
}