import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Icon} from "../icons";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useIsCollectingIssue} from "../../helpers/customHooks/useIsCollectingIssue";
import {useAppContext} from "../../context/AppContext";
import {handleCollectingIssue} from "../../helpers/functions/serviceFunctions/serviceFunctions";


export const IssueTool = ({issue, displayName, fetchTitleProgress}) => {

    const {setInformationMessage, user} = useAppContext();
    const [isCollectingIssue, setIsCollectingIssue] = useIsCollectingIssue(user.id, issue.id)
    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;
    const collectIssueIcon = isCollectingIssue ? faBadgeCheck : faBadge;
    const collectIssueBtnClassName = isCollectingIssue ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";

    const handleOnClick = () => {
        handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue);
        fetchTitleProgress();
    }

    return (
        <OverlayTrigger
            key={"collect-issue-tooltip"}
            placement={"top"}
            overlay={
                <Tooltip id={"collect-issue-tooltip"}>
                    {isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                </Tooltip>
            }
        >
            <button
                className={collectIssueBtnClassName}
                aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                onClick={() => handleOnClick()}>
                <Icon icon={collectIssueIcon} className={"fa-xl"}/>
            </button>
        </OverlayTrigger>
    )
}
