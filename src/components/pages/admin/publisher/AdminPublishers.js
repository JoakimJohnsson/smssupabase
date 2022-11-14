import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../serviceFunctions";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {PlusButton} from "../../../minis/PlusButton";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking} from "../../../../helpers/functions";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";


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
                        <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_PUBLISHERS}</h1>
                        <Breadcrumbs/>
                        {publishersData &&
                            <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}/>}
                        <PlusButton onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)} label={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                        <ArrowLeftButton onClick={() => handleBacking(navigate)} label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
