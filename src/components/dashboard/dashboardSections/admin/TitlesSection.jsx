import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TEXTS} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../../services/serviceFunctions";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {IconButton} from "../../../minis/IconButton";
import {faPlus} from "@fortawesome/pro-regular-svg-icons";


export const TitlesSection = () => {

    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.TITLES, "created_at", setLimitedTitlesData, 5, false).then()
    }, [])

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.TITLES.TITLES}</h2>
                {
                    limitedTitlesData ?
                        <>
                            <p>{TEXTS.SHOWING_LATEST_TITLES}</p>
                            <ol>
                                <li>{TEXTS.SHOWING_LATEST_TITLES_STEP_1}</li>
                                <li>{TEXTS.SHOWING_LATEST_TITLES_STEP_2}</li>
                                <li>{TEXTS.SHOWING_LATEST_TITLES_STEP_3}</li>
                                <li>{TEXTS.SHOWING_LATEST_TITLES_STEP_4}</li>
                            </ol>
                            <TitlesList titlesData={limitedTitlesData} setTitlesData={setLimitedTitlesData} doSortByName={false} showAdminInfo={true} showToolbox/>
                        </>
                        :
                        <NoDataAvailable />
                }
                <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD)} label={LABELS.SECTIONS.TITLES.ADD_TITLE}/>
                <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.SEE_ALL_TITLES}</Link>
            </div>
        </div>
    )
}
