import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useIsCollectingTitle} from "../../helpers/customHooks/useIsCollectingTitle";
import {handleCollectingTitle} from "../../helpers/functions/serviceFunctions/serviceFunctions";


export const TitleTool = ({title, displayName, isCard = false}) => {

    const {setInformationMessage, user} = useAppContext();
    const [isCollectingTitle, setIsCollectingTitle] = useIsCollectingTitle(user.id, title.id);
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;
    const collectTitleIcon = isCollectingTitle ? faBadgeCheck : faBadge;
    const collectTitleBtnClassName = isCollectingTitle ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";

    return isCard ? (
            <button
                aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                className={`btn ${isCollectingTitle ? "btn-success" : "btn-secondary"} btn-sm p-2 rounded-0 w-100 flex-column justify-content-center`}
                onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle)}>
                {
                    isCollectingTitle ?
                        <>{LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + title.name}</>
                        :
                        <>{LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + title.name}</>
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
                    onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle)}>
                    <Icon icon={collectTitleIcon} className={"fa-xl"}/>
                </button>
            </OverlayTrigger>
        )
}
