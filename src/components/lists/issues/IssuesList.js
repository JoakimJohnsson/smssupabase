import React from "react";
import {IssuesListToolBox} from "./IssuesListToolBox";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {TitlesIcon} from "../../icons";
import {IssueLink} from "./IssueLink";


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
                                                    <li key={index} className={"list-group-item px-0"}>
                                                        <div className={"row"}>
                                                            <div className={"sms-list-col--main"}>
                                                                <div>
                                                                    <TitlesIcon textVariant={"md"}/>
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
                                                    </li>)
                                            )
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
