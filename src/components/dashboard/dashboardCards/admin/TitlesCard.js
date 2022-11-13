import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../../../helpers/constants";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../serviceFunctions";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {TitlesIcon} from "../../../icons";


export const TitlesCard = () => {

    const [limitedTitlesData, setLimitedTitlesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.TITLES, "created_at", setLimitedTitlesData, 5, false).then()
    }, [])

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"dashboard-card"}>
                <h2><span className={"me-2"}><TitlesIcon textVariant={"lg"}/></span>{LABELS_AND_HEADINGS.TITLES}</h2>
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
                <button className={"btn btn-primary me-3 mb-2"}
                        onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD) }>{LABELS_AND_HEADINGS.ADD_TITLE}
                </button>
                <Link className={"btn btn-outline-secondary mb-2"} to={ROUTES.ADMIN.TITLES}>{LABELS_AND_HEADINGS.SEE_ALL_TITLES}</Link>
            </div>
        </div>
    )
}
