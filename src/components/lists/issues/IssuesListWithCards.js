import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {sortByName} from "../../../helpers/functions/functions";


export const IssuesListWithCards = ({issuesData}) => {

    return issuesData && (
        <ul className={"sms-list--with-cards"}>
            {
                issuesData.length ?
                    (issuesData.sort((a, b) => sortByName(a, b)).map((issue, index) =>
                            <li key={index} className={"title-card"}>
                                <p>#{issue.number} {issue.year}</p>
                            </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
