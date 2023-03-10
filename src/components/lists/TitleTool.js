import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {faPlus, faMinus} from "@fortawesome/pro-regular-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {addTitleToCollection, removeTitleFromCollection} from "../../helpers/functions/serviceFunctions/collectFunctions";
import {useIsCollectingTitle} from "../../helpers/customHooks/useIsCollectingTitle";


export const TitleTool = ({title, displayName, isCard = false}) => {

    const {setInformationMessage, user} = useAppContext();
    const [isCollectingTitle, setIsCollectingTitle] = useIsCollectingTitle(user.id, title.id);
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;
    const collectTitleIcon = isCollectingTitle ? faBadgeCheck : faBadge;
    const collectTitleBtnClassName = isCollectingTitle ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";


    const handleCollectingTitle = () => {
        if (isCollectingTitle) {
            removeTitleFromCollection(user.id, title.id, displayName, setInformationMessage, setIsCollectingTitle).then();
        } else {
            addTitleToCollection(user.id, title.id, setInformationMessage).then(() => setIsCollectingTitle(true));
        }
    }

    return isCard ? (
            <button
                aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                className={`btn ${isCollectingTitle ? "btn-success" : "btn-danger"} p-2 rounded-0 w-100 justify-content-center`}
                onClick={handleCollectingTitle}>
                {
                    isCollectingTitle ?
                        <><Icon icon={faMinus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.DELETE}</>
                        :
                        <><Icon icon={faPlus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.ADD}</>
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
                    onClick={handleCollectingTitle}>
                    <Icon icon={collectTitleIcon} className={"fa-xl"}/>
                </button>
            </OverlayTrigger>
        )
}
