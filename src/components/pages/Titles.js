import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {TitlesList} from "../lists/titles/TitlesList";
import {getRowsByTable} from "../serviceFunctions";


export const Titles = () => {

    const [titlesData, setTitlesData] = useState(null);
    useEffect(() => {
        getRowsByTable("titles", setTitlesData).then()
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-row-padding"}>
                    <h1>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                    {
                        titlesData ?
                            <TitlesList titlesData={titlesData} showAdminInfo={false}/>
                            :
                            <Spinner/>
                    }
                </div>
            </div>
        </main>
    )
}
