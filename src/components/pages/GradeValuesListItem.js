import React, {useState, useCallback, useEffect} from "react";
import {IssuesList} from "../lists/issues/IssuesList";
import {getIssuesWithTitleAndPublisherAndGradeValuesByTitleId} from "../../services/issueService";
import {OverlaySpinner} from "../minis/OverlaySpinner";


export const GradeValuesListItem = ({title, isActive}) => {

    const [issuesData, setIssuesData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchIssuesData = useCallback(() => {
        if (isActive && title && title.id) {
            getIssuesWithTitleAndPublisherAndGradeValuesByTitleId(setIssuesData, title.id).then(() => setLoading(false));
        }
    }, [isActive, title]);

    useEffect(() => {
        if (isActive) {
            fetchIssuesData();
        }
    }, [fetchIssuesData, isActive]);

    return (
        <div key={title.id} className={"col-12"}>
            {
                loading ?
                    <OverlaySpinner />
                    :
                    <IssuesList issuesData={issuesData}
                                showAdminInfo={false}
                                showCollectingButtons={false}
                                listViewGrades={true}
                                fetchTitleProgress={false}
                                doUpdate={false}/>

            }
        </div>
    )
}
