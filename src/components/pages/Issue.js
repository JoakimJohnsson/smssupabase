import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useParams} from "react-router-dom";
import {getRowByTableAndId} from "../serviceFunctions";
import {TABLES} from "../../helpers/constants";
import {CustomSpinner} from "../minis/CustomSpinner";
import {getIssueName} from "../../helpers/functions";
import {ImageViewer} from "./pagecomponents/ImageViewer";


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
                        <CustomSpinner size={"4x"}/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={getIssueName(title, issue)} doIgnoreName={true} bcName={getIssueName(title, issue)}/>
                            </div>
                            <div className={"col-12 col-lg-5 col-xl-3"}>
                                <ImageViewer url={issue.image_url} fileName={issue.image_filename}/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
