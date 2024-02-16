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
export const keyIconDuoTone = faKey;
export const loginIconDuoTone = faArrowDownToArc;
export const logoIconDuoTone = faComet;
export const marvelKlubbenIconDuoTone = faBadge;
export const questionIconDuoTone = faCommentsQuestion;
export const logoutIconDuoTone = faArrowRightFromArc;
export const otherCollectionsIconDuoTone = faRectangleHistoryCircleUser;
export const overviewIconDuoTone = faPresentationScreen;
export const publishersIconDuoTone = faBuildingColumns;
export const registerIconDuoTone = faHeartCirclePlus;
export const saveIconDuoTone = faFloppyDisk;
export const settingsIconDuoTone = faGears;
export const startIconDuoTone = faHouse;
export const statusIconActiveDuoTone = faLightbulbOn;
export const statusIconUnreadDuoTone = faEyeSlash;
export const statusIconTodoDuoTone = faBellExclamation;
export const titlesIconDuoTone = faFiles;
export const titleIconDuoTone = faFile;
export const usersIconDuoTone = faUsers;
export const userIconDuoTone = faUser;
export const valueIconDuoTone = faSackDollar;
