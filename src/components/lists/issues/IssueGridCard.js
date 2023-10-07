import React from "react";
import {useIsCollectingIssue} from "../../../helpers/customHooks/useIsCollectingIssue";
import {useAppContext} from "../../../context/AppContext";
import {handleCollectingIssue} from "../../../helpers/functions/serviceFunctions/serviceFunctions";
import {Icon} from "../../icons";
import {faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {Link} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useIssueDisplayName} from "../../../helpers/customHooks/useIssueDisplayName";


export const IssueGridCard = ({issue, showCollectingButtons, fetchTitleProgress = false, listViewMissing}) => {

    const {setInformationMessage, user} = useAppContext();
    const [isCollectingIssue, setIsCollectingIssue] = useIsCollectingIssue(user.id, issue.id);
    const [displayName] = useIssueDisplayName(issue);

    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;

    const handleClick = async () => {
        handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue);
        if (fetchTitleProgress) {
            setTimeout(() => {
                fetchTitleProgress();
            }, 200);
        }
    }

    return issue && issue.titles && (
        (!listViewMissing || (listViewMissing && !isCollectingIssue)) &&
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
                        <div className={`issue-card--number ${isCollectingIssue ? "bg-success" : "bg-secondary"}`}>{issue.number}</div>
                    }
                </div>
            </Link>
            {
                showCollectingButtons &&
                <div className={"d-flex align-items-center"}>
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
                            aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                            className={`btn btn-sm ${isCollectingIssue ? "btn-success" : "btn-secondary"} justify-content-center w-100 rounded-0`}
                            onClick={() => handleClick()}>
                            {
                                isCollectingIssue ?
                                    <Icon icon={faMinus} className={"me-2"}/>
                                    :
                                    <Icon icon={faPlus} className={"me-2"}/>
                            }
                        </button>
                    </OverlayTrigger>
                </div>
            }
        </li>
    )
}
