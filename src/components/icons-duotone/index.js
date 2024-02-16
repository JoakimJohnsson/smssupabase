import React from "react";
import {
    faArrowDownToArc,
    faArrowRightFromArc,
    faBellExclamation,
    faBadge,
    faBomb,
    faBuildingColumns,
    faClipboardListCheck,
    faCalendarHeart,
    faChartLine,
    faCircleInfo,
    faComet,
    faCommentsQuestion,
    faEarthAmericas,
    faEye,
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
    faLink,
    faListTimeline,
    faLightbulb,
    faLightbulbOn,
    faMagnifyingGlassDollar,
    faMosquito,
    faMoneyCheckPen,
    faPresentationScreen,
    faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser,
    faSackDollar,
    faSend,
    faShield,
    faShieldCat,
    faSpider,
    faThoughtBubble,
    faTriangleExclamation,
    faTypewriter,
    faUser,
    faUsers
} from "@fortawesome/pro-duotone-svg-icons";
import {Icon} from "../icons";

const iconMapDuoTone = {
    faArrowDownToArcDT: faArrowDownToArc,
    faArrowRightFromArcDT: faArrowRightFromArc,
    faBellExclamationDT: faBellExclamation,
    faBadgeDT: faBadge,
    faBombDT: faBomb,
    faBuildingColumnsDT: faBuildingColumns,
    faClipboardListCheckDT: faClipboardListCheck,
    faCalendarHeartDT: faCalendarHeart,
    faChartLineDT: faChartLine,
    faCircleInfoDT: faCircleInfo,
    faCometDT: faComet,
    faCommentsQuestionDT: faCommentsQuestion,
    faEarthAmericasDT: faEarthAmericas,
    faEyeDT: faEye,
    faEyeSlashDT: faEyeSlash,
    faFaceExplodeDT: faFaceExplode,
    faFileDT: faFile,
    faFileImageDT: faFileImage,
    faFilesDT: faFiles,
    faFileLinesDT: faFileLines,
    faFloppyDiskDT: faFloppyDisk,
    faGearsDT: faGears,
    faHeartCirclePlusDT: faHeartCirclePlus,
    faHeartCrackDT: faHeartCrack,
    faHouseDT: faHouse,
    faKeyDT: faKey,
    faLinkDT: faLink,
    faListTimelineDT: faListTimeline,
    faLightbulbDT: faLightbulb,
    faLightbulbOnDT: faLightbulbOn,
    faMagnifyingGlassDollarDT: faMagnifyingGlassDollar,
    faMosquitoDT: faMosquito,
    faMoneyCheckPenDT: faMoneyCheckPen,
    faPresentationScreenDT: faPresentationScreen,
    faRectangleHistoryCirclePlusDT: faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUserDT: faRectangleHistoryCircleUser,
    faSackDollarDT: faSackDollar,
    faSendDT: faSend,
    faShieldDT: faShield,
    faShieldCatDT: faShieldCat,
    faSpiderDT: faSpider,
    faThoughtBubbleDT: faThoughtBubble,
    faTriangleExclamationDT: faTriangleExclamation,
    faTypewriterDT: faTypewriter,
    faUserDT: faUser,
    faUsersDT: faUsers
}

export const getDuoToneIconByName = (iconName) => {
    return iconMapDuoTone[iconName + "DT"] || null;
}

export const adminIconDuoTone = faShieldCat;
export const notAdminIconDuoTone = faShield;
export const collectionPlusIconDuoTone = faRectangleHistoryCirclePlus;
export const collectionCheckIconDuoTone = faClipboardListCheck;
export const collectionSearchIconDuoTone = faMagnifyingGlassDollar;
export const dashboardIconDuoTone = faChartLine;
export const dataIconDuoTone = faListTimeline;
export const dateIconDuoTone = faCalendarHeart;
export const editIconDuoTone = faMoneyCheckPen;
export const globalIconDuoTone = faEarthAmericas;
export const imageIconDuoTone = faFileImage;
export const infoIconDuoTone = faFaceExplode;
export const issueIconDuoTone = faFileLines;
export const marvelKlubbenIconDuoTone = faBadge;
export const questionIconDuoTone = faCommentsQuestion;

export const KeyIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faKey} size={size} className={className}/>
    )
}

export const keyIconDuoTone = faKey;

export const LogoIconDuoTone = ({size, className}) => {
    return (
        <Icon icon={faComet} size={size} className={className}/>
    )
}

export const logoIconDuoTone = faComet;

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

export const logoutIconDuoTone = faArrowRightFromArc;

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

export const startIconDuoTone = faHouse;

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
