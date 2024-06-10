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
    faCar,
    faChartLine,
    faChevronDown,
    faChevronUp,
    faCircleInfo,
    faComet,
    faCommentsQuestion,
    faDisplayChartUp,
    faEarthAmericas,
    faEllipsis,
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
    faMapLocationDot,
    faMosquito,
    faMoneyCheckPen,
    faPresentationScreen,
    faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser,
    faSackDollar,
    faSadTear,
    faSealExclamation,
    faSend,
    faScaleUnbalanced,
    faShield,
    faShieldExclamation,
    faShieldCat,
    faSpider,
    faThoughtBubble,
    faTriangleExclamation,
    faTypewriter,
    faUser,
    faUsers,
    faWalking
} from "@fortawesome/pro-regular-svg-icons";

import {
    faArrowDownToArc as faArrowDownToArcDT,
    faArrowRightFromArc as faArrowRightFromArcDT,
    faBellExclamation as faBellExclamationDT,
    faBadge as faBadgeDT,
    faBadgeCheck as faBadgeCheckDT,
    faBomb as faBombDT,
    faBuildingColumns as faBuildingColumnsDT,
    faClipboardListCheck as faClipboardListCheckDT,
    faCalendarHeart as faCalendarHeartDT,
    faCar as faCarDT,
    faChartLine as faChartLineDT,
    faChevronDown as faChevronDownDT,
    faChevronUp as faChevronUpDT,
    faCircleInfo as faCircleInfoDT,
    faComet as faCometDT,
    faCommentsQuestion as faCommentsQuestionDT,
    faDisplayChartUp as faDisplayChartUpDT,
    faEarthAmericas as faEarthAmericasDT,
    faEllipsis as faEllipsisDT,
    faEye as faEyeDT,
    faEyeSlash as faEyeSlashDT,
    faFaceExplode as faFaceExplodeDT,
    faFile as faFileDT,
    faFileImage as faFileImageDT,
    faFiles as faFilesDT,
    faFileLines as faFileLinesDT,
    faFloppyDisk as faFloppyDiskDT,
    faGears as faGearsDT,
    faHeartCirclePlus as faHeartCirclePlusDT,
    faHeartCrack as faHeartCrackDT,
    faHouse as faHouseDT,
    faKey as faKeyDT,
    faLink as faLinkDT,
    faListTimeline as faListTimelineDT,
    faLightbulb as faLightbulbDT,
    faLightbulbOn as faLightbulbOnDT,
    faMagnifyingGlassDollar as faMagnifyingGlassDollarDT,
    faMapLocationDot as faMapLocationDotDT,
    faMosquito as faMosquitoDT,
    faMoneyCheckPen as faMoneyCheckPenDT,
    faPresentationScreen as faPresentationScreenDT,
    faRectangleHistoryCirclePlus as faRectangleHistoryCirclePlusDT,
    faRectangleHistoryCircleUser as faRectangleHistoryCircleUserDT,
    faSackDollar as faSackDollarDT,
    faSadTear as faSadTearDT,
    faScaleUnbalanced as faScaleUnbalancedDT,
    faSealExclamation as faSealExclamationDT,
    faSend as faSendDT,
    faShield as faShieldDT,
    faShieldExclamation as faShieldExclamationDT,
    faShieldCat as faShieldCatDT,
    faSpider as faSpiderDT,
    faThoughtBubble as faThoughtBubbleDT,
    faTriangleExclamation as faTriangleExclamationDT,
    faTypewriter as faTypewriterDT,
    faUser as faUserDT,
    faUsers as faUsersDT,
    faWalking as faWalkingDT
} from "@fortawesome/pro-duotone-svg-icons";

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
    faCar: faCar,
    faChartLine: faChartLine,
    faChevronDown: faChevronDown,
    faChevronUp: faChevronUp,
    faCircleInfo: faCircleInfo,
    faComet: faComet,
    faCommentsQuestion: faCommentsQuestion,
    faDisplayChartUp: faDisplayChartUp,
    faEarthAmericas: faEarthAmericas,
    faEllipsis: faEllipsis,
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
    faMapLocationDot: faMapLocationDot,
    faMosquito: faMosquito,
    faMoneyCheckPen: faMoneyCheckPen,
    faPresentationScreen: faPresentationScreen,
    faRectangleHistoryCirclePlus: faRectangleHistoryCirclePlus,
    faRectangleHistoryCircleUser: faRectangleHistoryCircleUser,
    faSackDollar: faSackDollar,
    faSadTear: faSadTear,
    faScaleUnbalanced: faScaleUnbalanced,
    faSealExclamation: faSealExclamation,
    faSend: faSend,
    faShield: faShield,
    faShieldExclamation: faShieldExclamation,
    faShieldCat: faShieldCat,
    faSpider: faSpider,
    faThoughtBubble: faThoughtBubble,
    faTriangleExclamation: faTriangleExclamation,
    faTypewriter: faTypewriter,
    faUser: faUser,
    faUsers: faUsers,
    faWalking: faWalking
}

