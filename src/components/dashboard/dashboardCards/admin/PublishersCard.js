import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../../../helpers/constants";
import {Link, useNavigate} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {PlusButton} from "../../../minis/PlusButton";


export const PublishersCard = () => {

    const [limitedPublishersData, setLimitedPublishersData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.PUBLISHERS, "created_at", setLimitedPublishersData, 5, false).then()
    }, [])

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"dashboard-card"}>
                <h2>{LABELS_AND_HEADINGS.PUBLISHERS}</h2>
                {
                    limitedPublishersData ?
                        <>
                            <p>
                                {TEXTS.SHOWING_LATEST_PUBLISHERS}
                            </p>
                            <PublishersList publishersData={limitedPublishersData} setPublishersData={setLimitedPublishersData} showAdminInfo={true}/>
                        </>
                        :
                        <NoDataAvailable />
                }
                <PlusButton onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)} label={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                <Link className={"btn btn-outline-primary"} to={ROUTES.ADMIN.PUBLISHERS}>{LABELS_AND_HEADINGS.SEE_ALL_PUBLISHERS}</Link>
            </div>
        </div>
    )
}
