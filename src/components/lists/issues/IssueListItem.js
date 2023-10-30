import React from "react";
import {IssueLink} from "./IssueLink";
import {BUCKETS, ROUTES, TABLES} from "../../../helpers/constants";
import {ListToolBox} from "../ListToolBox";
import {getIssueName, hasImage} from "../../../helpers/functions/functions";
import {useIsCollectingIssue} from "../../../helpers/customHooks/useIsCollectingIssue";
import {useAppContext} from "../../../context/AppContext";


export const IssueListItem = ({showAdminInfo, issue, issuesData, setIssuesData, showCollectingButtons, fetchTitleProgress}) => {

    const {user} = useAppContext();
    const [isCollectingIssue, setIsCollectingIssue] = useIsCollectingIssue(user.id, issue.id);

    return (
        <li className={"list-group-item px-0"}>
            <div className={"row"}>
                <div className={"sms-list-col--main"}>
                    <div className={"d-flex align-items-center"}>
                        {
                            hasImage(issue) &&
                            <img src={issue.image_url} className={`list-image me-2${isCollectingIssue ? "" : " grayscale"}`} alt={""}/>
                        }
                        <IssueLink showAdminInfo={showAdminInfo} issue={issue} issueName={getIssueName(issue)}/>
                    </div>
                </div>
                {
                    (showCollectingButtons || showAdminInfo) &&
                    <div className={"sms-list-col--tools"}>
                        {
                            <ListToolBox
                                item={issue}
                                name={issue.number}
                                displayName={getIssueName(issue)}
                                data={issuesData}
                                setData={setIssuesData}
                                showAdminInfo={showAdminInfo}
                                route={ROUTES.ADMIN.ISSUES}
                                table={TABLES.ISSUES}
                                imageBucket={BUCKETS.ISSUE_IMAGES}
                                fetchTitleProgress={fetchTitleProgress}
                                isIssue
                                isCollectingIssue={isCollectingIssue}
                                setIsCollectingIssue={setIsCollectingIssue}
                            />
                        }
                    </div>
                }
            </div>
        </li>
    )
}
