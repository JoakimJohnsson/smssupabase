import React, {useState, useEffect} from "react";
import {LABELS_AND_HEADINGS, PANES, TABLES} from "../../../../helpers/constants";
import {getRowCountByTableAndUserId} from "../../../../services/serviceFunctions";
import {getTotalIssuesCountForTitlesData} from "../../../../services/titleService";
import {useAppContext} from "../../../../context/AppContext";


export const OverviewIssues = ({titlesData}) => {

    const [userIssuesCount, setUserIssuesCount] = useState(null);
    const [totalIssuesCountForCollection, setTotalIssuesCountForCollection] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        if (user) {
            getRowCountByTableAndUserId(TABLES.USERS_ISSUES, user.id, setUserIssuesCount).then();
        }
    }, [user]);

    useEffect(() => {
        if (titlesData) {
            let totalCount;
            totalCount = getTotalIssuesCountForTitlesData(titlesData);
            if (totalCount) {
                setTotalIssuesCountForCollection(totalCount);
            }
        }
    }, [titlesData]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
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
        </div>
    )
}
