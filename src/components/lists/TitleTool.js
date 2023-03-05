import React, {useState, useEffect} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {addTitleToCollection, isCollectingTitle, removeTitleFromCollection} from "../../helpers/functions/serviceFunctions/collectFunctions";


export const TitleTool = ({item, displayName}) => {

    const [collectingTitle, setCollectingTitle] = useState(false);
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;
    const collectTitleIcon = collectingTitle ? faBadgeCheck : faBadge;
    const collectTitleBtnClassName = collectingTitle ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";
    const {setInformationMessage, user} = useAppContext();

    useEffect(() => {
        isCollectingTitle(user.id, item.id, setCollectingTitle).then();
    }, [user.id, item.id])

    const handleCollectingTitle = () => {
        if (collectingTitle) {
            removeTitleFromCollection(user.id, item.id, displayName, setInformationMessage).then(() => setCollectingTitle(false))
        } else {
            addTitleToCollection(user.id, item.id, setInformationMessage).then(() => setCollectingTitle(true));
        }
    }

    return (
        <OverlayTrigger
            key={"collect-title-tooltip"}
            placement={"top"}
            overlay={
                <Tooltip id={"collect-title-tooltip"}>
                    {collectingTitle ? collectTitleTextStop : collectTitleTextStart}
                </Tooltip>
            }
        >
            <button
                className={collectTitleBtnClassName}
                aria-label={collectingTitle ? collectTitleTextStop : collectTitleTextStart}
                onClick={handleCollectingTitle}>
                <Icon icon={collectTitleIcon} className={"fa-xl"}/>
            </button>
        </OverlayTrigger>
    )
}