const iconMapDuoTone = {
    faArrowDownToArcDT: faArrowDownToArcDT,
    faArrowRightFromArcDT: faArrowRightFromArcDT,
    faBellExclamationDT: faBellExclamationDT,
    faBadgeDT: faBadgeDT,
    faBadgeCheckDT: faBadgeCheckDT,
    faBombDT: faBombDT,
    faBuildingColumnsDT: faBuildingColumnsDT,
    faClipboardListCheckDT: faClipboardListCheckDT,
    faCalendarHeartDT: faCalendarHeartDT,
    faCarDT: faCarDT,
    faChartLineDT: faChartLineDT,
    faChevronDownDT: faChevronDownDT,
    faChevronUpDT: faChevronUpDT,
    faCircleInfoDT: faCircleInfoDT,
    faCometDT: faCometDT,
    faCommentsQuestionDT: faCommentsQuestionDT,
    faDisplayChartUpDT: faDisplayChartUpDT,
    faEarthAmericasDT: faEarthAmericasDT,
    faEllipsisDT: faEllipsisDT,
    faEyeDT: faEyeDT,
    faEyeSlashDT: faEyeSlashDT,
    faFaceExplodeDT: faFaceExplodeDT,
    faFileDT: faFileDT,
    faFileImageDT: faFileImageDT,
    faFilesDT: faFilesDT,
    faFileLinesDT: faFileLinesDT,
    faFloppyDiskDT: faFloppyDiskDT,
    faGearsDT: faGearsDT,
    faHeartCirclePlusDT: faHeartCirclePlusDT,
    faHeartCrackDT: faHeartCrackDT,
    faHouseDT: faHouseDT,
    faKeyDT: faKeyDT,
    faLinkDT: faLinkDT,
    faListTimelineDT: faListTimelineDT,
    faLightbulbDT: faLightbulbDT,
    faLightbulbOnDT: faLightbulbOnDT,
    faMagnifyingGlassDollarDT: faMagnifyingGlassDollarDT,
    faMapLocationDotDT: faMapLocationDotDT,
    faMosquitoDT: faMosquitoDT,
    faMoneyCheckPenDT: faMoneyCheckPenDT,
    faPresentationScreenDT: faPresentationScreenDT,
    faRectangleHistoryCirclePlusDT: faRectangleHistoryCirclePlusDT,
    faRectangleHistoryCircleUserDT: faRectangleHistoryCircleUserDT,
    faSackDollarDT: faSackDollarDT,
    faSadTearDT: faSadTearDT,
    faScaleUnbalancedDT: faScaleUnbalancedDT,
    faSealExclamationDT: faSealExclamationDT,
    faSendDT: faSendDT,
    faShieldDT: faShieldDT,
    faShieldExclamationDT: faShieldExclamationDT,
    faShieldCatDT: faShieldCatDT,
    faSpiderDT: faSpiderDT,
    faThoughtBubbleDT: faThoughtBubbleDT,
    faTriangleExclamationDT: faTriangleExclamationDT,
    faTypewriterDT: faTypewriterDT,
    faUserDT: faUserDT,
    faUsersDT: faUsersDT,
    faWalkingDT: faWalkingDT
}

export const getIconByName = (iconName) => {
    return iconMap[iconName] || null;
}

export const getDuoToneIconByName = (iconName) => {
    return iconMapDuoTone[iconName + "DT"] || null;
}

export const Icon = ({icon, size, className, spin = false}) => {
    return (
        <FontAwesomeIcon icon={icon} size={size} className={className} spin={spin}/>
    )
}

