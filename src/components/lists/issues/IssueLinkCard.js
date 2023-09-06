import React from "react";
import {Link} from "react-router-dom";
import {useIssueDisplayName} from "../../../helpers/customHooks/useIssueDisplayName";


export const IssueLinkCard = ({issue}) => {

    const [displayName] = useIssueDisplayName(issue);

    return issue && (
        <li className={"issue-link-card"}>
            <Link to={`/issues/${issue.id}`} title={displayName}>
                <div className={"issue-link-card--content"}>
                    {displayName}
                </div>
            </Link>
        </li>
    )
}
