import React, {useEffect, useState} from "react";
import {getRowsByTable} from "../../serviceFunctions";
import {Spinner} from "../../Spinner";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {TitlesList} from "../../listComponents/titles/TitlesList";
import {BanIcon} from "@heroicons/react/solid";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRowsByTable(setLoading, "titles", setTitlesData).then(r => console.info('Got titles'))
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{LABELS_AND_HEADINGS.ALL_TITLES}</span></h1>
                    {loading ? <Spinner/> : <TitlesList titlesData={titlesData} showAdminInfo={true}/>}
                </div>
            </div>
        </main>
    )
}
