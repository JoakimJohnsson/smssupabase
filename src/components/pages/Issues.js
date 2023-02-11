import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {getRowsByTable} from "../serviceFunctions";
import {IssuesList} from "../lists/issues/IssuesList";
import {HeadingWithBreadCrumbs} from "../headings";


export const Issues = () => {

    const [issuesData, setIssuesData] = useState(null);
    useEffect(() => {
        getRowsByTable("issues", setIssuesData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 row-padding--main"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_ISSUES}/>
                    {
                        issuesData ?
                            <IssuesList issuesData={issuesData} showAdminInfo={false}/>
                            :
                            <Spinner/>
                    }
                </div>
            </div>
        </main>
    )
}
