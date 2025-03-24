import React from "react";
import {useAppContext} from "../../../context/AppContext";
import {handleCollectingIssue} from "../../../services/serviceFunctions";
import {Icon} from "../../icons";
import {faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../helpers/constants/textConstants/texts";
import {Link} from "react-router-dom";
import {useIssueDisplayName} from "../../../helpers/customHooks/useIssueDisplayName";
import {useCollectingStatus} from "../../../helpers/customHooks/useCollectingStatus";


export const IssueCard = ({issue}) => {

    const {setInformationMessage, user} = useAppContext();
    const {isCollectingTitle, isCollectingIssue, setIsCollectingIssue} = useCollectingStatus(user.id, issue.id, issue.title_id);
    const {displayName} = useIssueDisplayName(issue);

    const collectIssueTextStart = TEXTS.COLLECT_ISSUE_START + " " + displayName + " " + TEXTS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = TEXTS.COLLECT_ISSUE_STOP + " " + displayName + " " + TEXTS.COLLECT_ISSUE_STOP_2;

    return issue && issue.titles && (
        <li className={"issue-card"}>
            <Link to={`/issues/${issue.id}`} title={displayName}>
                <div className={`cover-image--wrapper${isCollectingIssue ? " collecting" : ""}`}>
                    <img
                        src={issue.image_url}
                        alt={displayName}
                        className={`cover-image${isCollectingIssue ? "" : " grayscale"}`}
                        loading={"lazy"}
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
                        className={`btn ${isCollectingIssue ? "btn-success" : "btn-secondary"} justify-content-center w-100 rounded-0`}
                        onClick={() => handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue)}>
                        {
                            isCollectingIssue ?
                                <><Icon icon={faMinus} className={"me-2"}/>{LABELS.COMMON.DELETE}</>
                                :
                                <><Icon icon={faPlus} className={"me-2"}/>{LABELS.COMMON.ADD}</>
                        }
                    </button>
                </div>
            }
        </li>
    )
}
