import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {getAllMarvelklubbenIssues} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {IssuesListWithCards} from "../lists/issues/IssuesListWithCards";


export const Marvelklubben = () => {

    const [loading, setLoading] = useState(true);
    const [marvelKlubbenData, setMarvelKlubbenData] = useState(null);

    useEffect(() => {
        getAllMarvelklubbenIssues(setMarvelKlubbenData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.MARVELKLUBBEN}/>
                    <p className={"lead"}>{TEXTS.MARVELKLUBBEN_LEAD}</p>
                    <p>{TEXTS.MARVELKLUBBEN_TEXT_1}</p>
                    <p>{TEXTS.MARVELKLUBBEN_TEXT_2} <a href="https://sv.wikipedia.org/wiki/Marvelklubben" rel="noreferrer" target={"_blank"}>Wikipedia</a>.</p>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-page-col"}>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <IssuesListWithCards issuesData={marvelKlubbenData}/>
                    }
                </div>
            </div>
        </main>
    )
}
