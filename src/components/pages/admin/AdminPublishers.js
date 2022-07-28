import React, {useEffect, useState} from "react";
import {Spinner} from "../../Spinner";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {TitlesList} from "../../listComponents/titles/TitlesList";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import {getRowsByTable} from "../../serviceFunctions";


export const AdminPublishers = () => {

    const [titlesData, setTitlesData] = useState(null);
    useEffect(() => {
        getRowsByTable("titles", setTitlesData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{LABELS_AND_HEADINGS.ALL_TITLES}</span></h1>
                    <BackButton customClass={"mb-5"}/>
                    {titlesData ? <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={true}/> : <Spinner/>}
                </div>
            </div>
        </main>
    )
}
