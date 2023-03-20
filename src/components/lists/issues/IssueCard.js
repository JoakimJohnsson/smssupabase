import React, {useEffect, useState} from "react";
import {useIssueData} from "../../../helpers/customHooks/useIssueData";
import {useIsCollectingIssue} from "../../../helpers/customHooks/useIsCollectingIssue";
import {useAppContext} from "../../../context/AppContext";
import {useIsCollectingTitle} from "../../../helpers/customHooks/useIsCollectingTitle";
import {handleCollectingIssue} from "../../../helpers/functions/serviceFunctions/serviceFunctions";
import {Icon} from "../../icons";
import {faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {getIssueName} from "../../../helpers/functions/functions";


export const IssueCard = ({issueId}) => {

    const [
        issue,
        title
    ] = useIssueData(issueId);
    const {setInformationMessage, user} = useAppContext();
    const [isCollectingIssue, setIsCollectingIssue] = useIsCollectingIssue(user.id, issueId);
    const [isCollectingTitle] = useIsCollectingTitle(user.id, issue.title_id);
    const [displayName, setDisplayName] = useState("");

    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;

    useEffect(() => {
        setDisplayName(getIssueName(title, issue));
    }, [title, issue])

    return issue && title && (
        <li className={"issue-card"}>
            <p>{title.name}</p>
            <p> #{issue.number} {issue.year}</p>
            {
                isCollectingTitle &&
                <button
                    aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                    className={`btn ${isCollectingIssue ? "btn-success" : "btn-danger"} p-2 rounded-0 w-100 justify-content-center mb-4`}
                    onClick={() => handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue)}>
                    {
                        isCollectingIssue ?
                            <><Icon icon={faMinus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.DELETE}</>
                            :
                            <><Icon icon={faPlus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.ADD}</>
                    }
                </button>
            }
        </li>

    )
}
