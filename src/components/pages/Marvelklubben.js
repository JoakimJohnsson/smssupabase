import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {TitlesListWithCards} from "../lists/titles/TitlesListWithCards";


export const Marvelklubben = () => {

    const [loading, setLoading] = useState(true);
    const [marvelKlubbenData, setMarvelKlubbenData] = useState(null);

    useEffect(() => {
        // TODO GET DATA!
        setLoading(false);
        setMarvelKlubbenData(null);
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col--full"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.MARVELKLUBBEN}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <TitlesListWithCards titlesData={marvelKlubbenData}/>
                    }
                </div>
            </div>
        </main>
    )
}
