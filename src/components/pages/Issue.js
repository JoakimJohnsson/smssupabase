import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useParams} from "react-router-dom";
import {getRowByTableAndId} from "../serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
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
            if (issue.title_id) {
                getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => setLoading(false))
            }
        });
    }, [issue.title_id, id])

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
                            <div className={"col-12 col-md-4 col-xl-3 mb-5"}>
                                <ImageViewer url={issue.image_url} fileName={issue.image_filename}/>
                            </div>
                            <div className={"col-12 col-md-8 col-xl-6"}>
                                <h2>{LABELS_AND_HEADINGS.INFORMATION_ABOUT} {getIssueName(title, issue)}</h2>
                                <p>{LABELS_AND_HEADINGS.PUBLISHERS}: </p>
                                {
                                    issue.is_marvelklubben === 1 &&
                                    <p>{LABELS_AND_HEADINGS.MARVELKLUBBEN_NUMBER}: {issue.marvelklubben_number}</p>
                                }
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
