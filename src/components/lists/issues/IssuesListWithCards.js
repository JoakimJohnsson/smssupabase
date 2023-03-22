import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {sortByName} from "../../../helpers/functions/functions";
import {IssueCard} from "./IssueCard";


export const IssuesListWithCards = ({issuesData}) => {

    return issuesData && (
        <ul className={"sms-list--with-cards"}>
            {
                issuesData.length ?
                    (issuesData.sort((a, b) => sortByName(a, b)).map((issue, index) =>
                            <IssueCard key={index} issueId={issue.id}/>
                        )
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
