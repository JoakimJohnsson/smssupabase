import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../../../helpers/constants";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../../services/serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {IconButton} from "../../../minis/IconButton";
import {faPlus} from "@fortawesome/pro-regular-svg-icons";
import {LABELS} from "../../../../helpers/textConstants/labelsAndHeadings";


export const PublishersSection = () => {

    const [limitedPublishersData, setLimitedPublishersData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.PUBLISHERS, "created_at", setLimitedPublishersData, 5, false).then()
    }, [])

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.PUBLISHERS}</h2>
                {
                    limitedPublishersData ?
                        <>
                            <p>{TEXTS.SHOWING_LATEST_PUBLISHERS}</p>
                            <PublishersList publishersData={limitedPublishersData} setPublishersData={setLimitedPublishersData} showAdminInfo={true}/>
                        </>
                        :
                        <NoDataAvailable/>
                }
                <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)}
                            label={LABELS.SECTIONS.PUBLISHERS.ADD_PUBLISHER}/>
                <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.ADMIN.PUBLISHERS}>{LABELS_AND_HEADINGS.SEE_ALL_PUBLISHERS}</Link>
            </div>
        </div>
    )
}
