import React from "react";
import {
    DocumentDuplicateIcon,
    DocumentIcon,
    LibraryIcon, PhotographIcon
} from "@heroicons/react/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShieldCat, faHouse, faChartLine, faGear} from "@fortawesome/pro-regular-svg-icons";

export const Icon = ({icon, size}) => {
    return (
        <FontAwesomeIcon icon={icon} size={size}/>
    )
}

export const AdminIcon = ({size}) => {
    return (
        <Icon icon={faShieldCat} size={size}/>
    )
}

export const DashboardIcon = ({size}) => {
    return (
        <Icon icon={faChartLine} size={size}/>
    )
}

export const PublishersIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <LibraryIcon className={className}/>
    )
}

export const SettingsIcon = ({size}) => {
    return (
        <Icon icon={faGear} size={size}/>
    )
}

export const StartIcon = ({size}) => {
    return (
        <Icon icon={faHouse} size={size}/>
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

export const ImageIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <PhotographIcon className={className}/>
    )
}
