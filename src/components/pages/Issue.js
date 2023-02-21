import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useParams} from "react-router-dom";
import {getRowByTableAndId} from "../serviceFunctions";
import {TABLES} from "../../helpers/constants";
import {Spinner} from "../minis/Spinner";
import {getIssueName} from "../../helpers/functions";


export const Issue = () => {

    const [issue, setIssue] = useState({});
    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchIssueAndTitleData = useCallback(() => {
        getRowByTableAndId(TABLES.ISSUES, setIssue, id).then(() => {
            getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => setLoading(false))
        });
    }, [issue, id])

    useEffect(() => {
        fetchIssueAndTitleData();
    }, [fetchIssueAndTitleData])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <Spinner size={"4x"}/>
                        :
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={getIssueName(title, issue)} doIgnoreName={true} bcName={getIssueName(title, issue)}/>
                </div>
                }
            </div>
        </main>
    )
}
