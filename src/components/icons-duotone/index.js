import React from "react";
import {
    faShieldCat,
    faHouse,
    faFile,
    faChartLine,
    faGears,
    faFiles,
    faBuildingColumns,
    faFileImage,
    faListTimeline,
    faComet
} from "@fortawesome/pro-duotone-svg-icons";
import {Icon} from "../icons";

export const AdminIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faShieldCat} size={size} className={className}/>
    )
}

export const DashboardIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faChartLine} size={size} className={className}/>
    )
}

export const DataIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faListTimeline} size={size} className={className}/>
    )
}

export const ImageIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFileImage} size={size} className={className}/>
    )
}

export const IssuesIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFiles} size={size} className={className}/>
    )
}

export const IssueIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFile} size={size} className={className}/>
    )
}

export const LogoIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faComet} size={size} className={className}/>
    )
}

export const PublishersIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faBuildingColumns} size={size} className={className}/>
    )
}

export const SettingsIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faGears} size={size} className={className}/>
    )
}

export const StartIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faHouse} size={size} className={className}/>
    )
}

export const TitlesIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFiles} size={size} className={className}/>
    )
}

export const TitleIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFile} size={size} className={className}/>
    )
}
