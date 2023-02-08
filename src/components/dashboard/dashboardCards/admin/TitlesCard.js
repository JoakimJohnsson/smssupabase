import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../../../helpers/constants";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../serviceFunctions";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {IconButton} from "../../../minis/IconButton";
import {faPlus} from "@fortawesome/pro-regular-svg-icons";


export const TitlesCard = () => {

    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.TITLES, "created_at", setLimitedTitlesData, 5, false).then()
    }, [])

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"dashboard-card"}>
                <h2>{LABELS_AND_HEADINGS.TITLES}</h2>
                {
                    limitedTitlesData ?
                        <>
                            <p>
                                {TEXTS.SHOWING_LATEST_TITLES}
                            </p>
                            <TitlesList titlesData={limitedTitlesData} setTitlesData={setLimitedTitlesData} showAdminInfo={true}/>
                        </>
                        :
                        <NoDataAvailable />
                }
                <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD)} label={LABELS_AND_HEADINGS.ADD_TITLE}/>
                <Link className={"btn btn-outline-primary"} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.SEE_ALL_TITLES}</Link>
            </div>
        </div>
    )
}
