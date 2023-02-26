import React, {useCallback, useEffect, useState} from "react";
import {ImageIcon, IssueIcon} from "../../icons";
import {IssueLink} from "./IssueLink";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";
import {getIssueName, hasImage} from "../../../helpers/functions";
import {getRowByTableAndId} from "../../serviceFunctions";
import {CustomSpinner} from "../../minis/CustomSpinner";


export const IssueListItem = ({showAdminInfo, issue, issuesData, setIssuesData}) => {

    const [title, setTitle] = useState({});
    const [issueName, setIssueName] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTitle = useCallback(() => {
        if (issue.title_id) {
            getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => setLoading(false));
        }
    }, [issue.title_id]);

    useEffect(() => {
            fetchTitle();
            if (title) {
                setIssueName(getIssueName(title, issue))
                setLoading(false);
            }
    }, [title, issue, fetchTitle])

    return loading ? (<CustomSpinner/>) : (
        <li className={"list-group-item px-0"}>
            <div className={"row"}>
                <div className={"sms-list-col--main"}>
                    <div>
                        <IssueIcon size={"1x"} className={"me-2"}/>
                        {
                            hasImage(issue) && showAdminInfo &&
                            <ImageIcon size={"1x"} className={"me-2 text-success"}/>
                        }
                        <IssueLink showAdminInfo={showAdminInfo} issue={issue} issueName={issueName}/>
                    </div>
                </div>
                <div className={"sms-list-col--tools"}>
                    {
                        <ListToolBox
                            item={issue}
                            name={issue.number}
                            displayName={issueName}
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
