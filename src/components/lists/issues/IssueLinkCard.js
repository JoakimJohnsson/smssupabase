import React from "react";
import {Link} from "react-router-dom";
import {useIssueDisplayName} from "../../../helpers/customHooks/useIssueDisplayName";
import {hasImage} from "../../../helpers/functions";


export const IssueLinkCard = ({issue, index, simple = false}) => {

    const [displayName] = useIssueDisplayName(issue);

    return issue && (
        <li className={simple ? "issue-link-card simple" : "issue-link-card"}>
            <Link to={`/issues/${issue.id}`} title={displayName}>
                <div className={"issue-link-card--content d-flex align-items-center"}>
                    {
                        hasImage(issue) && index < 24 &&
                        <img src={issue.image_url} className={"list-image list-image--large me-3"} alt={""}/>
                    }
                    {displayName}
                </div>
            </Link>
        </li>
    )
}
