import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useParams} from "react-router-dom";
import {
    getRowByTableAndId,
    getRowsByTableForeignKeyColumnAndForeignKeyId,
    handleCollectingTitle
} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../helpers/constants";
import {IssuesList} from "../lists/issues/IssuesList";
import {Icon} from "../icons";
import {faArrowUpRightFromSquare, faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {getCalculatedYear, getDataName} from "../../helpers/functions/functions";
import formatData from "../../helpers/valueLists/formats.json";
import {ImageViewer} from "./pagecomponents/ImageViewer";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useAppContext} from "../../context/AppContext";
import {useIsCollectingTitle} from "../../helpers/customHooks/useIsCollectingTitle";


export const Title = () => {

    const {setInformationMessage, user} = useAppContext();
    const [title, setTitle] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [isCollectingTitle, setIsCollectingTitle] = useIsCollectingTitle(user.id, id);
    const displayName = title.name + " " + title.start_year;
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;

    const fetchTitleAndIssuesData = useCallback(() => {
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
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}/>
                            </div>
                            <div className={"col-12 col-lg-5 col-xl-3 mb-5"}>
                                <ImageViewer url={title.image_url} fileName={title.image_filename}/>
                                <button
                                    aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                                    className={`btn ${isCollectingTitle ? "btn-success" : "btn-danger"} p-2 rounded-0 w-100 justify-content-center mb-4`}
                                    onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle)}>
                                    {
                                        isCollectingTitle ?
                                            <><Icon icon={faMinus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.DELETE}</>
                                            :
                                            <><Icon icon={faPlus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.ADD}</>
                                    }
                                </button>
                                {
                                    title.description &&
                                    <>
                                        <p>{title.description}</p>
                                        <p>Formatet är {getDataName(formatData, title.format_id)}.</p>
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
