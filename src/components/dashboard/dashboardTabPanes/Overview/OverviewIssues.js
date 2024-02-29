import React, {useState, useEffect, useCallback} from "react";
import {LABELS_AND_HEADINGS, PANES, TABLES} from "../../../../helpers/constants";
import {
    addTotalValuationValueForUser,
    deleteTotalValuationValueForUserById,
    getRowCountByTableAndUserId,
    getTotalValuationValuesForUser
} from "../../../../services/serviceFunctions";
import {getTotalIssuesCountForTitlesData} from "../../../../services/titleService";
import {useAppContext} from "../../../../context/AppContext";
import {getAllGradesByUserId} from "../../../../services/collectingService";
import {getAverageGrade, getTotalGradeValue} from "../../../../helpers/functions";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {valueIconDuoTone} from "../../../icons-duotone";
import {Icon} from "../../../icons";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";


export const OverviewIssues = ({titlesData}) => {

    const [userIssuesCount, setUserIssuesCount] = useState(null);
    const [totalIssuesCountForCollection, setTotalIssuesCountForCollection] = useState(null);
    const [grades, setGrades] = useState(null);
    const [averageGrade, setAverageGrade] = useState(null);
    const [newCalculatedValuationValue, setNewCalculatedValuationValue] = useState(null);
    const [totalValuationValuesForUser, setTotalValuationValuesForUser] = useState(null);
    const {user} = useAppContext();

    const fetchTotalValuationValuesForUser = useCallback(async () => {
        await getTotalValuationValuesForUser(user.id).then((result) => {
            setTotalValuationValuesForUser(result);
        })
    }, [user.id])

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
        fetchTotalValuationValuesForUser().then();
    }, [fetchTotalValuationValuesForUser]);

    useEffect(() => {
        const fetchTotalGradeValue = async () => {
            if (grades && grades.length) {
                const value = await getTotalGradeValue(grades);
                setNewCalculatedValuationValue(value);
            } else {
                setNewCalculatedValuationValue(0);
            }
        }
        fetchTotalGradeValue().then();
    }, [grades, user.id]);

    const doAddTotalValuationValue = useCallback( () => {
        // Function to delete oldest value
        const deleteValue = async (values) => {
            const idToDelete = values.pop().id;
            await deleteTotalValuationValueForUserById(idToDelete);
        }
        // We must have a new calculated value
        if (newCalculatedValuationValue) {
            // The latest value must not be the same as the new value
            // Also - no more than 20 values are allowed
            if (totalValuationValuesForUser && totalValuationValuesForUser.length > 0) {
                if (totalValuationValuesForUser.length >= 20) {
                    deleteValue(totalValuationValuesForUser).then();
                }
                return totalValuationValuesForUser[0].total_valuation_value !== newCalculatedValuationValue;
            } else {
                // There were no values saved - add new value
                return true;
            }
        } else {
            return false;
        }
    }, [newCalculatedValuationValue, totalValuationValuesForUser]);

    useEffect( () => {
        // Function to add value
        const addValue = async () => {
            await addTotalValuationValueForUser(user.id, newCalculatedValuationValue);
        }
        if (doAddTotalValuationValue()) {
            addValue().then();
        }
    }, [doAddTotalValuationValue, newCalculatedValuationValue, user.id]);

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
                                !!newCalculatedValuationValue ?
                                <>
                                    <p>{PANES.OVERVIEW.COLLECTING_VALUE_1}</p>
                                    <div className={"d-flex justify-content-center p-2 text-grade"}>
                                        <p className={"fs-x-large py-3 px-5 d-flex align-items-center rounded border border-grade"}>
                                            <Icon icon={valueIconDuoTone} size={"2x"} className={"me-3 "}/>
                                            <span>{newCalculatedValuationValue ? newCalculatedValuationValue + " kr" : <CustomSpinner size={"2x"}/>}</span>
                                        </p>
                                    </div>
                                </>
                                    :
                                    <NoDataAvailable isValuation/>
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
