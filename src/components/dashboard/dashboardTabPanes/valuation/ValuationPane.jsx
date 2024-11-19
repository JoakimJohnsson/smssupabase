import React, {useState, useCallback, useEffect} from "react";
import {CONFIG, LOADING_STATES} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {PANES, TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {useAppContext} from "../../../../context/AppContext";
import {HeadingWithBreadCrumbs} from "../../../headings";
import * as ServiceFunctions from "../../../../services/serviceFunctions";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {
    getFriendlyDateFromTimestamp,
    getTinyFriendlyDateFromTimestamp,
    getTotalGradeValue
} from "../../../../helpers/functions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {FunctionButton} from "../../../minis/FunctionButton";
import {valueIconDuoTone} from "../../../icons";
import {getAllGradesByUserId} from "../../../../services/collectingService";


export const ValuationPane = () => {

    const {user, setInformationMessage} = useAppContext();
    const [loadingState, setLoadingState] = useState(LOADING_STATES.NONE);
    const [totalValuationValuesForUser, setTotalValuationValuesForUser] = useState(null);
    const [grades, setGrades] = useState(null);

    const fetchTotalValuationValuesForUser = useCallback(async () => {
        setLoadingState(LOADING_STATES.GENERAL);
        await ServiceFunctions.getTotalValuationValuesForUser(user.id).then((result) => {
            setTotalValuationValuesForUser(result);
            setTimeout(() => {
                setLoadingState(LOADING_STATES.NONE);
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
        setLoadingState(LOADING_STATES.NEW_VALUE);
        if (grades && grades.length > 0) {
            const newTotalValuationValue = await getTotalGradeValue(grades);
            if (totalValuationValuesForUser && totalValuationValuesForUser.length > 0) {
                // Delete oldest value if too many values
                if (totalValuationValuesForUser.length >= CONFIG.MAX_VALUATION_VALUES) {
                    await deleteValue(totalValuationValuesForUser);
                }
                // Only update if it differs from latest value
                if (newTotalValuationValue !== totalValuationValuesForUser[totalValuationValuesForUser.length - 1].total_valuation_value) {
                    // Add the new value
                    await ServiceFunctions.addTotalValuationValueForUser(user.id, newTotalValuationValue);
                } else {
                    // No need to save new value
                    setInformationMessage({show: true, status: 2, error: TEXTS.VALUATION_CALCULATE_MESSAGE_1});
                }
            } else {
                // Add the new value
                await ServiceFunctions.addTotalValuationValueForUser(user.id, newTotalValuationValue);
            }
            await fetchTotalValuationValuesForUser();
            setLoadingState(LOADING_STATES.NONE);
        } else {
            // No grades found
            // No need to save new value
            setLoadingState(LOADING_STATES.NONE);
            setInformationMessage({show: true, status: 1, error: TEXTS.VALUATION_CALCULATE_MESSAGE_3});
        }
    };

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length && Object.prototype.hasOwnProperty.call(payload[0], 'value')) {
            return (
                <div className="bg-grade-100 rounded text-black p-3">
                    <p className="mb-0"><span
                        className="text-label">{LABELS.COMMON.DATE}:</span> {getFriendlyDateFromTimestamp(label)}</p>
                    <p className="mb-0"><span
                        className="text-label">{LABELS.COMMON.VALUE}:</span> {payload[0].value} kr</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="col-12">
            <div className="row row-padding--main">
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
                    loadingState === LOADING_STATES.GENERAL ?
                        <OverlaySpinner/>
                        :
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={"mb-3"}>
                                    {
                                        loadingState === LOADING_STATES.NEW_VALUE ?
                                            <NoDataAvailable isValuation/>
                                            :
                                            <FunctionButton
                                                variant={"btn-outline-primary"}
                                                label={LABELS.COMMON.VALUATION_CALCULATE}
                                                icon={valueIconDuoTone}
                                                onClick={handleDoCalculateAndAddNewValue}
                                                disabled={loadingState === LOADING_STATES.NEW_VALUE}
                                            />
                                    }
                                </div>
                                {totalValuationValuesForUser && !!totalValuationValuesForUser.length &&
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart
                                            width={600}
                                            height={300}
                                            data={totalValuationValuesForUser}
                                            margin={{top: 10, right: 10, left: 10, bottom: 10}}
                                        >
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <XAxis interval={3}
                                                   tickFormatter={(tick) => getTinyFriendlyDateFromTimestamp(tick)}
                                                   dataKey="total_valuation_date"/>
                                            <YAxis/>
                                            <Tooltip content={<CustomTooltip/>}/>
                                            <Legend/>
                                            <Line
                                                name={LABELS.COMMON.VALUE}
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
        </div>
    )
}
