import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDownToArc,
    faArrowRightFromArc,
    faBadge,
    faBellExclamation,
    faBomb,
    faBuildingColumns,
    faCalendarHeart,
    faChartLine,
    faClipboardListCheck,
    faComet,
    faEarthAmericas,
    faEye,
    faEyeSlash,
    faFile,
    faFiles,
    faFileImage,
    faFileLines,
    faGears,
    faHeartCirclePlus,
    faHeartCrack,
    faHouse,
    faKey,
    faListTimeline,
    faLink,
    faLightbulbOn,
    faMosquito,
    faMagnifyingGlassDollar,
    faMoneyCheckPen,
    faRectangleHistoryCirclePlus,
    faSend,
    faShield,
    faShieldCat,
    faTriangleExclamation,
    faTypewriter,
    faUser,
    faUsers
} from "@fortawesome/pro-regular-svg-icons";

const iconMap = {
    faArrowDownToArc: faArrowDownToArc,
    faArrowRightFromArc: faArrowRightFromArc,
    faBadge: faBadge,
    faBellExclamation: faBellExclamation,
    faBomb: faBomb,
    faBuildingColumns: faBuildingColumns,
    faCalendarHeart: faCalendarHeart,
    faChartLine: faChartLine,
    faClipboardListCheck: faClipboardListCheck,
    faComet: faComet,
    faEarthAmericas: faEarthAmericas,
    faEye: faEye,
    faEyeSlash: faEyeSlash,
    faFile: faFile,
    faFiles: faFiles,
    faFileImage: faFileImage,
    faFileLines: faFileLines,
    faGears: faGears,
    faHeartCirclePlus: faHeartCirclePlus,
    faHeartCrack: faHeartCrack,
    faHouse: faHouse,
    faKey: faKey,
    faListTimeline: faListTimeline,
    faLink: faLink,
    faLightbulbOn: faLightbulbOn,
    faMosquito: faMosquito,
    faMagnifyingGlassDollar: faMagnifyingGlassDollar,
    faMoneyCheckPen: faMoneyCheckPen,
    faRectangleHistoryCirclePlus: faRectangleHistoryCirclePlus,
    faSend: faSend,
    faShield: faShield,
    faShieldCat: faShieldCat,
    faTriangleExclamation: faTriangleExclamation,
    faTypewriter: faTypewriter,
    faUser: faUser,
    faUsers: faUsers,
}

export const getIconByName = (iconName) => {
    return iconMap[iconName] || null;
}

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

export const EditIcon = ({size, className}) => {
    return (
        <Icon icon={faMoneyCheckPen} size={size} className={className}/>
    )
}

export const GlobalIcon = ({size, className}) => {
    return (
        <Icon icon={faEarthAmericas} size={size} className={className}/>
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

export const LinkIcon = ({size, className}) => {
    return (
        <Icon icon={faLink} size={size} className={className}/>
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
export const MarvelKlubbenIcon = ({size, className}) => {
    return (
        <Icon icon={faBadge} size={size} className={className}/>
    )
}

export const PublishersIcon = ({size, className}) => {
    return (
        <Icon icon={faBuildingColumns} size={size} className={className}/>
    )
}

export const publishersIcon = faBuildingColumns;

export const RegisterIcon = ({size, className}) => {
    return (
        <Icon icon={faHeartCirclePlus} size={size} className={className}/>
    )
}

export const SendIcon = ({size, className}) => {
    return (
        <Icon icon={faSend} size={size} className={className}/>
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

export const StatusIconRead = ({size, className}) => {
    return (
        <Icon icon={faEye} size={size} className={className}/>
    )
}

export const StatusIconUnRead = ({size, className}) => {
    return (
        <Icon icon={faEyeSlash} size={size} className={className}/>
    )
}

export const StatusIconTodo = ({size, className}) => {
    return (
        <Icon icon={faBellExclamation} size={size} className={className}/>
    )
}

export const TitlesIcon = ({size, className}) => {
    return (
        <Icon icon={faFiles} size={size} className={className}/>
    )
}

export const titlesIcon = faFiles;

export const TitleIcon = ({size, className}) => {
    return (
        <Icon icon={faFile} size={size} className={className}/>
    )
}

export const titleIcon = faFile;

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
