import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useParams} from "react-router-dom";
import {
    getRowByTableAndId,
    handleCollectingTitle
} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../helpers/constants";
import {IssuesList} from "../lists/issues/IssuesList";
import {Icon} from "../icons";
import {faArrowUpRightFromSquare, faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {getCalculatedYear} from "../../helpers/functions/functions";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useAppContext} from "../../context/AppContext";
import {useIsCollectingTitle} from "../../helpers/customHooks/useIsCollectingTitle";
import {getIssuesWithTitleAndPublisherByTitleId} from "../../helpers/functions/serviceFunctions/issueFunctions";


export const Title = () => {

    const {setInformationMessage, user} = useAppContext();
    const [title, setTitle] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const [isCollectingTitle, setIsCollectingTitle] = useIsCollectingTitle(user.id, id);
    const displayName = title.name + " " + title.start_year;
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;

    const fetchTitleAndIssuesData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            getIssuesWithTitleAndPublisherByTitleId(setIssuesData, id).then(() => setLoading(false));
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
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}/>
                            </div>
                            <div className={"col-12 col-lg-5 col-xl-3 mb-5"}>
                                <ImageViewerLogo url={title.image_url} fileName={title.image_filename}/>
                                <button
                                    aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                                    className={`btn ${isCollectingTitle ? "btn-danger" : "btn-success"} p-2 rounded-0 w-100 flex-column justify-content-center mb-4`}
                                    onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle)}>
                                    {
                                        isCollectingTitle ?
                                            <><Icon icon={faMinus} size={"1x"}
                                                    className={"mb-1"}/>{LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + title.name}</>
                                            :
                                            <><Icon icon={faPlus} size={"1x"}
                                                    className={"mb-1"}/>{LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + title.name}</>
                                    }
                                </button>
                                {
                                    title.description &&
                                    <>
                                        <p>{title.description}</p>
                                        <p>
                                            <span className={"me-2"}>{TEXTS.TOTAL_PUBLISHED}</span>
                                            {title.total_issues}
                                            <span
                                                className={"ms-2"}>{title.total_issues > 1 ? TEXTS.TOTAL_PUBLISHED_PUBLICATIONS : TEXTS.TOTAL_PUBLISHED_PUBLICATION}</span>
                                        </p>
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
                            </div>
                            <div className={"col-12 col-lg-7 col-xl-6"}>
                                <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                                <IssuesList issuesData={issuesData} showAdminInfo={false} isIssue showCollectingButtons={isCollectingTitle}/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
