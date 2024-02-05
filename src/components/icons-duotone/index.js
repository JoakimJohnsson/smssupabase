import React from "react";
import {
    faShieldCat,
    faShield,
    faHouse,
    faFile,
    faFileLines,
    faFloppyDisk,
    faChartLine,
    faCommentsQuestion,
    faGears,
    faFiles,
    faFaceExplode,
    faBuildingColumns,
    faFileImage,
    faListTimeline,
    faComet,
    faEyeSlash,
    faBellExclamation,
    faArrowDownToArc,
    faArrowRightFromArc,
    faHeartCirclePlus,
    faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser,
    faPresentationScreen,
    faClipboardListCheck,
    faMagnifyingGlassDollar,
    faCalendarHeart,
    faTypewriter,
    faLightbulbOn,
    faHeartCrack,
    faMosquito,
    faBomb,
    faSackDollar,
    faTriangleExclamation,
    faEarthAmericas,
    faMoneyCheckPen,
    faUser,
    faUsers,
    faKey
} from "@fortawesome/pro-duotone-svg-icons";
import {Icon} from "../icons";

const iconMap = {
    faShieldCat: faShieldCat,
    faShield: faShield,
    faHouse: faHouse,
    faFile: faFile,
    faFileLines: faFileLines,
    faChartLine: faChartLine,
    faCommentsQuestion: faCommentsQuestion,
    faGears: faGears,
    faEyeSlash: faEyeSlash,
    faBellExclamation: faBellExclamation,
    faFiles: faFiles,
    faFaceExplode: faFaceExplode,
    faFloppyDisk: faFloppyDisk,
    faBuildingColumns: faBuildingColumns,
    faFileImage: faFileImage,
    faListTimeline: faListTimeline,
    faComet: faComet,
    faArrowDownToArc: faArrowDownToArc,
    faArrowRightFromArc: faArrowRightFromArc,
    faHeartCirclePlus: faHeartCirclePlus,
    faRectangleHistoryCirclePlus: faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser: faRectangleHistoryCircleUser,
    faPresentationScreen: faPresentationScreen,
    faTypewriter: faTypewriter,
    faLightbulbOn: faLightbulbOn,
    faHeartCrack: faHeartCrack,
    faMosquito: faMosquito,
    faClipboardListCheck: faClipboardListCheck,
    faMagnifyingGlassDollar: faMagnifyingGlassDollar,
    faMoneyCheckPen: faMoneyCheckPen,
    faCalendarHeart: faCalendarHeart,
    faSackDollar: faSackDollar,
    faTriangleExclamation: faTriangleExclamation,
    faEarthAmericas: faEarthAmericas,
    faBomb: faBomb,
    faUser: faUser,
    faUsers: faUsers,
    faKey: faKey
}

export const getDuoToneIconByName = (iconName) => {
    return iconMap[iconName] || null;
}

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

export const EditIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faMoneyCheckPen} size={size} className={className}/>
    )
}

export const editIconDuoTone = faMoneyCheckPen;

export const InfoIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={infoIconDuoTone} size={size} className={className}/>
    )
}

export const infoIconDuoTone = faFaceExplode;

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

export const GlobalIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faEarthAmericas} size={size} className={className}/>
    )
}

export const ImageIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faFileImage} size={size} className={className}/>
    )
}

export const IssueIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={issueIconDuoTone} size={size} className={className}/>
    )
}
export const issueIconDuoTone = faFileLines;

export const QuestionIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faCommentsQuestion} size={size} className={className}/>
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
        <Icon icon={loginIconDuoTone} size={size} className={className}/>
    )
}

export const loginIconDuoTone = faArrowDownToArc;

export const LogoutIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faArrowRightFromArc} size={size} className={className}/>
    )
}
export const OtherCollectionsIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={otherCollectionsIconDuoTone} size={size} className={className}/>
    )
}

export const otherCollectionsIconDuoTone = faRectangleHistoryCircleUser;

export const OverviewIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={overviewIconDuoTone} size={size} className={className}/>
    )
}

export const overviewIconDuoTone = faPresentationScreen;

export const PublishersIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={publishersIconDuoTone} size={size} className={className}/>
    )
}

export const publishersIconDuoTone = faBuildingColumns;

export const RegisterIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={registerIconDuoTone} size={size} className={className}/>
    )
}

export const registerIconDuoTone = faHeartCirclePlus;

export const SaveIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={saveIconDuoTone} size={size} className={className}/>
    )
}

export const saveIconDuoTone = faFloppyDisk;

export const SettingsIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={settingsIconDuoTone} size={size} className={className}/>
    )
}

export const settingsIconDuoTone = faGears;

export const StartIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faHouse} size={size} className={className}/>
    )
}

export const StatusIconActiveDuoTone = ({size, className}) => {
    return (
        <Icon icon={statusIconActiveDuoTone} size={size} className={className}/>
    )
}

export const statusIconActiveDuoTone = faLightbulbOn;

export const StatusIconUnReadDuoTone = ({size, className}) => {
    return (
        <Icon icon={statusIconUnreadDuoTone} size={size} className={className}/>
    )
}

export const statusIconUnreadDuoTone = faEyeSlash;

export const StatusIconTodoDuoTone = ({size, className}) => {
    return (
        <Icon icon={statusIconTodoDuoTone} size={size} className={className}/>
    )
}

export const statusIconTodoDuoTone = faBellExclamation;

export const TitlesIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={titlesIconDuoTone} size={size} className={className}/>
    )
}

export const titlesIconDuoTone = faFiles;

export const TitleIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={titleIconDuoTone} size={size} className={className}/>
    )
}
export const titleIconDuoTone = faFile;

export const UsersIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={usersIconDuoTone} size={size} className={className}/>
    )
}

export const usersIconDuoTone = faUsers;

export const UserIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faUser} size={size} className={className}/>
    )
}

export const userIconDuoTone = faUser;

export const ValueIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={valueIconDuoTone} size={size} className={className}/>
    )
}

export const valueIconDuoTone = faSackDollar;
