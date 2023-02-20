import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useParams} from "react-router-dom";
import {getRowByTableAndId, getRowsByTableForeignKeyColumnAndForeignKeyId} from "../serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {IssuesList} from "../lists/issues/IssuesList";
import {Icon} from "../icons";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {getCalculatedYear, getFormatName} from "../../helpers/functions";
import formatData from "../../helpers/valueLists/formats.json";
import {Spinner} from "../minis/Spinner";


export const Title = () => {

    const [title, setTitle] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchTitleAndIssuesData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            getRowsByTableForeignKeyColumnAndForeignKeyId(TABLES.ISSUES, "title_id", id, setIssuesData).then(() => setLoading(false));
        });
    }, [id]);

    useEffect(() => {
        fetchTitleAndIssuesData();
    }, [fetchTitleAndIssuesData])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <Spinner size={"4x"}/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}/>
                            </div>
                            <div className={"col-12 col-lg-5 col-xl-3"}>
                                {
                                    title.image_url && title.image_filename &&
                                    <img
                                        src={title.image_url}
                                        alt={title.image_filename}
                                        className="w-100 mb-3 bg-light"
                                    />
                                }
                                <p>{title.description}</p>
                                <p>
                                    <a href={title.wiki_url} target={"_blank"} rel={"noreferrer"}>
                                        Seriewikin för {title.name}
                                        <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                    </a>
                                </p>
                                <p>Formatet är {getFormatName(formatData, title.format_id)}.</p>
                                <p>Totalt gavs det ut {title.total_issues} publikationer.</p>
                            </div>
                            <div className={"col-12 col-lg-7 col-xl-6 sms-form"}>
                                <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                                <IssuesList issuesData={issuesData} showAdminInfo={false} isIssue/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
