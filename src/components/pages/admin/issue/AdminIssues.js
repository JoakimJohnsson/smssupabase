import React, {useEffect, useState} from "react";
import {Spinner} from "../../../minis/Spinner";
import {LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../serviceFunctions";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking} from "../../../../helpers/functions";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";
import {IssuesList} from "../../../lists/issues/IssuesList";


export const AdminIssues = () => {

    const [issuesData, setIssuesData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        getRowsByTable(TABLES.ISSUES, setIssuesData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <div className={"sms-dashboard-col"}>
                        <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                        <Breadcrumbs/>
                        {issuesData ? <IssuesList issuesData={issuesData} setIssuesData={setIssuesData} showAdminInfo={true}/> : <Spinner/>}
                        <ArrowLeftButton onClick={() => handleBacking(navigate)} label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
