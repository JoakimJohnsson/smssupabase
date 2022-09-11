import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import {getRowsByTable} from "../../serviceFunctions";
import {PublishersList} from "../../listComponents/publishers/PublishersList";
import {AdminH1} from "../../headings";


export const AdminPublishers = () => {

    const [publishersData, setPublishersData] = useState(null);
    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                    {publishersData && <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}/>}
                </div>
            </div>
        </main>
    )
}
