import React, {useEffect, useState} from "react";
import {Spinner} from "../../Spinner";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import {getRowsByTable} from "../../serviceFunctions";
import {PublishersList} from "../../listComponents/publishers/PublishersList";


export const AdminPublishers = () => {

    const [publishersData, setPublishersData] = useState(null);
    useEffect(() => {
        getRowsByTable("publishers", setPublishersData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{LABELS_AND_HEADINGS.ALL_TITLES}</span></h1>
                    <BackButton customClass={"mb-5"}/>
                    {publishersData ?
                        <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}/>
                        :
                        <Spinner/>}
                </div>
            </div>
        </main>
    )
}
