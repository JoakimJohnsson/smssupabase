import React from "react";
import {CONFIG} from "../../helpers/constants/configConstants";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {Icon} from "../icons";
import {faBadgeCheck, faBadge} from "@fortawesome/pro-duotone-svg-icons";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useAppContext} from "../../context/AppContext";
import {handleCollectingIssue} from "../../services/serviceFunctions";


export const IssueTool = ({issue, displayName, fetchTitleProgress = false, isCollectingIssue, setIsCollectingIssue}) => {

    const {setInformationMessage, user} = useAppContext();

    const collectIssueTextStart = TEXTS.COLLECT_ISSUE_START + " " + displayName + " " + TEXTS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = TEXTS.COLLECT_ISSUE_STOP + " " + displayName + " " + TEXTS.COLLECT_ISSUE_STOP_2;
    const collectIssueIcon = isCollectingIssue ? faBadgeCheck : faBadge;
    const collectIssueBtnClassName = isCollectingIssue ? "btn text-success sms-tool-btn" : "btn text-light sms-tool-btn";

    const handleOnClick = () => {
        handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue);
        if (fetchTitleProgress) {
            setTimeout(() => {
                fetchTitleProgress();
            }, CONFIG.TIMEOUT_SM);
        }
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
