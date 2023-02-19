import React, {useCallback, useEffect, useState} from "react";
import {ImageIcon, IssueIcon} from "../../icons";
import {IssueLink} from "./IssueLink";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";
import {hasImage} from "../../../helpers/functions";
import {getNameByTableAndId} from "../../serviceFunctions";
import {Spinner} from "../../minis/Spinner";


export const IssueListItem = ({showAdminInfo, issue, title, issuesData, setIssuesData}) => {

    const [titleName, setTitleName] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTitleName = useCallback(() => {
        getNameByTableAndId(TABLES.TITLES, issue.title_id, setTitleName).then(() => setLoading(false));
    }, [issue]);

    useEffect(() => {
        if (!title) {
            fetchTitleName();
        } else {
            setTitleName(title.name)
            setLoading(false);
        }
    }, [title, fetchTitleName])

    return loading ? (<Spinner/>) : (
        <li className={"list-group-item px-0"}>
            <div className={"row"}>
                <div className={"sms-list-col--main"}>
                    <div>
                        <IssueIcon size={"1x"} className={"me-2"}/>
                        {
                            hasImage(issue) && showAdminInfo &&
                            <ImageIcon size={"1x"} className={"me-2 text-success"}/>
                        }
                        <IssueLink showAdminInfo={showAdminInfo} issue={issue} titleName={titleName}/>
                    </div>
                </div>
                <div className={"sms-list-col--tools"}>
                    {
                        <ListToolBox
                            item={issue}
                            name={issue.number}
                            displayName={titleName + " " + issue.number + " " + issue.year}
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
