import React, {useEffect, useState} from "react";
import {getCountByTable} from "../../../../services/serviceFunctions";
import {LABELS_AND_HEADINGS, PANES, TABLES} from "../../../../helpers/constants";
import {CustomSpinner} from "../../../minis/CustomSpinner";


export const OverviewTitles = ({titlesData}) => {

    const [totalTitles, setTotalTitles] = useState(0);

    useEffect(() => {
        getCountByTable(TABLES.TITLES, setTotalTitles).then();
    }, []);

    return titlesData ?

        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.TITLES}</h2>
                <p>
                    {PANES.OVERVIEW.COLLECTING_TITLES_1} {titlesData.length} {PANES.OVERVIEW.COLLECTING_TITLES_2} {totalTitles} {PANES.OVERVIEW.COLLECTING_TITLES_3}
                </p>
            </div>
        </div>
        :
        <CustomSpinner className={"mb-3 d-block"}/>
}
