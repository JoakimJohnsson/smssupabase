import React, {useState, useEffect, useCallback} from "react";
import {CONFIG, ROUTES} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import * as ServiceFunctions from "../../../../services/serviceFunctions";
import {useAppContext} from "../../../../context/AppContext";
import {OverviewIssuesValueComparison} from "./OverviewIssuesValueComparison";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {IconLinkCtaLg} from "../../../minis/IconLinkCtaLg";
import {valueIconDuoTone} from "../../../icons";


export const OverviewValuation = () => {

    const [loading, setLoading] = useState(false);
    const [totalValuationValuesForUser, setTotalValuationValuesForUser] = useState(null);
    const {user} = useAppContext();

    const fetchTotalValuationValuesForUser = useCallback(async () => {
        setLoading(true);
        await ServiceFunctions.getTotalValuationValuesForUser(user.id).then((result) => {
            setTotalValuationValuesForUser(result);
            setTimeout(() => {
                setLoading(false);
            }, CONFIG.TIMEOUT_LG);
        })
    }, [user.id])

    useEffect(() => {
        fetchTotalValuationValuesForUser().then();
    }, [fetchTotalValuationValuesForUser]);

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.COMMON.VALUATION}</h2>
                <IconLinkCtaLg
                    variant={"grade"}
                    icon={valueIconDuoTone}
                    path={ROUTES.DASHBOARD.PATH_VALUATION}
                    label={PANES.VALUATION.NAME}
                />
                <div className={"mb-3"}>
                    {
                        (totalValuationValuesForUser == null || totalValuationValuesForUser.length <= 0) &&
                        <p>{PANES.OVERVIEW.COLLECTING_VALUE_7}</p>
                    }
                    {
                        loading ?
                            <CustomSpinner className={"mb-3"} size={"2x"}/>
                            :
                            totalValuationValuesForUser && totalValuationValuesForUser.length > 1 ?
                                <OverviewIssuesValueComparison
                                    oldValue={totalValuationValuesForUser[totalValuationValuesForUser.length - 2].total_valuation_value}
                                    timeStamp={totalValuationValuesForUser[totalValuationValuesForUser.length - 2].total_valuation_date}
                                    newValue={totalValuationValuesForUser[totalValuationValuesForUser.length - 1].total_valuation_value}
                                />
                                :
                                <>
                                    {
                                        totalValuationValuesForUser && !!totalValuationValuesForUser.length &&
                                        <p>
                                            {PANES.VALUATION.COLLECTING_VALUE_1} <span
                                            className={"text-grade"}>{totalValuationValuesForUser[totalValuationValuesForUser.length - 1].total_valuation_value}</span> kr.
                                        </p>
                                    }
                                </>
                    }
                </div>
            </div>
        </div>
    )
}
