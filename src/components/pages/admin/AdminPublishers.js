import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import {BackButton} from "../../miniComponents/BackButton";
import {getRowsByTable} from "../../serviceFunctions";
import {PublishersList} from "../../listComponents/publishers/PublishersList";
import {AdminIcon} from "../../icons";


export const AdminPublishers = () => {

    const [publishersData, setPublishersData] = useState(null);
    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><AdminIcon textVariant={"xl"}/><span>{LABELS_AND_HEADINGS.ALL_TITLES}</span></h1>
                    <BackButton customClass={"mb-5"}/>
                    {publishersData && <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}/>}
                </div>
            </div>
        </main>
    )
}
