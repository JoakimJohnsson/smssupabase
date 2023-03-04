import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {TitlesList} from "../lists/titles/TitlesList";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";


export const Titles = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);

    useEffect(() => {
        getRowsByTable("titles", setTitlesData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col--full"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <div className={"sms-section--light"}>
                                <TitlesList titlesData={titlesData} showAdminInfo={false}/>
                            </div>
                    }
                </div>
            </div>
        </main>
    )
}
