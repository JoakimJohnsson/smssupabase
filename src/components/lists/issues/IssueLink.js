import React from "react";
import {Link} from "react-router-dom";


export const IssueLink = ({showAdminInfo, issue, issueName}) => {

    return (
        <Link to={showAdminInfo ? `/admin/issues/${issue.id}` : `/issues/${issue.id}`}
              className={"me-3"}>
                {issueName}
        </Link>
    )
}
