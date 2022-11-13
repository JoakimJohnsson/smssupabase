import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../serviceFunctions";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {AdminH1} from "../../../headings";
import {PlusButton} from "../../../minis/PlusButton";
import {useNavigate} from "react-router-dom";


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
                    <AdminH1 text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                    {publishersData && <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}/>}
                    <PlusButton onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)} customClass={"me-3 mb-2"} label={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                </div>
            </div>
        </main>
    )
}
