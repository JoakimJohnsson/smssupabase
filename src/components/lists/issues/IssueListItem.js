import React, {useCallback, useEffect, useState} from "react";
import {IssueLink} from "./IssueLink";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";
import {getIssueName, hasImage} from "../../../helpers/functions/functions";
import {getRowByTableAndId} from "../../../helpers/functions/serviceFunctions/serviceFunctions";
import {CustomSpinner} from "../../minis/CustomSpinner";


export const IssueListItem = ({showAdminInfo, issue, issuesData, setIssuesData}) => {

    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchTitle = useCallback(() => {
            getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => {
                setLoading(false)
            });
    }, [issue.title_id]);

    useEffect(() => {
            fetchTitle();
    }, [fetchTitle])

    return loading ? (<CustomSpinner/>) : (
        <li className={"list-group-item px-0"}>
            <div className={"row"}>
                <div className={"sms-list-col--main"}>
                    <div className={"d-flex align-items-center"}>
                        {
                            hasImage(issue) &&
                            <img src={issue.image_url} className={"list-image me-2"} alt={issue.name}/>
                        }
                        <IssueLink showAdminInfo={showAdminInfo} issue={issue} issueName={getIssueName(title, issue)}/>
                    </div>
                </div>
                <div className={"sms-list-col--tools"}>
                    {
                        <ListToolBox
                            item={issue}
                            name={issue.number}
                            displayName={getIssueName(title, issue)}
                            data={issuesData}
                            setData={setIssuesData}
                            showAdminInfo={showAdminInfo}
                            route={ROUTES.ADMIN.ISSUES}
                            table={TABLES.ISSUES}
                            imageBucket={BUCKETS.ISSUE_IMAGES}
                            isIssue
                        />
                    }
                </div>
            </div>
        </li>
    )
}
