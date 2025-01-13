import React, {useEffect, useState} from "react";
import {getCountByTable} from "../../../../services/serviceFunctions";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {titlesIconDuoTone} from "../../../icons";
import {IconLinkCtaLg} from "../../../minis/IconLinkCtaLg";


export const OverviewTitles = ({titlesData}) => {

    const [totalTitles, setTotalTitles] = useState(0);

    useEffect(() => {
        getCountByTable(TABLES.TITLES, setTotalTitles).then();
    }, []);

    return titlesData ?

        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.TITLES.TITLES}</h2>
                <IconLinkCtaLg
                    variant={"primary"}
                    icon={titlesIconDuoTone}
                    path={ROUTES.DASHBOARD.PATH_MY_TITLES}
                    label={PANES.TITLES.NAME}
                />
                <p className={"mb-3"}>
                    {PANES.OVERVIEW.COLLECTING_TITLES_1} {titlesData.length} {PANES.OVERVIEW.COLLECTING_TITLES_2} {totalTitles} {PANES.OVERVIEW.COLLECTING_TITLES_3}
                </p>
            </div>
        </div>
        :
        <CustomSpinner className={"mb-3 d-block"}/>
}
