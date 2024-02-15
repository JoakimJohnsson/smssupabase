import React from "react";
import {
    faArrowDownToArc,
    faArrowRightFromArc,
    faBellExclamation,
    faBomb,
    faBuildingColumns,
    faClipboardListCheck,
    faCalendarHeart,
    faChartLine,
    faCircleInfo,
    faComet,
    faCommentsQuestion,
    faEarthAmericas,
    faEyeSlash,
    faFaceExplode,
    faFile,
    faFileImage,
    faFiles,
    faFileLines,
    faFloppyDisk,
    faGears,
    faHeartCirclePlus,
    faHeartCrack,
    faHouse,
    faKey,
    faListTimeline,
    faLightbulbOn,
    faMagnifyingGlassDollar,
    faMosquito,
    faMoneyCheckPen,
    faPresentationScreen,
    faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser,
    faSackDollar,
    faShield,
    faShieldCat,
    faTriangleExclamation,
    faTypewriter,
    faUser,
    faUsers
} from "@fortawesome/pro-duotone-svg-icons";
import {Icon} from "../icons";

const iconMap = {
    faArrowDownToArc: faArrowDownToArc,
    faArrowRightFromArc: faArrowRightFromArc,
    faBellExclamation: faBellExclamation,
    faBomb: faBomb,
    faBuildingColumns: faBuildingColumns,
    faClipboardListCheck: faClipboardListCheck,
    faCalendarHeart: faCalendarHeart,
    faChartLine: faChartLine,
    faCircleInfo: faCircleInfo,
    faComet: faComet,
    faCommentsQuestion: faCommentsQuestion,
    faEarthAmericas: faEarthAmericas,
    faEyeSlash: faEyeSlash,
    faFaceExplode: faFaceExplode,
    faFile: faFile,
    faFileImage: faFileImage,
    faFiles: faFiles,
    faFileLines: faFileLines,
    faFloppyDisk: faFloppyDisk,
    faGears: faGears,
    faHeartCirclePlus: faHeartCirclePlus,
    faHeartCrack: faHeartCrack,
    faHouse: faHouse,
    faKey: faKey,
    faListTimeline: faListTimeline,
    faLightbulbOn: faLightbulbOn,
    faMagnifyingGlassDollar: faMagnifyingGlassDollar,
    faMosquito: faMosquito,
    faMoneyCheckPen: faMoneyCheckPen,
    faPresentationScreen: faPresentationScreen,
    faRectangleHistoryCirclePlus: faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser: faRectangleHistoryCircleUser,
    faSackDollar: faSackDollar,
    faShield: faShield,
    faShieldCat: faShieldCat,
    faTriangleExclamation: faTriangleExclamation,
    faTypewriter: faTypewriter,
    faUser: faUser,
    faUsers: faUsers
}

export const getDuoToneIconByName = (iconName) => {
    return iconMap[iconName] || null;
}

export const adminIconDuoTone = faShieldCat;
export const notAdminIconDuoTone = faShield;
export const collectionPlusIconDuoTone = faRectangleHistoryCirclePlus;
export const collectionCheckIconDuoTone = faClipboardListCheck;
export const collectionSearchIconDuoTone = faMagnifyingGlassDollar;
export const dashboardIconDuoTone = faChartLine;
export const dateIconDuoTone = faCalendarHeart;
export const editIconDuoTone = faMoneyCheckPen;
export const infoIconDuoTone = faFaceExplode;

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
