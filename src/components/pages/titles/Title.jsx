import React, {useCallback, useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../../headings/index.jsx";
import {useParams} from "react-router-dom";
import {
    addTitleToTable,
    getRowByTableAndId,
    handleCollectingTitle,
    removeTitleFromTable,
    userTitleExists
} from "../../../services/serviceFunctions.js";
import {ROUTES} from "../../../helpers/constants/configConstants.jsx";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings.js";
import {PANES, TEXTS} from "../../../helpers/constants/textConstants/texts.js";
import {ITEM_TYPES, TABLES} from "../../../helpers/constants/serviceConstants.js";
import {IssuesList} from "../../lists/issues/IssuesList.jsx";
import {faArrowUpRightFromSquare} from "@fortawesome/pro-regular-svg-icons";
import {
    faGrid,
    faList,
    faGrid2,
    faGrid2Plus,
    faTimes,
    faPlus,
    faHeart
} from "@fortawesome/pro-duotone-svg-icons";
import {getCalculatedYear, getTitleProgressForUser, objectDoesExist} from "../../../helpers/functions.jsx";
import {ImageViewerSmall} from "../pagecomponents/ImageViewerSmall.jsx";
import {OverlaySpinner} from "../../minis/OverlaySpinner.jsx";
import {useAppContext} from "../../../context/AppContext.jsx";
import {getIssuesWithTitleAndPublisherAndGradeValuesByTitleId} from "../../../services/issueService.js";
import {FunctionButton} from "../../minis/FunctionButton.jsx";
import {TitleProgress} from "./TitleProgress.jsx";
import {FormatBadge} from "../../minis/FormatBadge.jsx";
import {
    addIssueToCollection,
    checkGradingStatus,
    deleteAllGradesByUserAndIssue,
    deleteIssueFromCollectionSimple
} from "../../../services/collectingService.js";
import {Message} from "../../message/Message.jsx";
import {Icon, editIconDuoTone, infoIconDuoTone, titlesIconDuoTone, valueIconDuoTone} from "../../icons/index.jsx";
import {IconLink} from "../../minis/IconLink.jsx";
import {useCollectingStatus} from "../../../helpers/customHooks/useCollectingStatus.js";
import {SeriekatalogenTitleLink} from "../../minis/SeriekatalogenTitleLink.jsx";
import {NoMatch} from "../../routes/NoMatch.jsx";
import {MESSAGES} from "../../../helpers/constants/textConstants/messages.js";
import {EditStarReview} from "../../star/EditStarReview.jsx";
import {
    addStarReview,
    getReviewByUserIdItemTypeAndId,
    updateStarReview
} from "../../../services/reviewservice.js";
import {StarReviewBadge} from "../../star/StarReviewBadge.jsx";


export const Title = () => {

    const {setInformationMessage, user, profile} = useAppContext();
    const [title, setTitle] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [review, setReview] = useState(null);
    const [stars, setStars] = useState(0);
    const [loading, setLoading] = useState(true);
    const [addIssue, setAddIssue] = useState(false);
    const [removeIssue, setRemoveIssue] = useState(false);
    const [doUpdate, setDoUpdate] = useState({});
    const {id} = useParams();
    const {isCollectingTitle, setIsCollectingTitle} = useCollectingStatus(user.id, false, id);
    const [isFavoriteTitle, setIsFavoriteTitle] = useState(false);
    const displayName = title.name + " " + title.start_year;
    const collectTitleTextStart = TEXTS.COLLECT_TITLE_START + " " + displayName;
    const collectTitleTextStop = TEXTS.COLLECT_TITLE_STOP + " " + displayName;
    const [listViewGrid, setListViewGrid] = useState(true);
    const [listViewMissing, setListViewMissing] = useState(false);
    const [listViewGradeValue, setListViewGradeValue] = useState(false);
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
        const fetchReviews = async () => {
            if (user.id && title.id) {
                const fetchedReview = await getReviewByUserIdItemTypeAndId(user.id, ITEM_TYPES.TITLE, title.id);
                if (fetchedReview) {
                    setReview(fetchedReview);
                    setStars(fetchedReview.stars);
                }
            }
        };
        fetchReviews();
    }, [user.id, title.id]);

    useEffect(() => {
        if (titleProgress && titleProgress.progress === 100) {
            setListViewMissing(false);
        }
    }, [titleProgress]);

    useEffect(() => {
        // Reset values before checking
        setIsFavoriteTitle(false);
        const checkTitle = async () => {
            if (user.id && title.id) {
                const favoriteTitleExists = await userTitleExists(user.id, title.id, TABLES.USERS_TITLES_FAVORITE);
                setIsFavoriteTitle(favoriteTitleExists);
            }
        };
        checkTitle();
    }, [user.id, title.id]);

    const addAllIssues = () => {
        if (!window.confirm(MESSAGES.CONFIRM.ADD_ALL_ISSUES)) {
            return false;
        }
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
        if (!window.confirm(MESSAGES.CONFIRM.REMOVE_ALL_ISSUES)) {
            return false;
        }
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

    const handleFavorite = () => {
        if (isFavoriteTitle) {
            removeTitleFromTable(user.id, title.id, TABLES.USERS_TITLES_FAVORITE)
                .then(() => setIsFavoriteTitle(false));
        } else {
            addTitleToTable(user.id, title.id, TABLES.USERS_TITLES_FAVORITE)
                .then(() => setIsFavoriteTitle(true));
        }
    }

    useEffect(() => {
        setDoUpdate(
            {
                addIssue: addIssue,
                removeIssue: removeIssue
            }
        )
    }, [addIssue, removeIssue]);

    const saveReview = async (updatedStars) => {
        if (review) {
            // If a review exists, update it
            await updateStarReview(review.id, updatedStars);
            setReview({...review, stars: updatedStars}); // Update local state
        } else {
            // If no review exists, create a new one
            const newReview = await addStarReview(user.id, ITEM_TYPES.TITLE, title.id, updatedStars);
            setReview(newReview);
        }
    };

    return objectDoesExist(title) ?
        <div className={"row"}>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
                        <div className={"sms-page-col"}>
                            <HeadingWithBreadCrumbs
                                text={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}/>
                        </div>
                        <div className={"col-12 col-lg-5 col-xl-4 mb-5"}>
                            <ImageViewerSmall url={title.image_url} fileName={title.image_filename}/>
                            {
                                titleProgress.progress === 0 ?
                                    <button
                                        aria-label={isCollectingTitle ? collectTitleTextStop : collectTitleTextStart}
                                        className={`btn ${isCollectingTitle ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 flex-column justify-content-center mb-4`}
                                        onClick={() => handleCollectingTitle(user.id, title.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle, false)}>
                                        {
                                            isCollectingTitle ?
                                                <>{TEXTS.COLLECT_TITLE_STOP + " " + title.name}</>
                                                :
                                                <>{TEXTS.COLLECT_TITLE_START + " " + title.name}</>
                                        }
                                    </button>
                                    :
                                    <p>{TEXTS.COLLECT_TITLE_STOP_REMOVE}</p>
                            }
                            <div className={"mb-3"}>
                                <FormatBadge formatId={title.format_id}/>
                                <StarReviewBadge item={title}/>
                            </div>
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
                                <a className={"d-block"} href={title.wiki_url} target={"_blank"} rel={"noreferrer"}>
                                    {LABELS.SECTIONS.TITLES.SERIEWIKIN_FOR} {title.name}
                                    <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                </a>
                            }
                            {
                                title.comics_org_url &&
                                <a className={"d-block"} href={title.comics_org_url} target={"_blank"}
                                   rel={"noreferrer"}>
                                    {title.name} {LABELS.SECTIONS.TITLES.ON_COMICS_ORG}
                                    <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                </a>
                            }
                            <SeriekatalogenTitleLink titleName={title.name}/>
                        </div>
                        <div className={"col-12 col-lg-7 col-xl-8"}>
                            <IconLink
                                variant={"primary"}
                                icon={titlesIconDuoTone}
                                path={ROUTES.DASHBOARD.PATH_MY_TITLES}
                                label={LABELS.SECTIONS.DASHBOARD.LINKS.MY_TITLES}
                            />
                            {
                                profile && profile.role >= 1 &&
                                <IconLink
                                    variant={"primary"}
                                    icon={editIconDuoTone}
                                    path={`/admin/titles/${title.id}?edit=true`}
                                    label={LABELS.COMMON.EDIT + " " + title.name}
                                />
                            }
                            {
                                isCollectingTitle &&
                                <TitleProgress titleProgress={titleProgress}/>
                            }
                            <div className={"sms-btn-group"}>
                                <FunctionButton
                                    variant={isFavoriteTitle ? "btn-marvelklubben" : "btn-outline-secondary"}
                                    icon={faHeart}
                                    onClick={() => handleFavorite()}
                                    label={isFavoriteTitle ? TEXTS.REMOVE_FAVORITE : TEXTS.ADD_FAVORITE}
                                />
                                {
                                    <FunctionButton
                                        variant={listViewGradeValue ? "btn-grade" : "btn-outline-secondary"}
                                        icon={valueIconDuoTone}
                                        onClick={() => setListViewGradeValue(!listViewGradeValue)}
                                        label={listViewGradeValue ? LABELS.COMMON.LIST_VIEW_GRADE_VALUE_HIDE : LABELS.COMMON.LIST_VIEW_GRADE_VALUE_SHOW}
                                        disabled={!title.is_valued}
                                    />
                                }
                                {
                                    !listViewGradeValue ?
                                        listViewGrid ?
                                            <FunctionButton variant={"btn-outline-secondary"}
                                                            icon={faList}
                                                            onClick={() => setListViewGrid(!listViewGrid)}
                                                            label={LABELS.COMMON.LIST_VIEW_LIST_SHOW}
                                            />
                                            :
                                            <FunctionButton variant={"btn-success"}
                                                            icon={faGrid}
                                                            onClick={() => setListViewGrid(!listViewGrid)}
                                                            label={LABELS.COMMON.LIST_VIEW_GRID_SHOW}
                                            />
                                        :
                                        false
                                }
                                {
                                    !listViewGradeValue && listViewGrid && (titleProgress.progress !== 100) ?
                                        listViewMissing ?
                                            <FunctionButton variant={"btn-success"}
                                                            icon={faGrid2Plus}
                                                            onClick={() => setListViewMissing(!listViewMissing)}
                                                            label={LABELS.SECTIONS.TITLES.SHOW_ALL_ISSUES}
                                            />
                                            :
                                            <FunctionButton variant={"btn-outline-secondary"}
                                                            icon={faGrid2}
                                                            onClick={() => setListViewMissing(!listViewMissing)}
                                                            label={LABELS.SECTIONS.TITLES.SHOW_MISSING_ISSUES}
                                            />
                                        :
                                        false
                                }
                            </div>
                            {
                                !listViewGradeValue ?
                                    isCollectingTitle && listViewGrid &&
                                    <div className={"sms-btn-group mb-4"}>
                                        {
                                            titleProgress.progress !== 100 &&
                                            <FunctionButton variant={"btn-outline-danger"}
                                                            icon={faPlus}
                                                            onClick={() => addAllIssues()}
                                                            label={TEXTS.COLLECTING_ADD_ALL}
                                            />
                                        }
                                        {
                                            titleProgress.progress > 0 &&
                                            <FunctionButton variant={"btn-outline-danger"}
                                                            icon={faTimes}
                                                            onClick={() => removeAllIssues()}
                                                            label={TEXTS.COLLECTING_REMOVE_ALL}
                                            />

                                        }
                                    </div>
                                    :
                                    false
                            }
                            <Message originObject={title} originTable={TABLES.TITLES}/>
                            <EditStarReview stars={stars} setStars={setStars} saveReview={saveReview}/>
                            {
                                isCollectingTitle && issueNeedsGrading &&
                                <div className={"alert alert-info d-flex align-items-center mb-4"}>
                                    <Icon icon={infoIconDuoTone} className={"me-3"} size={"2x"}/>
                                    {PANES.TITLES.GRADE_MISSING}
                                </div>
                            }
                            <h2>{listViewGradeValue ? LABELS.SECTIONS.GRADES.GRADE_VALUE : LABELS.SECTIONS.ISSUES.ISSUES}</h2>
                            <IssuesList issuesData={issuesData} showAdminInfo={false}
                                        showCollectingButtons={isCollectingTitle}
                                        listViewGrid={listViewGrid} listViewMissing={listViewMissing}
                                        listViewGrades={listViewGradeValue}
                                        fetchTitleProgress={fetchTitleProgress}
                                        doUpdate={doUpdate}/>
                        </div>
                    </>
            }
        </div>
        :
        <NoMatch/>
}
