import React from "react";
import {Link} from "react-router-dom";
import {TextSpacer} from "../../minis/TextSpacer";
import {FriendlyDate} from "../../minis/FriendlyDate";
import {IssuesListAdminToolBox} from "./IssuesListAdminToolBox";
import {IssuesListUserToolBox} from "./IssuesListUserToolBox";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {TitlesIcon} from "../../icons";


export const IssuesList = ({issuesData, setIssuesData, showAdminInfo}) => {

    return issuesData && (
        <ul className={"sms-list--with-tools"}>
            {
                issuesData.length ?
                    (issuesData.map((issue, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div>
                                            <TitlesIcon textVariant={"md"}/>
                                            <Link to={showAdminInfo ? `/admin/issues/${issue.id}` : `/issues/${issue.id}`} className={"me-3"}>
                                                #{issue.number} {issue.year}
                                            </Link>
                                        </div>
                                        <div>
                                            {issue.start_year}
                                            <TextSpacer character={"|"} margin={"mx-2"}/>
                                            Inlagd: <FriendlyDate dateString={issue.created_at}/>
                                        </div>
                                    </div>
                                    <div className={"sms-list-col--tools"}>
                                        {
                                            showAdminInfo ?
                                                <IssuesListAdminToolBox
                                                    issue={issue}
                                                    issuesData={issuesData}
                                                    setIssuesData={setIssuesData}
                                                />
                                                :
                                                <IssuesListUserToolBox/>
                                        }
                                    </div>
                                </div>
                            </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
