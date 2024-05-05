import React, {useState, useEffect} from "react";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getRowCountByTableAndUserId} from "../../../../services/serviceFunctions";
import {getTotalMarvelklubbenCountForIssuesData} from "../../../../services/issueService";
import {useAppContext} from "../../../../context/AppContext";
import {getAllGradesByUserId} from "../../../../services/collectingService";
import {getAverageGrade} from "../../../../helpers/functions";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {STATISTICS} from "../../../../helpers/constants/configConstants";
import {getTotalIssuesCountForTitlesData} from "../../../../services/titleService";


export const OverviewIssues = ({titlesData, issuesData}) => {

    const [userIssuesCount, setUserIssuesCount] = useState(null);
    const [totalIssuesCountForCollection, setTotalIssuesCountForCollection] = useState(null);
    const [userMarvelklubbenIssuesCount, setUserMarvelklubbenIssuesCount] = useState(null);
    const [grades, setGrades] = useState(null);
    const [averageGrade, setAverageGrade] = useState(null);
    const {user} = useAppContext();

    useEffect(() => {
        if (user) {
            getRowCountByTableAndUserId(TABLES.USERS_ISSUES, user.id, setUserIssuesCount).then();
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            getAllGradesByUserId(user.id, setGrades).then();
        }
    }, [user]);

    useEffect(() => {
        if (titlesData) {
            let totalCount;
            totalCount = getTotalIssuesCountForTitlesData(titlesData);
            setTotalIssuesCountForCollection(totalCount ? totalCount : 0);
        }
    }, [titlesData]);

    useEffect(() => {
        if (issuesData) {
            let totalCount;
            totalCount = getTotalMarvelklubbenCountForIssuesData(issuesData);
            setUserMarvelklubbenIssuesCount(totalCount ? totalCount : 0);
        }
    }, [issuesData]);

    useEffect(() => {
        if (grades && grades.length) {
            setAverageGrade(getAverageGrade(grades).toFixed(1));
        }
    }, [grades]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.ISSUES.ISSUES}</h2>
                {
                    userIssuesCount ?
                        <>
                            <p>
                                {PANES.OVERVIEW.COLLECTING_ISSUES_1} {userIssuesCount && userIssuesCount} {PANES.OVERVIEW.COLLECTING_ISSUES_2} {STATISTICS.TOTAL_MARVELKLUBBEN_ISSUES_COUNT > 0 ? Math.round(userMarvelklubbenIssuesCount / STATISTICS.TOTAL_MARVELKLUBBEN_ISSUES_COUNT * 100) : 0}%
                                ({userIssuesCount}/{totalIssuesCountForCollection}) {PANES.OVERVIEW.COLLECTING_ISSUES_3}
                            </p>
                            <h3>{PANES.OVERVIEW.GRADE}</h3>
                            <p>{PANES.OVERVIEW.COLLECTING_ISSUES_GRADE_1} <span
                                className={averageGrade > 6 ? "text-success" : "text-danger"}>{averageGrade}</span>.</p>
                        </>
                        :
                        <p>
                            {PANES.OVERVIEW.COLLECTING_ISSUES_1} 0 {PANES.OVERVIEW.COLLECTING_ISSUES_2} 0%
                            (0/0) {PANES.OVERVIEW.COLLECTING_ISSUES_3}
                        </p>
                }
                <h3>{LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN}</h3>
                <p>
                    {PANES.OVERVIEW.COLLECTING_MARVELKLUBBEN_1} {userMarvelklubbenIssuesCount} {PANES.OVERVIEW.COLLECTING_MARVELKLUBBEN_2} {Math.round(userMarvelklubbenIssuesCount / STATISTICS.TOTAL_MARVELKLUBBEN_ISSUES_COUNT * 100)}%
                    ({userMarvelklubbenIssuesCount}/{STATISTICS.TOTAL_MARVELKLUBBEN_ISSUES_COUNT}) {PANES.OVERVIEW.COLLECTING_ISSUES_3}
                </p>
            </div>
        </div>
    )
}
