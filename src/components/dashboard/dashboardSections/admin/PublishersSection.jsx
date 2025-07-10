import React, {useEffect, useState} from "react";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../../services/serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {IconButton} from "../../../minis/IconButton";
import {faPlus} from "@fortawesome/pro-regular-svg-icons";
import {DashboardSectionLight} from "../../../pages/pagecomponents/DashboardSectionLight.jsx";


export const PublishersSection = () => {

    const [limitedPublishersData, setLimitedPublishersData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.PUBLISHERS, "created_at", setLimitedPublishersData, 5, false).then()
    }, [])

    return (
        <DashboardSectionLight>
            <h2>{LABELS.SECTIONS.PUBLISHERS.PUBLISHERS}</h2>
            {
                limitedPublishersData ?
                    <>
                        <p>{TEXTS.SHOWING_LATEST_PUBLISHERS}</p>
                        <PublishersList publishersData={limitedPublishersData}
                                        setPublishersData={setLimitedPublishersData} showAdminInfo={true}/>
                    </>
                    :
                    <NoDataAvailable/>
            }
            <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)}
                        label={LABELS.SECTIONS.PUBLISHERS.ADD_PUBLISHER}/>
            <Link className={"btn btn-outline-primary sms-btn"}
                  to={ROUTES.ADMIN.PUBLISHERS}>{LABELS.COMMON.SEE_ALL_PUBLISHERS}</Link>
        </DashboardSectionLight>
    )
}
