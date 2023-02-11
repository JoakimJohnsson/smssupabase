import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {TitlesList} from "../lists/titles/TitlesList";
import {getRowsByTable} from "../serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";


export const Titles = () => {

    const [titlesData, setTitlesData] = useState(null);

    useEffect(() => {
        const {data} = getRowsByTable("titles", setTitlesData).then(() => setTitlesData(data));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 row-padding--main"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_TITLES}/>
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
