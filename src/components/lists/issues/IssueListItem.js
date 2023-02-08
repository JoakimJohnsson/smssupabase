import React from "react";
import {ImageIcon, IssuesIcon} from "../../icons";
import {IssueLink} from "./IssueLink";
import {IssuesListToolBox} from "./IssuesListToolBox";


export const IssueListItem = ({showAdminInfo, issue, title, issuesData, setIssuesData}) => {
    return (
        <li className={"list-group-item px-0"}>
            <div className={"row"}>
                <div className={"sms-list-col--main"}>
                    <div>
                        <IssuesIcon size={"1x"} className={"me-2"}/>
                        {
                            issue && issue.image_filename && issue.image_url &&
                            <ImageIcon size={"1x"} className={"me-2"}/>
                        }
                        <IssueLink showAdminInfo={showAdminInfo} issue={issue} title={title}/>
                    </div>
                </div>
                <div className={"sms-list-col--tools"}>
                    {
                        <IssuesListToolBox
                            issue={issue}
                            issuesData={issuesData}
                            setIssuesData={setIssuesData}
                            showAdminInfo={showAdminInfo}
                        />
                    }
                </div>
            </div>
        </li>
    )
}
