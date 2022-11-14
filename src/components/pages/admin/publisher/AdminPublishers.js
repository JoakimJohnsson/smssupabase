import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../serviceFunctions";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {PlusButton} from "../../../minis/PlusButton";
import {useNavigate} from "react-router-dom";
import {PublishersIcon} from "../../../icons";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";


export const AdminPublishers = () => {

    const [publishersData, setPublishersData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <div className={"sms-dashboard-col"}>
                        <h1 className={"text-icon-header"}><PublishersIcon textVariant={"xl"}/><span>{LABELS_AND_HEADINGS.ALL_PUBLISHERS}</span></h1>
                        <Breadcrumbs/>
                        {publishersData &&
                            <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}/>}
                        <PlusButton onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)} label={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
