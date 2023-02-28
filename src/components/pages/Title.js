import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useParams} from "react-router-dom";
import {getRowByTableAndId, getRowsByTableForeignKeyColumnAndForeignKeyId} from "../serviceFunctions";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../helpers/constants";
import {IssuesList} from "../lists/issues/IssuesList";
import {Icon} from "../icons";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {getCalculatedYear, getFormatName} from "../../helpers/functions";
import formatData from "../../helpers/valueLists/formats.json";
import {CustomSpinner} from "../minis/CustomSpinner";
import {ImageViewer} from "./pagecomponents/ImageViewer";


export const Title = () => {

    const [title, setTitle] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchTitleAndIssuesData = useCallback(() => {
        console.log("asdffdfdsa");
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            if (title.publisher_id) {
                getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, title.publisher_id).then(() => {
                    getRowsByTableForeignKeyColumnAndForeignKeyId(TABLES.ISSUES, "title_id", id, setIssuesData).then(() => setLoading(false));
                })
            }
        });
    }, [id, title.publisher_id]);

    useEffect(() => {
        fetchTitleAndIssuesData();
    }, [fetchTitleAndIssuesData])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <CustomSpinner size={"4x"}/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}/>
                            </div>
                            <div className={"col-12 col-lg-5 col-xl-3 mb-5"}>
                                <ImageViewer url={title.image_url} fileName={title.image_filename}/>
                                {
                                    title.description &&
                                    <>
                                        <p>{title.description}</p>
                                        <p>Formatet är {getFormatName(formatData, title.format_id)}.</p>
                                        <p>Totalt gavs det ut {title.total_issues} publikationer.</p>
                                    </>
                                }
                                {
                                    title.wiki_url &&
                                    <p>
                                        <a href={title.wiki_url} target={"_blank"} rel={"noreferrer"}>
                                            {LABELS_AND_HEADINGS.SERIEWIKIN_FOR} {title.name}
                                            <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                        </a>
                                    </p>
                                }
                                {
                                    publisher &&
                                    <p>
                                        <Link to={ROUTES.PUBLISHERS + "/" + publisher.id} className={""} title={publisher.name}>
                                            {publisher.name}
                                        </Link>
                                    </p>
                                }
                            </div>
                            <div className={"col-12 col-lg-7 col-xl-6"}>
                                <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                                <IssuesList issuesData={issuesData} showAdminInfo={false} isIssue/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
