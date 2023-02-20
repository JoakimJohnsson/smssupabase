import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {getRowsByTable} from "../serviceFunctions";
import {IssuesList} from "../lists/issues/IssuesList";
import {HeadingWithBreadCrumbs} from "../headings";


export const Issues = () => {

    const [loading, setLoading] = useState(true);
    const [issuesData, setIssuesData] = useState(null);
    useEffect(() => {
        getRowsByTable("issues", setIssuesData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                    {
                        loading ?
                            <Spinner size={"4x"}/>
                            :
                            <IssuesList issuesData={issuesData} showAdminInfo={false}/>
                    }
                </div>
            </div>
        </main>
    )
}
