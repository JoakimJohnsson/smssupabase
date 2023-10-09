import React, {useState, useEffect} from "react";
import {PANES, STATISTICS, TABLES} from "../../../helpers/constants";
import {useAppContext} from "../../../context/AppContext";
import {getRowCountByTableAndUserId} from "../../../helpers/functions/serviceFunctions/serviceFunctions";
import {CustomSpinner} from "../../minis/CustomSpinner";
import {getTitlesForUser, getTotalIssuesCountForTitlesData} from "../../../helpers/functions/serviceFunctions/titleFunctions";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesData, setUserTitlesData] = useState(null);
    const [totalIssuesCountForCollection, setTotalIssuesCountForCollection] = useState(null);
    const [userIssuesCount, setUserIssuesCount] = useState(null);

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

    return (
        <div>
            <h1>{PANES.OVERVIEW.NAME}</h1>
            {
                userTitlesData ?
                    <p>
                        {PANES.OVERVIEW.COLLECTING_TITLES_1} {userTitlesData.length} {PANES.OVERVIEW.COLLECTING_TITLES_2} {STATISTICS.TOTAL_TITLES_COUNT} {PANES.OVERVIEW.COLLECTING_TITLES_3}
                    </p>
                    :
                    <CustomSpinner className={"mb-3"}/>
            }
            {
                userIssuesCount ?
                    <p>
                        {PANES.OVERVIEW.COLLECTING_ISSUES_1} {userIssuesCount && userIssuesCount} {PANES.OVERVIEW.COLLECTING_ISSUES_2} {Math.round(userIssuesCount / totalIssuesCountForCollection * 100)}%
                        ({userIssuesCount}/{totalIssuesCountForCollection}) {PANES.OVERVIEW.COLLECTING_ISSUES_3}
                    </p>
                    :
                    <CustomSpinner className={"mb-3"}/>

            }
        </div>
    )
}
