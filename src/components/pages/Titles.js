import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {getRowsByTable} from "../serviceFunctions";
import {Spinner} from "../Spinner";
import {TitlesList} from "../listComponents/titles/TitlesList";


export const Titles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRowsByTable(setLoading, "titles", setTitlesData).then(r => console.info('Got titles'))
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                    {loading ? <Spinner/> : <TitlesList titlesData={titlesData} showUserToolBox={true}/>}
                </div>
            </div>
        </main>
    )
}
