import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {IconButton} from "../../../minis/IconButton";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking} from "../../../../helpers/functions/functions";
import {faArrowLeft, faPlus} from "@fortawesome/pro-regular-svg-icons";


export const AdminPublishers = () => {

    const [publishersData, setPublishersData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 row-padding--main"}>
                    <div className={"sms-dashboard-col"}>
                        <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_PUBLISHERS}</h1>
                        <Breadcrumbs/>
                        <div className={"sms-section--light"}>
                            {publishersData &&
                                <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}/>}
                            <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)}
                                        label={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                        label={LABELS_AND_HEADINGS.BACK}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
