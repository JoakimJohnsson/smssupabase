import React, {useState, useCallback, useEffect} from "react";
import {CONFIG, LABELS_AND_HEADINGS, PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../../../headings";
import * as ServiceFunctions from "../../../../services/serviceFunctions";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {Logger} from "../../../minis/Logger";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {getFriendlyDateFromTimestamp, getTinyFriendlyDateFromTimestamp, getTotalGradeValue} from "../../../../helpers/functions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {FunctionButton} from "../../../minis/FunctionButton";
import {valueIconDuoTone} from "../../../icons";
import {getAllGradesByUserId} from "../../../../services/collectingService";


export const ValuationPane = () => {

    const {user, setInformationMessage} = useAppContext();
    const [loading, setLoading] = useState(false);
    const [totalValuationValuesForUser, setTotalValuationValuesForUser] = useState(null);
    const [grades, setGrades] = useState(null);
    const [loadingNewValue, setLoadingNewValue] = useState(false);

    const fetchTotalValuationValuesForUser = useCallback(async () => {
        setLoading(true);
        await ServiceFunctions.getTotalValuationValuesForUser(user.id).then((result) => {
            setTotalValuationValuesForUser(result);
            setTimeout(() => {
                setLoading(false);
            }, CONFIG.TIMEOUT_LG);
        })
    }, [user.id]);

    useEffect(() => {
        if (user) {
            getAllGradesByUserId(user.id, setGrades).then();
        }
    }, [user]);

    const deleteValue = async (values) => {
        // Values are sorted ascending
        if (values && values.length >= 20) {
            const idToDelete = values[0].id;
            await ServiceFunctions.deleteTotalValuationValueForUserById(idToDelete);
        }
    }

    useEffect(() => {
        fetchTotalValuationValuesForUser().then();
    }, [fetchTotalValuationValuesForUser]);

    const handleDoCalculateAndAddNewValue = async () => {
        setLoadingNewValue(true);
        if (grades && grades.length > 0) {
            const newTotalValuationValue = await getTotalGradeValue(grades);
            if (totalValuationValuesForUser && totalValuationValuesForUser.length > 0) {
                // Delete oldest value if too many values
                if (totalValuationValuesForUser && totalValuationValuesForUser.length >= CONFIG.MAX_VALUATION_VALUES) {
                    await deleteValue(totalValuationValuesForUser);
                }
                // Only update if it differs from latest value
                if (newTotalValuationValue !== totalValuationValuesForUser[totalValuationValuesForUser.length - 1].total_valuation_value) {
                    // Add the new value
                    await ServiceFunctions.addTotalValuationValueForUser(user.id, newTotalValuationValue);
                } else {
                    // No need to save new value
                    setInformationMessage({show: true, status: 2, error: LABELS_AND_HEADINGS.VALUATION_CALCULATE_MESSAGE_1});
                }
            } else {
                // Add the new value
                await ServiceFunctions.addTotalValuationValueForUser(user.id, newTotalValuationValue);
            }
            await fetchTotalValuationValuesForUser();
            setLoadingNewValue(false);
        } else {
            // No grades found
            // No need to save new value
            setLoadingNewValue(false);
            setInformationMessage({show: true, status: 1, error: LABELS_AND_HEADINGS.VALUATION_CALCULATE_MESSAGE_3});
        }
    };

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length && payload[0].hasOwnProperty('value')) {
            return (
                <div className="bg-grade-100 rounded text-black p-3">
                    <p className="mb-0"><span className={"text-label"}>{LABELS_AND_HEADINGS.DATE}:</span> {getFriendlyDateFromTimestamp(label)}</p>
                    <p className="mb-0"><span className={"text-label"}>{LABELS_AND_HEADINGS.VALUE}:</span> {payload[0].value} kr</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={PANES.VALUATION.NAME}/>
            <div className={"col-12 col-md-8 col-xxl-6"}>
                <p className={"lead"}>{PANES.VALUATION.LEAD}</p>
            </div>
            {
                totalValuationValuesForUser && !!totalValuationValuesForUser.length &&
                <p>
                    {PANES.VALUATION.COLLECTING_VALUE_1} <span
                    className={"text-grade"}>{totalValuationValuesForUser[totalValuationValuesForUser.length - 1].total_valuation_value}</span> kr.
                </p>
            }
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <div className={"mb-3"}>
                                {
                                    loadingNewValue ?
                                        <NoDataAvailable isValuation/>
                                        :
                                        <FunctionButton
                                            variant={"primary"}
                                            label={LABELS_AND_HEADINGS.VALUATION_CALCULATE}
                                            icon={valueIconDuoTone}
                                            onClick={handleDoCalculateAndAddNewValue}
                                            disabled={loadingNewValue}
                                        />
                                }
                            </div>
                            <Logger log={totalValuationValuesForUser} stringify={false}/>
                            {totalValuationValuesForUser && !!totalValuationValuesForUser.length &&
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart
                                        width={600}
                                        height={300}
                                        data={totalValuationValuesForUser}
                                        margin={{top: 10, right: 10, left: 10, bottom: 10}}
                                    >
                                        <CartesianGrid strokeDasharray="3 3"/>
                                        <XAxis interval={3} tickFormatter={(tick) => getTinyFriendlyDateFromTimestamp(tick)}
                                               dataKey="total_valuation_date"/>
                                        <YAxis/>
                                        <Tooltip content={<CustomTooltip/>}/>
                                        <Legend/>
                                        <Line
                                            name={LABELS_AND_HEADINGS.VALUE}
                                            type="monotone"
                                            dataKey="total_valuation_value"
                                            stroke="#ffd700"
                                            activeDot={{r: 8}}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}
