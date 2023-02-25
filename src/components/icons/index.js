import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
    faComet,
    faListTimeline,
    faRectangleHistoryCirclePlus,
    faClipboardListCheck,
    faMagnifyingGlassDollar,
    faArrowDownToArc,
    faArrowRightFromArc,
    faHeartCirclePlus,
    faCalendarHeart,
    faUser,
    faUsers,
    faKey
} from "@fortawesome/pro-regular-svg-icons";


export const Icon = ({icon, size, className, spin = false}) => {
    return (
        <FontAwesomeIcon icon={icon} size={size} className={className} spin={spin}/>
    )
}

export const AdminIcon = ({size, className}) => {
    return (
        <Icon icon={faShieldCat} size={size} className={className}/>
    )
}

export const NotAdminIcon = ({size, className}) => {
    return (
        <Icon icon={faShield} size={size} className={className}/>
    )
}

export const DateIcon = ({size, className}) => {
    return (
        <Icon icon={faCalendarHeart} size={size} className={className}/>
    )
}

export const CollectionPlusIcon = ({size, className}) => {
    return (
        <Icon icon={faRectangleHistoryCirclePlus} size={size} className={className}/>
    )
}

export const CollectionCheckIcon = ({size, className}) => {
    return (
        <Icon icon={faClipboardListCheck} size={size} className={className}/>
    )
}

export const CollectionSearchIcon = ({size, className}) => {
    return (
        <Icon icon={faMagnifyingGlassDollar} size={size} className={className}/>
    )
}

export const DashboardIcon = ({size, className}) => {
    return (
        <Icon icon={faChartLine} size={size} className={className}/>
    )
}

export const DataIcon = ({size, className}) => {
    return (
        <Icon icon={faListTimeline} size={size} className={className}/>
    )
}

export const ImageIcon = ({size, className}) => {
    return (
        <Icon icon={faFileImage} size={size} className={className}/>
    )
}

export const IssueIcon = ({size, className}) => {
    return (
        <Icon icon={faFileLines} size={size} className={className}/>
    )
}

export const KeyIcon = ({size, className}) => {
    return (
        <Icon icon={faKey} size={size} className={className}/>
    )
}

export const LoginIcon = ({size, className}) => {
    return (
        <Icon icon={faArrowDownToArc} size={size} className={className}/>
    )
}

export const LogoutIcon = ({size, className}) => {
    return (
        <Icon icon={faArrowRightFromArc} size={size} className={className}/>
    )
}

export const LogoIcon = ({size, className}) => {
    return (
        <Icon icon={faComet} size={size} className={className}/>
    )
}

export const PublishersIcon = ({size, className}) => {
    return (
        <Icon icon={faBuildingColumns} size={size} className={className}/>
    )
}

export const RegisterIcon = ({size, className}) => {
    return (
        <Icon icon={faHeartCirclePlus} size={size} className={className}/>
    )
}

export const SettingsIcon = ({size, className}) => {
    return (
        <Icon icon={faGears} size={size} className={className}/>
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

export const UsersIcon = ({size, className}) => {
    return (
        <Icon icon={faUsers} size={size} className={className}/>
    )
}

export const UserIcon = ({size, className}) => {
    return (
        <Icon icon={faUser} size={size} className={className}/>
    )
}
