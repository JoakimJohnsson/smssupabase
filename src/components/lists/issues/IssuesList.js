import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {getIndexList} from "../../../helpers/functions";
import {IssuesListGrid} from "./IssuesListGrid";
import {IssuesListAccordion} from "./IssuesListAccordion";
import {IssuesListGrades} from "./IssuesListGrades";


export const IssuesList = ({
                               issuesData,
                               setIssuesData,
                               showAdminInfo,
                               showCollectingButtons,
                               listViewGrid = false,
                               listViewMissing = false,
                               listViewGrades = false,
                               fetchTitleProgress,
                               doUpdate
                           }) => {

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
            listViewGrades ?
                <IssuesListGrades groupedIssuesData={groupedIssuesData}/>
                :
                listViewGrid ?
                    <IssuesListGrid groupedIssuesData={groupedIssuesData} groupedIssuesDataIndexes={groupedIssuesDataIndexes} issuesData={issuesData}
                                    showAdminInfo={showAdminInfo} setIssuesData={setIssuesData} showCollectingButtons={showCollectingButtons}
                                    fetchTitleProgress={fetchTitleProgress} listViewMissing={listViewMissing} doUpdate={doUpdate}/>
                    :
                    <IssuesListAccordion groupedIssuesData={groupedIssuesData} groupedIssuesDataIndexes={groupedIssuesDataIndexes}
                                         issuesData={issuesData}
                                         showAdminInfo={showAdminInfo} setIssuesData={setIssuesData} showCollectingButtons={showCollectingButtons}
                                         fetchTitleProgress={fetchTitleProgress}/>
        )
        :
        <NoDataAvailable/>
}
