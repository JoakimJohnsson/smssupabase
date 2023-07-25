import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {IssueGridCard} from "./IssueGridCard";


export const IssuesListSimple = ({issuesData, showCollectingButtons}) => {

    return issuesData && issuesData.length ?

        <ul className={"sms-list--with-cards mb-0"}>
            {
                issuesData.map((issue) =>
                    <IssueGridCard key={issue.id} issue={issue} showCollectingButtons={showCollectingButtons}/>
                )
            }
        </ul>
        :
        <NoDataAvailable/>
}
