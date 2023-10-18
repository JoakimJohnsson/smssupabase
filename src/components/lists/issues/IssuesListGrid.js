import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {IssueGridCard} from "./IssueGridCard";


export const IssuesListGrid = ({groupedIssuesData, showCollectingButtons, fetchTitleProgress, listViewMissing, doUpdate}) => {

    return (
        <div className={"mb-4"}>
            {
                groupedIssuesData.length &&
                (groupedIssuesData.map((year, index) =>
                        <div key={index}>
                            <h3 className={"h5"}>{year[0].year}</h3>
                            <ul className={"sms-list--with-cards mb-0"}>
                                {
                                    year.length ?
                                        (year.sort((a, b) => a.number - b.number).map((issue) =>
                                            <IssueGridCard key={issue.id} issue={issue} showCollectingButtons={showCollectingButtons}
                                                           fetchTitleProgress={fetchTitleProgress} listViewMissing={listViewMissing} doUpdate={doUpdate}/>
                                        ))
                                        :
                                        (<NoDataAvailable/>)
                                }
                            </ul>
                        </div>)
                )
            }
        </div>
    )
}
