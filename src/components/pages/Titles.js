import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {TitlesList} from "../lists/titles/TitlesList";
import {getRowsByTable} from "../serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";


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
                            <Spinner size={"4x"}/>
                            :
                            <TitlesList titlesData={titlesData} showAdminInfo={false}/>
                    }
                </div>
            </div>
        </main>
    )
}