// Regular
export const adminIcon = faShieldCat;
export const notAdminIcon = faShield;
export const carIcon = faCar;
export const collectionPlusIcon = faRectangleHistoryCirclePlus;
export const collectionCheckIcon = faClipboardListCheck;
export const collectionSearchIcon = faMagnifyingGlassDollar;
export const dangerIcon = faShieldExclamation;
export const dateIcon = faCalendarHeart;
export const dashboardIcon = faChartLine;
export const dataIcon = faListTimeline;
export const editIcon = faMoneyCheckPen;
export const globalIcon = faEarthAmericas;
export const gradingIconDuo = faScaleUnbalanced;
export const imageIcon = faFileImage;
export const infoIcon = faCircleInfo;
export const issueIcon = faFileLines;
export const keyIcon = faKey;
export const linkIcon = faLink;
export const loginIcon = faArrowDownToArc;
export const logoutIcon = faArrowRightFromArc;
export const logoIcon = faComet;
export const mapsIcon = faMapLocationDot;
export const marvelKlubbenIcon = faBadge;
export const moreIcon = faChevronDown;
export const lessIcon = faChevronUp;
export const publishersIcon = faBuildingColumns;
export const registerIcon = faHeartCirclePlus;
export const saveIcon = faFloppyDisk;
export const sendIcon = faSend;
export const settingsIcon = faGears;
export const startIcon = faHouse;
export const statusIconActive = faLightbulbOn;
export const statusIconFail = faTriangleExclamation;
export const statusIconSadFail = faSadTear;
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
export const walkingIcon = faWalking;
export const warningIcon = faSealExclamation;

// DuoTone
export const adminIconDuoTone = faShieldCatDT;
export const notAdminIconDuoTone = faShieldDT;
export const carIconDuoTone = faCarDT;
export const collectionPlusIconDuoTone = faRectangleHistoryCirclePlusDT;
export const collectionCheckIconDuoTone = faClipboardListCheckDT;
export const collectionSearchIconDuoTone = faMagnifyingGlassDollarDT;
export const dashboardIconDuoTone = faChartLineDT;
export const dangerIconDuoTone = faShieldExclamationDT;
export const dataIconDuoTone = faListTimelineDT;
export const dateIconDuoTone = faCalendarHeartDT;
export const editIconDuoTone = faMoneyCheckPenDT;
export const globalIconDuoTone = faEarthAmericasDT;
export const gradingIconDuoTone = faScaleUnbalancedDT;
export const imageIconDuoTone = faFileImageDT;
export const infoIconDuoTone = faCircleInfoDT;
export const issueIconDuoTone = faFileLinesDT;
export const keyIconDuoTone = faKeyDT;
export const loginIconDuoTone = faArrowDownToArcDT;
export const logoIconDuoTone = faCometDT;
export const mapsIconDuoTone = faMapLocationDotDT;
export const marvelKlubbenIconDuoTone = faBadgeDT;
export const moreIconDuoTone = faChevronDownDT;
export const lessIconDuoTone = faChevronUpDT;
export const questionIconDuoTone = faCommentsQuestionDT;
export const logoutIconDuoTone = faArrowRightFromArcDT;
export const collectionsIconDuoTone = faRectangleHistoryCircleUserDT;
export const overviewIconDuoTone = faPresentationScreenDT;
export const publishersIconDuoTone = faBuildingColumnsDT;
export const registerIconDuoTone = faHeartCirclePlusDT;
export const saveIconDuoTone = faFloppyDiskDT;
export const settingsIconDuoTone = faGearsDT;
export const startIconDuoTone = faHouseDT;
export const statusIconActiveDuoTone = faLightbulbOnDT;
export const statusIconFailDuoTone = faTriangleExclamationDT;
export const statusIconSadFailDuoTone = faSadTearDT;
export const statusIconUnreadDuoTone = faEyeSlashDT;
export const statusIconTodoDuoTone = faBellExclamationDT;
export const statusIconSuccessDuoTone = faBadgeCheckDT;
export const titlesIconDuoTone = faFilesDT;
export const titleIconDuoTone = faFileDT;
export const usersIconDuoTone = faUsersDT;
export const userIconDuoTone = faUserDT;
export const valueIconDuoTone = faSackDollarDT;
export const walkingIconDuoTone = faWalkingDT;
export const warningIconDuoTone = faSealExclamationDT;
