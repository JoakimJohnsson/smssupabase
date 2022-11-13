import React, {useEffect, useState} from "react";
import {Spinner} from "../../../minis/Spinner";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {getRowsByTable} from "../../../serviceFunctions";
import {AdminH1} from "../../../headings";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    useEffect(() => {
        getRowsByTable("titles", setTitlesData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                    {titlesData ? <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={true}/> : <Spinner/>}
                </div>
            </div>
        </main>
    )
}
