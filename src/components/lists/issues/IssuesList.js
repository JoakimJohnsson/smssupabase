import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {getIndexList} from "../../../helpers/functions/functions";
import {IssuesListGrid} from "./IssuesListGrid";
import {IssuesListAccordion} from "./IssuesListAccordion";


export const IssuesList = ({issuesData, setIssuesData, showAdminInfo, showCollectingButtons, listViewGrid = false, listViewMissing = false, fetchTitleProgress}) => {

    let groupedIssuesData = [];
    let groupedIssuesDataIndexes = [];

    // Group issuesData by year - prepare array of indexes for default active keys
    if (issuesData) {
        groupedIssuesData = Object.values(issuesData.reduce((acc, x) => {
            acc[x.year] = [...(acc[x.year] || []), x];
            return acc;
        }, {}));
        groupedIssuesDataIndexes = getIndexList(groupedIssuesData.length)
    }

    return issuesData && issuesData.length && groupedIssuesData.length ?
        (
            listViewGrid ?
                <IssuesListGrid groupedIssuesData={groupedIssuesData} groupedIssuesDataIndexes={groupedIssuesDataIndexes} issuesData={issuesData}
                                showAdminInfo={showAdminInfo} setIssuesData={setIssuesData} showCollectingButtons={showCollectingButtons}
                                fetchTitleProgress={fetchTitleProgress} listViewMissing={listViewMissing}/>
                :
                <IssuesListAccordion groupedIssuesData={groupedIssuesData} groupedIssuesDataIndexes={groupedIssuesDataIndexes} issuesData={issuesData}
                                     showAdminInfo={showAdminInfo} setIssuesData={setIssuesData} showCollectingButtons={showCollectingButtons}
                                     fetchTitleProgress={fetchTitleProgress}/>
        )
        :
        <NoDataAvailable/>
}
