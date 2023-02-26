import React from "react";
import {
    faShieldCat,
    faShield,
    faHouse,
    faFile,
    faFileLines,
    faChartLine,
    faGears,
    faFiles,
    faBuildingColumns,
    faFileImage,
    faListTimeline,
    faComet,
    faArrowDownToArc,
    faArrowRightFromArc,
    faHeartCirclePlus,
    faRectangleHistoryCirclePlus,
    faClipboardListCheck,
    faMagnifyingGlassDollar,
    faCalendarHeart,
    faUser,
    faUsers,
    faKey
} from "@fortawesome/pro-duotone-svg-icons";
import {Icon} from "../icons";


export const AdminIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faShieldCat} size={size} className={className}/>
    )
}

export const NotAdminIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faShield} size={size} className={className}/>
    )
}

export const DashboardIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faChartLine} size={size} className={className}/>
    )
}

export const DateIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faCalendarHeart} size={size} className={className}/>
    )
}

export const CollectionPlusIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faRectangleHistoryCirclePlus} size={size} className={className}/>
    )
}

export const CollectionCheckIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faClipboardListCheck} size={size} className={className}/>
    )
}

export const CollectionSearchIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faMagnifyingGlassDollar} size={size} className={className}/>
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

export const IssueIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFileLines} size={size} className={className}/>
    )
}
export const KeyIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faKey} size={size} className={className}/>
    )
}

export const LogoIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faComet} size={size} className={className}/>
    )
}

export const LoginIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faArrowDownToArc} size={size} className={className}/>
    )
}

export const LogoutIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faArrowRightFromArc} size={size} className={className}/>
    )
}

export const PublishersIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faBuildingColumns} size={size} className={className}/>
    )
}

export const publishersIconDuoTone = faBuildingColumns;

export const RegisterIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faHeartCirclePlus} size={size} className={className}/>
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

export const titlesIconDuoTone = faFiles;

export const TitleIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFile} size={size} className={className}/>
    )
}

export const titleIconDuoTone = faFile;

export const UsersIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faUsers} size={size} className={className}/>
    )
}

export const UserIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faUser} size={size} className={className}/>
    )
}
