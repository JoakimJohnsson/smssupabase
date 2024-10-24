import React, {useEffect} from "react";
import {useAppContext} from "../../../context/AppContext";
import {handleCollectingIssue} from "../../../services/serviceFunctions";
import {Icon} from "../../icons";
import {faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {CONFIG, LABELS_AND_HEADINGS} from "../../../helpers/constants/configConstants";
import {Link} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {useIssueDisplayName} from "../../../helpers/customHooks/useIssueDisplayName";
import {GradeBadge} from "../../grade/GradeBadge";
import {useCollectingStatus} from "../../../helpers/customHooks/useCollectingStatus";
import {getIssueNumber} from "../../../helpers/functions.jsx";


export const IssueGridCard = ({issue, showCollectingButtons, fetchTitleProgress = false, listViewMissing, doUpdate}) => {

    const {setInformationMessage, user} = useAppContext();
    const {isCollectingIssue, setIsCollectingIssue, grades, fetchGrades} = useCollectingStatus(user.id, issue.id, false);
    const {displayName} = useIssueDisplayName(issue);

    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;

    const handleClick = async () => {
        handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue);
        fetchGrades();
        if (fetchTitleProgress) {
            setTimeout(() => {
                fetchTitleProgress();
            }, CONFIG.TIMEOUT_SM);
        }
    }

    useEffect(() => {
        if (doUpdate) {
            if (doUpdate.addIssue && !doUpdate.removeIssue) {
                setIsCollectingIssue(true);
            } else {
                setIsCollectingIssue(false);
            }
        }
    }, [doUpdate, setIsCollectingIssue]);

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
                        <div className={`issue-card--number ${isCollectingIssue ? "bg-success" : "bg-secondary"}`}>{getIssueNumber(issue)}</div>
                    }
                </div>
            </Link>
            {
                isCollectingIssue && grades &&
                grades.map((g, index) => {
                    return (
                        <GradeBadge key={g.id} grade={g.grade} index={index} small/>
                    )
                })
            }
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
