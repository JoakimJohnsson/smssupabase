import React, {useState, useEffect} from "react";
import {LABELS_AND_HEADINGS, PANES, TABLES} from "../../../../helpers/constants";
import {getRowCountByTableAndUserId} from "../../../../services/serviceFunctions";
import {getTotalIssuesCountForTitlesData} from "../../../../services/titleService";
import {useAppContext} from "../../../../context/AppContext";
import {getAllGradesByUserId} from "../../../../services/collectingService";
import {getAverageGrade, getTotalGradeValue} from "../../../../helpers/functions";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {valueIconDuoTone} from "../../../icons-duotone";
import {Icon} from "../../../icons";


export const OverviewIssues = ({titlesData}) => {

    const [userIssuesCount, setUserIssuesCount] = useState(null);
    const [totalIssuesCountForCollection, setTotalIssuesCountForCollection] = useState(null);
    const [grades, setGrades] = useState(null);
    const [averageGrade, setAverageGrade] = useState(null);
    const [totalValue, setTotalValue] = useState(null);
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
            if (totalCount) {
                setTotalIssuesCountForCollection(totalCount);
            }
        }
    }, [titlesData]);

    useEffect(() => {
        if (grades && grades.length) {
            setAverageGrade(getAverageGrade(grades).toFixed(1));
        }
    }, [grades]);

    useEffect(() => {
        const fetchTotalGradeValue = async () => {
            if (grades && grades.length) {
                const value = await getTotalGradeValue(grades);
                setTotalValue(value);
            } else {
                setTotalValue(0);
            }
        }
        fetchTotalGradeValue().then();
    }, [grades]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                {
                    userIssuesCount ?
                        <>
                            <p>
                                {PANES.OVERVIEW.COLLECTING_ISSUES_1} {userIssuesCount && userIssuesCount} {PANES.OVERVIEW.COLLECTING_ISSUES_2} {Math.round(userIssuesCount / totalIssuesCountForCollection * 100)}%
                                ({userIssuesCount}/{totalIssuesCountForCollection}) {PANES.OVERVIEW.COLLECTING_ISSUES_3}
                            </p>
                            {
                                !!totalValue &&
                                <>
                                    <p>{PANES.OVERVIEW.COLLECTING_VALUE_1}</p>
                                    <div className={"d-flex justify-content-center p-2 text-grade"}>
                                        <p className={"fs-x-large py-3 px-5 d-flex align-items-center rounded border border-grade"}>
                                            <Icon icon={valueIconDuoTone} size={"2x"} className={"me-3 "}/>
                                            <span>{totalValue ? totalValue + " kr" : <CustomSpinner size={"2x"}/>}</span>
                                        </p>
                                    </div>
                                </>
                            }

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
            </div>
        </div>
    )
}
