import React from "react";
import {
    DocumentIcon,
    LibraryIcon, PhotographIcon
} from "@heroicons/react/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShieldCat, faHouse, faChartLine, faGear, faFiles} from "@fortawesome/pro-regular-svg-icons";

export const Icon = ({icon, size, className}) => {
    return (
        <FontAwesomeIcon icon={icon} size={size} className={className}/>
    )
}

export const AdminIcon = ({size, className}) => {
    return (
        <Icon icon={faShieldCat} size={size} className={className}/>
    )
}

export const DashboardIcon = ({size, className}) => {
    return (
        <Icon icon={faChartLine} size={size} className={className}/>
    )
}

export const PublishersIcon = ({textVariant}) => {
    const className = textVariant ? "sms-icon--text-" + textVariant : "";
    return (
        <LibraryIcon className={className}/>
    )
}

export const SettingsIcon = ({size, className}) => {
    return (
        <Icon icon={faGear} size={size} className={className}/>
    )
}

export const StartIcon = ({size, className}) => {
    return (
        <Icon icon={faHouse} size={size} className={className}/>
    )
}

export const TitlesIcon = ({size, className}) => {
    return (
        <Icon icon={faFiles} size={size} className={className}/>
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
