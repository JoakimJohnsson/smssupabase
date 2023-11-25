import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useParams} from "react-router-dom";
import {getRowByTableAndId, handleCollectingTitle} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../helpers/constants";
import {IssuesList} from "../lists/issues/IssuesList";
import {EditIcon, Icon, TitlesIcon} from "../icons";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {faGrid, faList, faGrid2, faGrid2Plus, faTrashCanList, faCartPlus} from "@fortawesome/pro-duotone-svg-icons";
import {getCalculatedYear, getTitleProgressForUser} from "../../helpers/functions/functions";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useAppContext} from "../../context/AppContext";
import {useIsCollectingTitle} from "../../helpers/customHooks/useIsCollectingTitle";
import {getIssuesWithTitleAndPublisherByTitleId} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {FunctionButton} from "../minis/FunctionButton";
import {TitleProgress} from "./TitleProgress";
import {FormatBadge} from "../minis/FormatBadge";
import {addIssueToCollection, removeIssueFromCollectionSimple} from "../../helpers/functions/serviceFunctions/collectFunctions";
import {Message} from "../message/Message";


export const Title = () => {

    const {setInformationMessage, user, profile} = useAppContext();
    const [title, setTitle] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [addIssue, setAddIssue] = useState(false);
    const [removeIssue, setRemoveIssue] = useState(false);
    const [doUpdate, setDoUpdate] = useState({});
    const {id} = useParams();
    const [isCollectingTitle, setIsCollectingTitle] = useIsCollectingTitle(user.id, id);
    const displayName = title.name + " " + title.start_year;
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;
    const [listViewGrid, setListViewGrid] = useState(true);
    const [listViewMissing, setListViewMissing] = useState(false);
    const [titleProgress, setTitleProgress] = useState({});

    const fetchTitleAndIssuesData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            getIssuesWithTitleAndPublisherByTitleId(setIssuesData, id).then(() => setLoading(false));
        });
    }, [id]);

    const fetchTitleProgress = useCallback(async () => {
        setTitleProgress(await getTitleProgressForUser(title, user.id))
    }, [title, user.id]);

    useEffect(() => {
        fetchTitleAndIssuesData();
    }, [fetchTitleAndIssuesData]);

    useEffect(() => {
        fetchTitleProgress().then(() => console.log("Fetched progress"));
    }, [fetchTitleProgress]);

    useEffect(() => {
        if (titleProgress && titleProgress.progress === 100) {
            setListViewMissing(false);
        }
    }, [titleProgress]);

    const addAllIssues = () => {
        issuesData.map((issue) => {
            setAddIssue(false);
            setAddIssue(false);
            return addIssueToCollection(user.id, issue.id).then(() => {
                fetchTitleAndIssuesData();
                setAddIssue(true);
                setRemoveIssue(false);

            })
        });
    }

    const removeAllIssues = () => {
        issuesData.map((issue) => {
            setAddIssue(false);
            setAddIssue(false);
            return removeIssueFromCollectionSimple(user.id, issue.id).then(() => {
                fetchTitleAndIssuesData();
                setRemoveIssue(true);
                setAddIssue(false);
            })
        });
    }

    useEffect(() => {
        setDoUpdate(
            {
                addIssue: addIssue,
                removeIssue: removeIssue
            }
        )
    }, [addIssue, removeIssue])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
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
                                    disabled={isCollectingTitle && titleProgress.progress > 0}
                                    aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                                    className={`btn ${isCollectingTitle ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 flex-column justify-content-center mb-4`}
                                    onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle)}>
                                    {
                                        isCollectingTitle ?
                                            <>{LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + title.name}</>
                                            :
                                            <>{LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + title.name}</>
                                    }
                                </button>
                                <FormatBadge formatId={title.format_id} customClass={"mb-3"}/>
                                {
                                    profile && profile.role >= 1 &&
                                    <Link to={`/admin/titles/${title.id}?edit=true`} title={LABELS_AND_HEADINGS.EDIT + " " + title.name}>
                                        <span className={`tag-badge mb-3 text-black bg-title-400`}>
                                            <EditIcon className={"me-1"}/>{LABELS_AND_HEADINGS.EDIT + " " + title.name}
                                        </span>
                                    </Link>
                                }
                                {
                                    title.description &&
                                    <>
                                        <p>{title.description}</p>
                                        <p>
                                            <span className={"me-2"}>{TEXTS.TOTAL_PUBLISHED}</span>
                                            {title.total_issues}
                                            <span className={"ms-2"}>
                                                {title.total_issues > 1 ? TEXTS.TOTAL_PUBLISHED_PUBLICATIONS : TEXTS.TOTAL_PUBLISHED_PUBLICATION}
                                            </span>
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
                                {
                                    title.comics_org_url &&
                                    <p>
                                        <a href={title.comics_org_url} target={"_blank"} rel={"noreferrer"}>
                                            {title.name} {LABELS_AND_HEADINGS.ON_COMICS_ORG}
                                            <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                        </a>
                                    </p>
                                }
                            </div>
                            <div className={"col-12 col-lg-7 col-xl-9"}>
                                <Link className={"btn btn-primary sms-btn"} to={ROUTES.DASHBOARD.PATH_MY_TITLES}>
                                    <TitlesIcon className={"me-2"}/>{LABELS_AND_HEADINGS.DASHBOARD_MY_TITLES}
                                </Link>
                                {
                                    isCollectingTitle &&
                                    <TitleProgress titleProgress={titleProgress}/>
                                }
                                <div className={"mb-4"}>
                                    {
                                        listViewGrid ?
                                            <FunctionButton variant={"secondary"} icon={faList} onClick={() => setListViewGrid(!listViewGrid)}
                                                            label={LABELS_AND_HEADINGS.LIST_VIEW_LIST_SHOW} id={"list-variant-toggler"}/>
                                            :
                                            <FunctionButton variant={"secondary"} icon={faGrid} onClick={() => setListViewGrid(!listViewGrid)}
                                                            label={LABELS_AND_HEADINGS.LIST_VIEW_GRID_SHOW} id={"list-variant-toggler"}/>
                                    }
                                    {
                                        listViewGrid && (titleProgress.progress !== 100) ?
                                            listViewMissing ?
                                                <FunctionButton variant={"secondary"} icon={faGrid2Plus}
                                                                onClick={() => setListViewMissing(!listViewMissing)}
                                                                label={LABELS_AND_HEADINGS.SHOW_ALL_ISSUES} id={"list-variant-toggler"}/>
                                                :
                                                <FunctionButton variant={"secondary"} icon={faGrid2}
                                                                onClick={() => setListViewMissing(!listViewMissing)}
                                                                label={LABELS_AND_HEADINGS.SHOW_MISSING_ISSUES} id={"list-variant-toggler"}/>
                                            :
                                            false
                                    }
                                    {
                                        isCollectingTitle && listViewGrid &&
                                        <>
                                            {
                                                titleProgress.progress !== 100 &&
                                                <FunctionButton variant={"danger"} icon={faCartPlus}
                                                                onClick={() => addAllIssues()}
                                                                label={LABELS_AND_HEADINGS.COLLECTING_ADD_ALL} id={"list-variant-toggler"}/>
                                            }
                                            {
                                                titleProgress.progress > 0 &&
                                                <FunctionButton variant={"danger"} icon={faTrashCanList}
                                                                onClick={() => removeAllIssues()}
                                                                label={LABELS_AND_HEADINGS.COLLECTING_REMOVE_ALL} id={"list-variant-toggler"}/>

                                            }
                                        </>
                                    }
                                    <Message originObject={title} originTable={TABLES.TITLES}/>
                                </div>
                                <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                                <IssuesList issuesData={issuesData} showAdminInfo={false} showCollectingButtons={isCollectingTitle}
                                            listViewGrid={listViewGrid} listViewMissing={listViewMissing} fetchTitleProgress={fetchTitleProgress}
                                            doUpdate={doUpdate}/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
