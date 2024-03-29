import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useParams} from "react-router-dom";
import {getRowByTableAndId, handleCollectingTitle} from "../../services/serviceFunctions";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../helpers/constants";
import {IssuesList} from "../lists/issues/IssuesList";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {faGrid, faList, faGrid2, faGrid2Plus, faTrashCanList, faCartPlus} from "@fortawesome/pro-duotone-svg-icons";
import {getCalculatedYear, getTitleProgressForUser} from "../../helpers/functions";
import {ImageViewerSmall} from "./pagecomponents/ImageViewerSmall";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useAppContext} from "../../context/AppContext";
import {getIssuesWithTitleAndPublisherAndGradeValuesByTitleId} from "../../services/issueService";
import {FunctionButton} from "../minis/FunctionButton";
import {TitleProgress} from "./TitleProgress";
import {FormatBadge} from "../minis/FormatBadge";
import {
    addIssueToCollection,
    checkGradingStatus,
    deleteAllGradesByUserAndIssue,
    deleteIssueFromCollectionSimple
} from "../../services/collectingService";
import {AddMessage} from "../message/AddMessage";
import {Icon, editIconDuoTone, infoIconDuoTone, titlesIconDuoTone, valueIconDuoTone} from "../icons";
import {IconLink} from "../minis/IconLink";
import {useCollectingStatus} from "../../helpers/customHooks/useCollectingStatus";


export const Title = () => {

    const {setInformationMessage, user, profile} = useAppContext();
    const [title, setTitle] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [addIssue, setAddIssue] = useState(false);
    const [removeIssue, setRemoveIssue] = useState(false);
    const [doUpdate, setDoUpdate] = useState({});
    const {id} = useParams();
    const {isCollectingTitle, setIsCollectingTitle} = useCollectingStatus(user.id, false, id);
    const displayName = title.name + " " + title.start_year;
    const collectTitleTextStart = LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + displayName;
    const [listViewGrid, setListViewGrid] = useState(true);
    const [listViewMissing, setListViewMissing] = useState(false);
    const [listViewGrades, setListViewGrades] = useState(false);
    const [issueNeedsGrading, setIssueNeedsGrading] = useState(false);
    const [titleProgress, setTitleProgress] = useState({});

    const fetchTitleAndIssuesData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            getIssuesWithTitleAndPublisherAndGradeValuesByTitleId(setIssuesData, id).then(() => setLoading(false));
        });
    }, [id]);

    const fetchTitleProgress = useCallback(async () => {
        setTitleProgress(await getTitleProgressForUser(title, user.id))
    }, [title, user.id]);

    useEffect(() => {
        checkGradingStatus(issuesData, user.id, setIssueNeedsGrading).then();
    }, [issuesData, user.id]);

    useEffect(() => {
        fetchTitleAndIssuesData();
    }, [fetchTitleAndIssuesData]);

    useEffect(() => {
        fetchTitleProgress().then();
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
            return deleteIssueFromCollectionSimple(user.id, issue.id).then(() => {
                deleteAllGradesByUserAndIssue(user.id, issue.id).then(() => {
                    fetchTitleAndIssuesData();
                    setRemoveIssue(true);
                    setAddIssue(false);
                });
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
                                <ImageViewerSmall url={title.image_url} fileName={title.image_filename}/>
                                {
                                    titleProgress.progress === 0 ?
                                        <button
                                            aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                                            className={`btn ${isCollectingTitle ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 flex-column justify-content-center mb-4`}
                                            onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle, false)}>
                                            {
                                                isCollectingTitle ?
                                                    <>{LABELS_AND_HEADINGS.COLLECT_TITLE_STOP + " " + title.name}</>
                                                    :
                                                    <>{LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + title.name}</>
                                            }
                                        </button>
                                        :
                                        <p>{LABELS_AND_HEADINGS.COLLECT_TITLE_STOP_REMOVE}</p>
                                }
                                <FormatBadge formatId={title.format_id} customClass={"mb-3"}/>
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
                                <p>
                                    <a href={"https://seriekatalogen.se"} target={"_blank"} rel={"noreferrer"}>
                                        Seriekatalogen
                                        <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                    </a>
                                </p>
                            </div>
                            <div className={"col-12 col-lg-7 col-xl-9"}>
                                <IconLink
                                    variant={"primary"}
                                    icon={titlesIconDuoTone}
                                    path={ROUTES.DASHBOARD.PATH_MY_TITLES}
                                    label={LABELS_AND_HEADINGS.DASHBOARD_MY_TITLES}
                                />
                                {
                                    profile && profile.role >= 1 &&
                                    <IconLink
                                        variant={"primary"}
                                        icon={editIconDuoTone}
                                        path={`/admin/titles/${title.id}?edit=true`}
                                        label={LABELS_AND_HEADINGS.EDIT + " " + title.name}
                                    />
                                }
                                {
                                    isCollectingTitle &&
                                    <TitleProgress titleProgress={titleProgress}/>
                                }
                                <div className={"mb-3"}>
                                    {
                                        <FunctionButton variant={"grade"} icon={valueIconDuoTone}
                                                        onClick={() => setListViewGrades(!listViewGrades)}
                                                        label={listViewGrades ? LABELS_AND_HEADINGS.LIST_VIEW_GRADES_HIDE : LABELS_AND_HEADINGS.LIST_VIEW_GRADES_SHOW}
                                                        id={"list-variant-toggler"} disabled={!title.is_valued}/>
                                    }
                                    {
                                        !listViewGrades ?
                                            listViewGrid ?
                                                <FunctionButton variant={"secondary"} icon={faList} onClick={() => setListViewGrid(!listViewGrid)}
                                                                label={LABELS_AND_HEADINGS.LIST_VIEW_LIST_SHOW} id={"list-variant-toggler"}/>
                                                :
                                                <FunctionButton variant={"secondary"} icon={faGrid} onClick={() => setListViewGrid(!listViewGrid)}
                                                                label={LABELS_AND_HEADINGS.LIST_VIEW_GRID_SHOW} id={"list-variant-toggler"}/>
                                            :
                                            false
                                    }
                                    {
                                        !listViewGrades && listViewGrid && (titleProgress.progress !== 100) ?
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
                                        !listViewGrades ?
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
                                            :
                                            false
                                    }
                                    <AddMessage originObject={title} originTable={TABLES.TITLES}/>
                                </div>
                                {
                                    isCollectingTitle && issueNeedsGrading &&
                                    <div className={"alert alert-info d-flex align-items-center mb-4"}>
                                        <Icon icon={infoIconDuoTone} className={"me-3"} size={"2x"}/>
                                        {TEXTS.GRADE_MISSING}
                                    </div>
                                }
                                <h2>{listViewGrades ? LABELS_AND_HEADINGS.GRADE_VALUES : LABELS_AND_HEADINGS.ISSUES}</h2>
                                <IssuesList issuesData={issuesData} showAdminInfo={false} showCollectingButtons={isCollectingTitle}
                                            listViewGrid={listViewGrid} listViewMissing={listViewMissing} listViewGrades={listViewGrades}
                                            fetchTitleProgress={fetchTitleProgress}
                                            doUpdate={doUpdate}/>
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
