import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {IssueGridCard} from "./IssueGridCard";


export const IssuesGrid = ({groupedIssuesData, showCollectingButtons}) => {

    return (
        <div className={"mb-4"}>
            {
                groupedIssuesData.length &&
                (groupedIssuesData.map((year, index) =>
                        <div key={index}>
                            <h2 className={"h5"}>{year[0].year}</h2>
                            <ul className={"sms-list--with-cards mb-0"}>
                                {
                                    year.length ?
                                        (year.sort((a, b) => a.number - b.number).map((issue) =>
                                            <IssueGridCard key={issue.id} issue={issue} showCollectingButtons={showCollectingButtons}/>
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
