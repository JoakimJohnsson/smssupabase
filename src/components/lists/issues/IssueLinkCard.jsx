import React from "react";
import {Link} from "react-router-dom";
import {useIssueDisplayName} from "../../../helpers/customHooks/useIssueDisplayName";
import {hasImage} from "../../../helpers/functions";


export const IssueLinkCard = ({issue, simple = false, admin = false}) => {

    const {displayName} = useIssueDisplayName(issue);
    const issuePath = admin ? "/admin/issues/" : "/issues/";

    return issue && (
        <li className={simple ? "issue-link-card simple" : "issue-link-card"}>
            <Link to={`${issuePath}${issue.id}`} title={displayName}>
                <div className={"issue-link-card--content d-flex align-items-center h-100"}>
                    {
                        hasImage(issue) &&
                        <img src={issue.image_url} className={"list-image border-0 list-image--large me-2"} alt={""}/>
                    }
                    <span className={"p-2"}>{displayName}</span>
                </div>
            </Link>
        </li>
    )
}
