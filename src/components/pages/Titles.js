import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../miniComponents/Spinner";
import {TitlesList} from "../listComponents/titles/TitlesList";
import {getRowsByTable} from "../serviceFunctions";


export const Titles = () => {

    const [titlesData, setTitlesData] = useState(null);
    useEffect(() => {
        getRowsByTable("titles", setTitlesData).then(r => console.info('Got titles'))
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
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
