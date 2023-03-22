import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
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
