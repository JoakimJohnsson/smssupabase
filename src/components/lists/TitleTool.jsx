import React, {useEffect} from "react";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons/Icons.jsx";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {handleCollectingTitle} from "../../services/serviceFunctions";
import {useCollectingStatus} from "../../helpers/customHooks/useCollectingStatus";


export const TitleTool = ({title, displayName, isCard = false, setUserCollectsTitle = false}) => {

    const {setInformationMessage, user} = useAppContext();
    const {isCollectingTitle, setIsCollectingTitle} = useCollectingStatus(user.id, false, title.id);
    const collectTitleTextStart = TEXTS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = TEXTS.COLLECT_TITLE_STOP + " " + displayName;
    const collectTitleIcon = isCollectingTitle ? faBadgeCheck : faBadge;
    const collectTitleBtnClassName = isCollectingTitle ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";

    useEffect(() => {
        if (setUserCollectsTitle) {
            setUserCollectsTitle(isCollectingTitle)
        }
    }, [isCollectingTitle, setUserCollectsTitle])

    return isCard ? (
            <button
                aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                className={`btn ${isCollectingTitle ? "btn-success" : "btn-secondary"} p-2 rounded-0 w-100 flex-column justify-content-center`}
                onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle, true)}>
                {
                    isCollectingTitle ?
                        <>{TEXTS.COLLECT_TITLE_STOP + " " + title.name}</>
                        :
                        <>{TEXTS.COLLECT_TITLE_START + " " + title.name}</>
                }
            </button>
        )
        :
        (
            <OverlayTrigger
                key={"collect-title-tooltip"}
                placement={"top"}
                overlay={
                    <Tooltip id={"collect-title-tooltip"}>
                        {isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                    </Tooltip>
                }
            >
                <button
                    className={collectTitleBtnClassName}
                    aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                    onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle, true)}>
                    <Icon icon={collectTitleIcon} className={"fa-xl"}/>
                </button>
            </OverlayTrigger>
        )
}
