import React, {useState, useEffect} from "react";
import {PANES, TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getRowCountByTableAndUserId} from "../../../../services/serviceFunctions";
import {getTotalMarvelklubbenCountForIssuesData} from "../../../../services/issueService";
import {useAppContext} from "../../../../context/AppContext";
import {getAllGradesByUserId} from "../../../../services/collectingService";
import {getAverageGrade} from "../../../../helpers/functions";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {ROUTES, STATISTICS} from "../../../../helpers/constants/configConstants";
import {getTotalIssuesCountForTitlesData} from "../../../../services/titleService";
import {csvIconDuoTone, issueIconDuoTone, pdfIconDuoTone} from "../../../icons/Icons.jsx";
import {FunctionButton} from "../../../minis/FunctionButton.jsx";
import {exportMissingIssuesForUser} from "../../../../helpers/exportUtil.js";
import {IconLinkCtaLg} from "../../../minis/IconLinkCtaLg.jsx";
import {DashboardSectionLight} from "../../../pages/pagecomponents/DashboardSectionLight.jsx";


export const OverviewIssuesSection = ({titlesData, issuesData}) => {

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
        <DashboardSectionLight>
            <h2>{LABELS.SECTIONS.ISSUES.ISSUES}</h2>
            <IconLinkCtaLg
                variant={"primary"}
                icon={issueIconDuoTone}
                path={ROUTES.DASHBOARD.PATH_MY_ISSUES}
                label={PANES.ISSUES.NAME}
            />
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
            <h3>{LABELS.SECTIONS.ISSUES.MISSING_ISSUES}</h3>
            <p>{TEXTS.MISSING_ISSUES_DOWNLOAD}</p>
            <FunctionButton
                variant={"btn-primary"}
                icon={csvIconDuoTone}
                onClick={() => exportMissingIssuesForUser(false, user)}
                label={LABELS.SECTIONS.ISSUES.EXPORT_MISSING_CSV}
                showLabel={true}
            />
            <FunctionButton
                variant={"btn-primary"}
                icon={pdfIconDuoTone}
                onClick={() => exportMissingIssuesForUser(true, user)}
                label={LABELS.SECTIONS.ISSUES.EXPORT_MISSING_PDF}
                showLabel={true}
            />
        </DashboardSectionLight>
    )
}
