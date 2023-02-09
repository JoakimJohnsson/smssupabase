import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShieldCat, faHouse, faFile, faChartLine, faGear, faFiles, faBuildingColumns, faFileImage} from "@fortawesome/pro-regular-svg-icons";

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

export const ImageIcon = ({size, className}) => {
    return (
        <Icon icon={faFileImage} size={size} className={className}/>
    )
}

export const IssuesIcon = ({size, className}) => {
    return (
        <Icon icon={faFiles} size={size} className={className}/>
    )
}

export const IssueIcon = ({size, className}) => {
    return (
        <Icon icon={faFile} size={size} className={className}/>
    )
}

export const PublishersIcon = ({size, className}) => {
    return (
        <Icon icon={faBuildingColumns} size={size} className={className}/>
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

export const TitleIcon = ({size, className}) => {
    return (
        <Icon icon={faFile} size={size} className={className}/>
    )
}
