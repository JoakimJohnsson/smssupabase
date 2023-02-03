import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {IssueListItem} from "./IssueListItem";


export const IssuesList = ({issuesData, setIssuesData, showAdminInfo, title}) => {

    let groupedIssuesData = [];
    // Group issuesData by year
    if (issuesData) {
        groupedIssuesData = Object.values(issuesData.reduce((acc, x) => {
            acc[x.year] = [...(acc[x.year] || []), x];
            return acc;
        }, {}));
    }

    return issuesData && groupedIssuesData.length && (
        <ul className={"list-unstyled p-0"}>
            {
                groupedIssuesData.length ?
                    (groupedIssuesData.map((year, index) =>
                            <li key={index}>
                                <p className={"mb-1"}>{year[0].year}</p>
                                <ul className={"sms-list--with-tools"}>
                                    {
                                        year.length ?
                                            (year.map((issue, index) =>
                                                <IssueListItem
                                                    key={issue.id}
                                                    index={index}
                                                    showAdminInfo={showAdminInfo}
                                                    issue={issue}
                                                    title={title}
                                                    setIssuesData={setIssuesData}
                                                    issuesData={issuesData}
                                                />))
                                            :
                                            (<NoDataAvailable/>)
                                    }
                                </ul>
                            </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
