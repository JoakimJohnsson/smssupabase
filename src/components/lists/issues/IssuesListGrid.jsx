import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {IssueGridCard} from "./IssueGridCard";
import {sortByNumberAndVariantSuffix} from "../../../helpers/functions";
import {SmsListWithCards} from "../../pages/pagecomponents/SmsListWithCards.jsx";


export const IssuesListGrid = ({groupedIssuesData, showCollectingButtons, fetchTitleProgress, listViewMissing, doUpdate}) => {

    return (
        <div className={"mb-4"}>
            {
                groupedIssuesData.length &&
                (groupedIssuesData.map((year, index) =>
                        <div key={index}>
                            <h3 className={"h5"}>{year[0].year}</h3>
                            <SmsListWithCards>
                                {
                                    year.length ?
                                        (year.sort((a, b) => sortByNumberAndVariantSuffix(a, b)).map((issue) =>
                                            <IssueGridCard key={issue.id} issue={issue} showCollectingButtons={showCollectingButtons}
                                                           fetchTitleProgress={fetchTitleProgress} listViewMissing={listViewMissing} doUpdate={doUpdate}/>
                                        ))
                                        :
                                        (<NoDataAvailable/>)
                                }
                            </SmsListWithCards>
                        </div>)
                )
            }
        </div>
    )
}
