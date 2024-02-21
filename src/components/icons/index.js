import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDownToArc,
    faArrowRightFromArc,
    faBellExclamation,
    faBadge,
    faBadgeCheck,
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
} from "@fortawesome/pro-regular-svg-icons";

const iconMap = {
    faArrowDownToArc: faArrowDownToArc,
    faArrowRightFromArc: faArrowRightFromArc,
    faBellExclamation: faBellExclamation,
    faBadge: faBadge,
    faBadgeCheck: faBadgeCheck,
    faBomb: faBomb,
    faBuildingColumns: faBuildingColumns,
    faClipboardListCheck: faClipboardListCheck,
    faCalendarHeart: faCalendarHeart,
    faChartLine: faChartLine,
    faCircleInfo: faCircleInfo,
    faComet: faComet,
    faCommentsQuestion: faCommentsQuestion,
    faEarthAmericas: faEarthAmericas,
    faEye: faEye,
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
    faLink: faLink,
    faListTimeline: faListTimeline,
    faLightbulb: faLightbulb,
    faLightbulbOn: faLightbulbOn,
    faMagnifyingGlassDollar: faMagnifyingGlassDollar,
    faMosquito: faMosquito,
    faMoneyCheckPen: faMoneyCheckPen,
    faPresentationScreen: faPresentationScreen,
    faRectangleHistoryCirclePlus: faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser: faRectangleHistoryCircleUser,
    faSackDollar: faSackDollar,
    faSend: faSend,
    faShield: faShield,
    faShieldCat: faShieldCat,
    faSpider: faSpider,
    faThoughtBubble: faThoughtBubble,
    faTriangleExclamation: faTriangleExclamation,
    faTypewriter: faTypewriter,
    faUser: faUser,
    faUsers: faUsers
}

export const getIconByName = (iconName) => {
    return iconMap[iconName] || null;
}

export const Icon = ({icon, size, className, spin = false}) => {
    return (
        <FontAwesomeIcon icon={icon} size={size} className={className} spin={spin}/>
    )
}

export const adminIcon = faShieldCat;
export const notAdminIcon = faShield;
export const collectionPlusIcon = faRectangleHistoryCirclePlus;
export const collectionCheckIcon = faClipboardListCheck;
export const collectionSearchIcon = faMagnifyingGlassDollar;
export const dateIcon = faCalendarHeart;
export const dashboardIcon = faChartLine;
export const dataIcon = faListTimeline;
export const editIcon = faMoneyCheckPen;
export const globalIcon = faEarthAmericas;
export const imageIcon = faFileImage;
export const infoIcon = faCircleInfo;
export const issueIcon = faFileLines;
export const keyIcon = faKey;
export const linkIcon = faLink;
export const loginIcon = faArrowDownToArc;
export const logoutIcon = faArrowRightFromArc;
export const logoIcon = faComet;
export const marvelKlubbenIcon = faBadge;
export const publishersIcon = faBuildingColumns;
export const registerIcon = faHeartCirclePlus;
export const saveIcon = faFloppyDisk;
export const sendIcon = faSend;
export const settingsIcon = faGears;
export const startIcon = faHouse;
export const statusIconActive = faLightbulbOn;
export const statusIconFail = faTriangleExclamation;
export const statusIconInactive = faLightbulb;
export const statusIconRead = faEye;
export const statusIconUnRead = faEyeSlash;
export const statusIconTodo = faBellExclamation;
export const statusIconSuccess = faBadgeCheck;
export const titlesIcon = faFiles;
export const titleIcon = faFile;
export const usersIcon = faUsers;
export const userIcon = faUser;
export const valueIcon = faSackDollar;
