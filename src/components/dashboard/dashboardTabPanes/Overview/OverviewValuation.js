import React, {useState, useEffect, useCallback} from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import {
    addTotalValuationValueForUser,
    deleteTotalValuationValueForUserById,
    getTotalValuationValuesForUser
} from "../../../../services/serviceFunctions";
import {useAppContext} from "../../../../context/AppContext";
import {getAllGradesByUserId} from "../../../../services/collectingService";
import {getTotalGradeValue} from "../../../../helpers/functions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {OverviewIssuesValueComparison} from "./OverviewIssuesValueComparison";
import {CustomSpinner} from "../../../minis/CustomSpinner";


export const OverviewValuation = () => {

    const [loading, setLoading] = useState(false);
    const [loadingNewValue, setLoadingNewValue] = useState(false);
    const [grades, setGrades] = useState(null);
    const [newCalculatedValuationValue, setNewCalculatedValuationValue] = useState(null);
    const [totalValuationValuesForUser, setTotalValuationValuesForUser] = useState(null);
    const {user} = useAppContext();

    const fetchTotalValuationValuesForUser = useCallback(async () => {
        setLoading(true);
        await getTotalValuationValuesForUser(user.id).then((result) => {
            setTotalValuationValuesForUser(result);
            setLoading(false);
        })
    }, [user.id])

    useEffect(() => {
        if (user) {
            getAllGradesByUserId(user.id, setGrades).then();
        }
    }, [user]);

    useEffect(() => {
        fetchTotalValuationValuesForUser().then();
    }, [fetchTotalValuationValuesForUser]);

    useEffect(() => {
        const fetchTotalGradeValue = async () => {
            setLoadingNewValue(true);
            if (grades && grades.length) {
                const value = await getTotalGradeValue(grades);
                setNewCalculatedValuationValue(value);
            } else {
                setNewCalculatedValuationValue(0);
            }
        }
        fetchTotalGradeValue().then(() => setLoadingNewValue(false));
    }, [grades, user.id]);

    const doAddTotalValuationValue = useCallback(() => {
        // Function to delete oldest value
        const deleteValue = async (values) => {
            const idToDelete = values[values.length - 1].id;
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

    useEffect(() => {
        // Function to add value
        const addValue = async () => {
            await addTotalValuationValueForUser(user.id, newCalculatedValuationValue);
        }
        if (doAddTotalValuationValue()) {
            addValue().then(() => {
                fetchTotalValuationValuesForUser().then();
            });
        }
    }, [doAddTotalValuationValue, fetchTotalValuationValuesForUser, newCalculatedValuationValue, user.id]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.VALUATION}</h2>
                <>
                    {loadingNewValue && <NoDataAvailable isValuation/>}
                    {
                        loading ?
                            <CustomSpinner className={"mb-3"} size={"2x"}/>
                            :
                            totalValuationValuesForUser && totalValuationValuesForUser.length > 1 &&
                            <OverviewIssuesValueComparison
                                oldValue={totalValuationValuesForUser[1].total_valuation_value}
                                timeStamp={totalValuationValuesForUser[1].total_valuation_date}
                                newValue={totalValuationValuesForUser[0].total_valuation_value}
                            />
                    }
                </>
            </div>
        </div>
    )
}
