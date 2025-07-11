import React, {useEffect, useState} from "react";
import {getCountByTable} from "../../../../services/serviceFunctions";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {PANES} from "../../../../helpers/constants/textConstants/texts";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {titlesIconDuoTone} from "../../../icons/Icons.jsx";
import {IconLinkCtaLg} from "../../../minis/IconLinkCtaLg";
import {PageSectionLight} from "../../../pages/pagecomponents/PageSectionLight.jsx";


export const OverviewTitlesSection = ({titlesData}) => {

    const [totalTitles, setTotalTitles] = useState(0);

    useEffect(() => {
        getCountByTable(TABLES.TITLES, setTotalTitles).then();
    }, []);

    return titlesData ?
        <PageSectionLight>
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
        </PageSectionLight>
        :
        <CustomSpinner className={"mb-3 d-block"}/>
}
