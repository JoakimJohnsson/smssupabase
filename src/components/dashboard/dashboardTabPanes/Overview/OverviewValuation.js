import React, {useState, useEffect, useCallback} from "react";
import {CONFIG, LABELS_AND_HEADINGS, ROUTES} from "../../../../helpers/constants/configConstants";
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
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.VALUATION}</h2>
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
                <IconLinkCtaLg
                    variant={"grade"}
                    icon={valueIconDuoTone}
                    path={ROUTES.DASHBOARD.PATH_VALUATION}
                    label={PANES.VALUATION.NAME}
                />
            </div>
        </div>
    )
}
