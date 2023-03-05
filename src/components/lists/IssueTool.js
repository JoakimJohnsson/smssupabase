import React, {useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Icon} from "../icons";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


export const IssueTool = ({displayName}) => {

    const [collectingIssue, setCollectingIssue] = useState(false);
    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;
    const collectIssueIcon = collectingIssue ? faBadgeCheck : faBadge;
    const collectIssueBtnClassName = collectingIssue ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";

    return (
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
    )
}
