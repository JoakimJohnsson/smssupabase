import React from "react";
import {ImageIcon, IssueIcon} from "../../icons";
import {IssueLink} from "./IssueLink";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";


export const IssueListItem = ({showAdminInfo, issue, title, issuesData, setIssuesData}) => {
    return (
        <li className={"list-group-item px-0"}>
            <div className={"row"}>
                <div className={"sms-list-col--main"}>
                    <div>
                        <IssueIcon size={"1x"} className={"me-2"}/>
                        {
                            issue && issue.image_filename && issue.image_url &&
                            <ImageIcon size={"1x"} className={"me-2 text-success"}/>
                        }
                        <IssueLink showAdminInfo={showAdminInfo} issue={issue} title={title}/>
                    </div>
                </div>
                <div className={"sms-list-col--tools"}>
                    {
                        <ListToolBox
                            item={issue}
                            name={issue.number}
                            data={issuesData}
                            setData={setIssuesData}
                            showAdminInfo={showAdminInfo}
                            route={ROUTES.ADMIN.ISSUES}
                            table={TABLES.ISSUES}
                            imageBucket={BUCKETS.ISSUE_IMAGES}
                        />
                    }
                </div>
            </div>
        </li>
    )
}
