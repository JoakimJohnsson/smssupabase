import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {useAppContext} from "../../context/AppContext";
import {Icon} from "../icons";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {addTitleToCollection, removeTitleFromCollection} from "../../helpers/functions/serviceFunctions/collectFunctions";


export const UserTools = ({item, displayName, isTitle}) => {

    const [collectingTitle, setCollectingTitle] = useState(false);
    const [collectingIssue, setCollectingIssue] = useState(false);
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;
    const collectTitleIcon = collectingTitle ? faBadgeCheck : faBadge;
    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;
    const collectIssueIcon = collectingIssue ? faBadgeCheck : faBadge;
    const collectTitleBtnClassName = collectingTitle ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";
    const collectIssueBtnClassName = collectingIssue ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";
    const {setInformationMessage, user} = useAppContext();

    const handleCollectingTitle = () => {
        if (collectingTitle) {
            removeTitleFromCollection(user.id, item.id, displayName, setInformationMessage).then(() => setCollectingTitle(false))
        } else {
            addTitleToCollection(user.id, item.id, setInformationMessage).then(() => setCollectingTitle(true));
        }
    }

    return (
        <div className={"d-inline-block text-end"}>
            {
                isTitle ?
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
                    :
                    <OverlayTrigger
                        key={"collect-issue-tooltip"}
                        placement={"top"}
                        overlay={
                            <Tooltip id={"collect-issue-tooltip"}>
                                {collectingIssue ? collectIssueTextStop : collectIssueTextStart}
                            </Tooltip>
                        }
                    >
                        <button
                            className={collectIssueBtnClassName}
                            aria-label={collectingIssue ? collectIssueTextStop : collectIssueTextStart}
                            onClick={() => setCollectingIssue(!collectingIssue)}>
                            <Icon icon={collectIssueIcon} className={"fa-xl"}/>
                        </button>
                    </OverlayTrigger>
            }
        </div>
    )
}
