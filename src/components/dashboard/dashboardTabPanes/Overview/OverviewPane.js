import React, {useState, useEffect} from "react";
import {PANES, TABLES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {getCountByTable, getRowCountByTableAndUserId} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {getTitlesForUser, getTotalIssuesCountForTitlesData} from "../../../../helpers/functions/serviceFunctions/titleFunctions";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesData, setUserTitlesData] = useState(null);
    const [totalIssuesCountForCollection, setTotalIssuesCountForCollection] = useState(null);
    const [userIssuesCount, setUserIssuesCount] = useState(null);
    const [totalTitles, setTotalTitles] = useState(0);

    useEffect(() => {
        if (user) {
            getTitlesForUser(user.id, setUserTitlesData).then();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getRowCountByTableAndUserId(TABLES.USERS_ISSUES, user.id, setUserIssuesCount).then();
        }
    }, [user]);

    useEffect(() => {
        if (userTitlesData) {
            let totalCount;
            totalCount = getTotalIssuesCountForTitlesData(userTitlesData);
            if (totalCount) {
                setTotalIssuesCountForCollection(totalCount);
            }
        }
    }, [userTitlesData]);

    useEffect(() => {
        getCountByTable(TABLES.TITLES, setTotalTitles).then();
    }, []);

    return (
        <div>
            <h1>{PANES.OVERVIEW.NAME}</h1>
            {
                userTitlesData ?
                    <p>
                        {PANES.OVERVIEW.COLLECTING_TITLES_1} {userTitlesData.length} {PANES.OVERVIEW.COLLECTING_TITLES_2} {totalTitles} {PANES.OVERVIEW.COLLECTING_TITLES_3}
                    </p>
                    :
                    <CustomSpinner className={"mb-3 d-block"}/>
            }
            {
                userIssuesCount ?
                    <p>
                        {PANES.OVERVIEW.COLLECTING_ISSUES_1} {userIssuesCount && userIssuesCount} {PANES.OVERVIEW.COLLECTING_ISSUES_2} {Math.round(userIssuesCount / totalIssuesCountForCollection * 100)}%
                        ({userIssuesCount}/{totalIssuesCountForCollection}) {PANES.OVERVIEW.COLLECTING_ISSUES_3}
                    </p>
                    :
                    <p>
                        {PANES.OVERVIEW.COLLECTING_ISSUES_1} 0 {PANES.OVERVIEW.COLLECTING_ISSUES_2} 0%
                        (0/0) {PANES.OVERVIEW.COLLECTING_ISSUES_3}
                    </p>
            }
        </div>
    )
}
