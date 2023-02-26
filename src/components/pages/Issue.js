import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useParams} from "react-router-dom";
import {getRowByTableAndId} from "../serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {CustomSpinner} from "../minis/CustomSpinner";
import {getIssueName} from "../../helpers/functions";
import {ImageViewer} from "./pagecomponents/ImageViewer";


export const Issue = () => {

    const [issue, setIssue] = useState({});
    const [title, setTitle] = useState({});
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchData = useCallback(() => {
        getRowByTableAndId(TABLES.ISSUES, setIssue, id).then(() => {
            if (issue.title_id) {
                getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => {
                    if (title.publisher_id) {
                        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, title.publisher_id).then(() => setLoading(false))
                    }
                });
            }
        });
    }, [id, issue.title_id, title.publisher_id]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

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
                                <div className={"row"}>
                                    <div className={"col-12 col-md-6 mb-5 mb-md-0"}>
                                        <Link to={`/publishers/${publisher.id}`} title={publisher.name}>
                                            <ImageViewer url={publisher.image_url} fileName={publisher.image_filename}/>
                                        </Link>
                                    </div>
                                    <div className={"col-12 col-md-6 mb-5 mb-md-0"}>
                                        <Link to={`/titles/${title.id}`} title={title.name}>
                                            <ImageViewer url={title.image_url} fileName={title.image_filename}/>
                                        </Link>
                                    </div>
                                </div>
                                <h2>{LABELS_AND_HEADINGS.INFORMATION}</h2>
                                <p>{title.description}</p>
                                <p>{publisher.description}</p>
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
