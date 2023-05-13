import React, {useEffect, useState} from "react";
import {useIsCollectingIssue} from "../../../helpers/customHooks/useIsCollectingIssue";
import {useAppContext} from "../../../context/AppContext";
import {useIsCollectingTitle} from "../../../helpers/customHooks/useIsCollectingTitle";
import {handleCollectingIssue} from "../../../helpers/functions/serviceFunctions/serviceFunctions";
import {Icon} from "../../icons";
import {faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {getIssueName} from "../../../helpers/functions/functions";
import {Link} from "react-router-dom";


export const IssueCard = ({issue}) => {

    const {setInformationMessage, user} = useAppContext();
    const [isCollectingIssue, setIsCollectingIssue] = useIsCollectingIssue(user.id, issue.id);
    const [isCollectingTitle] = useIsCollectingTitle(user.id, issue.title_id);
    const [displayName, setDisplayName] = useState("");

    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;

    useEffect(() => {
        if (issue) {
            setDisplayName(getIssueName(issue));
        }
    }, [issue])

    return issue && issue.titles && (
        <li className={"issue-card"}>
            <Link to={`/issues/${issue.id}`} title={displayName}>
                <div className={"cover-image--wrapper position-relative"}>
                    <img
                        src={issue.image_url}
                        alt={displayName}
                        className="cover-image"
                    />
                    {
                        issue.marvelklubben_number > 0 &&
                        <div className={"issue-card--marvelklubben"}>{issue.marvelklubben_number}</div>
                    }
                    <div className={"issue-card--label"}><p className={"text-label mb-0 py-1"}>{displayName}</p></div>
                </div>
            </Link>
            {
                isCollectingTitle &&
                <div className={"d-flex align-items-center"}>
                    <button
                        aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                        className={`btn btn-sm ${isCollectingIssue ? "btn-danger" : "btn-success"} justify-content-center w-100 rounded-0`}
                        onClick={() => handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue)}>
                        {
                            isCollectingIssue ?
                                <><Icon icon={faMinus} className={"me-2"}/>{LABELS_AND_HEADINGS.DELETE}</>
                                :
                                <><Icon icon={faPlus} className={"me-2"}/>{LABELS_AND_HEADINGS.ADD}</>
                        }
                    </button>
                </div>
            }
        </li>
    )
}
