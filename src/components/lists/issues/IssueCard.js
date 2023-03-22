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
import {MarvelKlubbenBadge} from "../../grade/MarvelKlubbenBadge";
import {Link} from "react-router-dom";


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

            <Link to={`/issues/${issue.id}`} title={displayName}>
                <div className={"cover-image--wrapper"}>
                    <img
                        src={issue.image_url}
                        alt={displayName}
                        className="cover-image"
                    />
                </div>
            </Link>
            <div className={"d-flex align-items-center mb-2"}>
                <MarvelKlubbenBadge number={issue.marvelklubben_number}/>
                {
                    isCollectingTitle &&
                    <button
                        aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                        className={`btn btn-sm ${isCollectingIssue ? "btn-success" : "btn-danger"} justify-content-center`}
                        onClick={() => handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue)}>
                        {
                            isCollectingIssue ?
                                <><Icon icon={faMinus} size={"2x"}/></>
                                :
                                <><Icon icon={faPlus} size={"2x"}/></>
                        }
                    </button>
                }
            </div>
            {
                !isCollectingTitle &&
                <Link to={`/titles/${title.id}`} title={title.name} className={"d-flex justify-content-center"}>
                    <img
                        src={title.image_url}
                        alt={title.name}
                        className="w-50 bg-light"
                    />
                </Link>
            }
        </li>
    )
}
