import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {TitlesListWithCards} from "../lists/titles/TitlesListWithCards";


export const Titles = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);

    useEffect(() => {
        getRowsByTable("titles", setTitlesData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <TitlesListWithCards titlesData={titlesData}/>
                    }
                </div>
            </div>
        </main>
    )
}
