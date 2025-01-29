import React, {useEffect, useState, useCallback} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTES} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {ITEM_TYPES, TABLES} from "../../helpers/constants/serviceConstants";
import {getIssueName, objectDoesExist, renderGradeValue} from "../../helpers/functions";
import countryData from "../../helpers/valueLists/countries.json";
import {useIssueData} from "../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {faArrowUpRightFromSquare, faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {FormatBadge} from "../minis/FormatBadge";
import {CountryBadge} from "../minis/CountryBadge";
import {GradeBadge} from "../grade/GradeBadge";
import {MarvelKlubbenBadge} from "../grade/MarvelKlubbenBadge";
import {
    faArrowLeftLong,
    faArrowRightLong,
    faBadgeSheriff,
    faBone,
    faBoneBreak,
    faHeart
} from "@fortawesome/pro-duotone-svg-icons";
import {CustomSpinner} from "../minis/CustomSpinner";
import {ImageViewerCover} from "./pagecomponents/ImageViewerCover";
import {useAppContext} from "../../context/AppContext";
import {
    addIssueToTable,
    handleCollectingIssue,
    handleCollectingTitle,
    removeIssueFromTable, userIssueExists
} from "../../services/serviceFunctions";
import {
    addGrade,
    getGradesByUserIdAndIssueId,
    getGradeValuesByIssueId
} from "../../services/collectingService";
import {Sources} from "./pagecomponents/Sources";
import {FunctionButton} from "../minis/FunctionButton";
import {EditGrade} from "../grade/EditGrade";
import {IconButton} from "../minis/IconButton";
import {
    Icon,
    editIconDuoTone,
    publishersIconDuoTone,
    titleIconDuoTone,
    titlesIconDuoTone,
} from "../icons";
import {IconLink} from "../minis/IconLink";
import {useCollectingStatus} from "../../helpers/customHooks/useCollectingStatus";
import {SeriekatalogenTitleLink} from "../minis/SeriekatalogenTitleLink";
import {NoMatch} from "../routes/NoMatch";
import {getAdjacentIssueIds} from "../../helpers/databaseFunctions.js";
import {
    addStarReview,
    getReviewByUserIdItemTypeAndId,
    updateStarReview
} from "../../services/reviewservice.js";
import {StarReviewBadge} from "../star/StarReviewBadge.jsx";
import {MessageReview} from "../message/MessageReview.jsx";


export const Issue = () => {

    const {id} = useParams();
    const {setInformationMessage, user, profile} = useAppContext();
    const [review, setReview] = useState(null);
    const [stars, setStars] = useState(0);
    const [grades, setGrades] = useState([]);
    const [gradeValues, setGradeValues] = useState([]);
    const [totalCopies, setTotalCopies] = useState(null);
    const [prevIssueId, setPrevIssueId] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [nextIssueId, setNextIssueId] = useState(null);
    const [loadingButtons, setLoadingButtons] = useState(true);
    const [isFavoriteIssue, setIsFavoriteIssue] = useState(false);
    const navigate = useNavigate();
    const {
        issue,
        loading
    } = useIssueData(id);
    const {
        isCollectingIssue,
        setIsCollectingIssue,
        isWantingIssue,
        setIsWantingIssue,
        isUpgradingIssue,
        setIsUpgradingIssue,
        isCollectingTitle,
        setIsCollectingTitle
    } = useCollectingStatus(user.id, id, issue.title_id);

    const collectIssueTextStart = TEXTS.COLLECT_ISSUE_START + " " + displayName + " " + TEXTS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = TEXTS.COLLECT_ISSUE_STOP + " " + displayName + " " + TEXTS.COLLECT_ISSUE_STOP_2;

    const fetchIssueIds = useCallback(async () => {
        if (issue.number && issue.title_id && issue.year) {
            try {
                const adjacentIssues = await getAdjacentIssueIds(issue.title_id, issue.year, issue.number, issue.is_variant, issue.variant_suffix);
                setPrevIssueId(adjacentIssues?.prevIssueId);
                setNextIssueId(adjacentIssues?.nextIssueId)
                setLoadingButtons(false);
            } catch (error) {
                console.error(error);
            }
        }
    }, [issue]);

    const fetchGrades = useCallback(() => {
        getGradesByUserIdAndIssueId(user.id, id, setGrades).then();
    }, [id, user.id]);

    const fetchGradeValues = useCallback(() => {
        getGradeValuesByIssueId(id, setGradeValues).then();
    }, [id]);

    useEffect(() => {
        // Reset values before checking
        setIsFavoriteIssue(false);
        const checkIssue = async () => {
            if (user.id && issue.id) {
                const favoriteIssueExists = await userIssueExists(user.id, issue.id, TABLES.USERS_ISSUES_FAVORITE);
                setIsFavoriteIssue(favoriteIssueExists);
            }
        };
        checkIssue();
    }, [user.id, issue.id]);

    useEffect(() => {
        if (issue) {
            setDisplayName(getIssueName(issue));
            fetchIssueIds();
            fetchGrades();
            fetchGradeValues();
        }
    }, [fetchIssueIds, fetchGrades, issue, fetchGradeValues]);

    useEffect(() => {
        if (grades && grades.length > 0) {
            setTotalCopies(grades.length);
        } else if (isCollectingIssue) {
            setTotalCopies(1);
        } else {
            setTotalCopies(0);
        }
    }, [grades, isCollectingIssue]);

    useEffect(() => {
        const fetchReviews = async () => {
            if (user.id && issue.id) {
                const fetchedReview = await getReviewByUserIdItemTypeAndId(user.id, ITEM_TYPES.ISSUE, issue.id);
                if (fetchedReview) {
                    setReview(fetchedReview);
                    setStars(fetchedReview.stars);
                }
            }
        };
        fetchReviews();
    }, [user.id, issue.id]);

    const handleWanted = () => {
        if (isWantingIssue) {
            removeIssueFromTable(user.id, issue.id, TABLES.USERS_ISSUES_WANTED)
                .then(() => setIsWantingIssue(false));
        } else {
            addIssueToTable(user.id, issue.id, TABLES.USERS_ISSUES_WANTED)
                .then(() => setIsWantingIssue(true));
        }
    }

    const handleUpgrade = () => {
        if (isUpgradingIssue) {
            removeIssueFromTable(user.id, issue.id, TABLES.USERS_ISSUES_UPGRADE)
                .then(() => setIsUpgradingIssue(false));
        } else {
            addIssueToTable(user.id, issue.id, TABLES.USERS_ISSUES_UPGRADE)
                .then(() => setIsUpgradingIssue(true));
        }
    }

    const handleFavorite = () => {
        if (isFavoriteIssue) {
            removeIssueFromTable(user.id, issue.id, TABLES.USERS_ISSUES_FAVORITE)
                .then(() => setIsFavoriteIssue(false));
        } else {
            addIssueToTable(user.id, issue.id, TABLES.USERS_ISSUES_FAVORITE)
                .then(() => setIsFavoriteIssue(true));
        }
    }

    const handleAddGrade = () => {
        addGrade(user.id, issue.id).then(() => fetchGrades());
    }

    const saveReview = async (updatedStars) => {
        if (review) {
            // If a review exists, update it
            await updateStarReview(review.id, updatedStars);
            setReview({...review, stars: updatedStars}); // Update local state
        } else {
            // If no review exists, create a new one
            const newReview = await addStarReview(user.id, ITEM_TYPES.ISSUE, issue.id, updatedStars);
            setReview(newReview);
        }
    };

    return objectDoesExist(issue) ?
        <div className={"row"}>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
                        <div className={"col-12"}>
                            <HeadingWithBreadCrumbs text={getIssueName(issue)} doIgnoreName={true}
                                                    bcName={getIssueName(issue)}/>
                        </div>
                        <div className={"col-12 col-md-4 col-xl-3 mb-4"}>
                            <ImageViewerCover url={issue.image_url} displayName={displayName}
                                              isCollectingIssue={isCollectingIssue}/>
                            {
                                isCollectingTitle ?
                                    <button
                                        aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                                        className={`btn ${isCollectingIssue ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 justify-content-center mb-4`}
                                        onClick={() => {
                                            handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue);
                                            fetchGrades();
                                        }}>
                                        {
                                            isCollectingIssue ?
                                                <><Icon icon={faMinus} size={"1x"}
                                                        className={"me-2"}/>{LABELS.COMMON.DELETE}</>
                                                :
                                                <><Icon icon={faPlus} size={"1x"}
                                                        className={"me-2"}/>{LABELS.COMMON.ADD}</>
                                        }
                                    </button>
                                    :
                                    <button
                                        aria-label={TEXTS.COLLECT_TITLE_START + " " + issue?.titles?.name}
                                        className={`btn ${isCollectingTitle ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 flex-column justify-content-center mb-4`}
                                        onClick={() => handleCollectingTitle(user.id, issue?.titles?.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle, true)}>
                                        {TEXTS.COLLECT_TITLE_START + " " + issue?.titles?.name}
                                    </button>
                            }
                            {
                                issue?.titles?.total_issues > 1 &&
                                <>
                                    {
                                        loadingButtons ?
                                            <CustomSpinner/>
                                            :
                                            <>
                                                <div className={"text-center"}>
                                                    <button
                                                        onClick={() => navigate(`/issues/${prevIssueId}`)}
                                                        disabled={!prevIssueId}
                                                        className={"btn btn-sm btn-outline-secondary me-3"}
                                                        aria-label={LABELS.COMMON.PREVIOUS}>
                                                        <Icon icon={faArrowLeftLong} className={"fa-2x"}/>
                                                    </button>
                                                    <button
                                                        onClick={() => navigate(`/issues/${nextIssueId}`)}
                                                        disabled={!nextIssueId}
                                                        className={"btn btn-sm btn-outline-secondary "}
                                                        aria-label={LABELS.COMMON.NEXT}>
                                                        <Icon icon={faArrowRightLong} className={"fa-2x"}/>
                                                    </button>
                                                </div>
                                            </>
                                    }
                                </>
                            }
                        </div>
                        <div className={"col-12 col-md-8 col-xl-9"}>
                            <IconLink
                                variant={"primary"}
                                icon={titlesIconDuoTone}
                                path={ROUTES.DASHBOARD.PATH_MY_TITLES}
                                label={LABELS.SECTIONS.DASHBOARD.LINKS.MY_TITLES}
                            />
                            <IconLink
                                variant={"primary"}
                                icon={titleIconDuoTone}
                                path={`/titles/${issue?.titles?.id}`}
                                label={issue?.titles?.name}
                            />
                            <IconLink
                                variant={"primary"}
                                icon={publishersIconDuoTone}
                                path={`/publishers/${issue?.publishers?.id}`}
                                label={issue?.publishers?.name}
                            />
                            {
                                profile && profile.role >= 1 &&
                                <IconLink
                                    variant={"primary"}
                                    icon={editIconDuoTone}
                                    path={`/admin/issues/${issue.id}?edit=true`}
                                    label={LABELS.COMMON.EDIT + " " + displayName}
                                />
                            }
                            <div className={"d-flex align-items-center flex-wrap mb-3"}>
                                {
                                    !!issue.is_variant &&
                                    <span className={`tag-badge text-black bg-info`}>Variant</span>
                                }
                                {
                                    issue.is_marvelklubben === 1 &&
                                    <MarvelKlubbenBadge number={issue.marvelklubben_number}/>
                                }
                                <FormatBadge formatId={issue?.titles?.format_id}/>
                                {
                                    countryData &&
                                    <CountryBadge countryId={issue?.publishers?.country_id}/>
                                }
                                <span
                                    className={"tag-badge bg-white text-black"}>{totalCopies} {LABELS.COMMON.COPY}</span>
                                <StarReviewBadge item={issue}/>
                            </div>
                            <div className={"sms-btn-group mb-4"}>
                                <FunctionButton
                                    variant={isFavoriteIssue ? "btn-marvelklubben" : "btn-outline-secondary"}
                                    icon={faHeart}
                                    onClick={() => handleFavorite()}
                                    label={isFavoriteIssue ? TEXTS.REMOVE_FAVORITE : TEXTS.ADD_FAVORITE}
                                />
                                {
                                    isCollectingTitle &&
                                    <>
                                        <FunctionButton
                                            variant={isWantingIssue ? "btn-publisher" : "btn-outline-secondary"}
                                            icon={faBadgeSheriff}
                                            onClick={() => handleWanted()}
                                            label={isWantingIssue ? TEXTS.REMOVE_ISSUE_WANTED : TEXTS.ADD_ISSUE_WANTED}
                                        />
                                        {
                                            isCollectingIssue &&
                                            <FunctionButton
                                                variant={isUpgradingIssue ? "btn-grade" : "btn-outline-secondary"}
                                                icon={isUpgradingIssue ? faBoneBreak : faBone}
                                                onClick={() => handleUpgrade()}
                                                label={isUpgradingIssue ? LABELS.SECTIONS.ISSUES.REMOVE_ISSUE_UPGRADE : LABELS.SECTIONS.ISSUES.ADD_ISSUE_UPGRADE}
                                            />
                                        }
                                    </>
                                }
                            </div>
                            <MessageReview originObject={issue} originTable={TABLES.ISSUES} stars={stars} setStars={setStars} saveReview={saveReview}/>
                            <div className={"mb-5"}>
                                <p className={"mb-4"}>{issue?.titles?.description}</p>
                                {
                                    issue.description &&
                                    <p className={"mb-4"}>{issue.description}</p>
                                }
                                <h2>{issue?.publishers?.name}</h2>
                                <div className={"mb-4"}>
                                    <p className={"mb-4"}>{issue?.publishers?.description}</p>
                                    <h2>{LABELS.COMMON.LINKS}</h2>
                                    {
                                        issue?.titles?.wiki_url &&
                                        <a className={"d-block"} href={issue?.titles?.wiki_url}
                                           target={"_blank"} rel={"noreferrer"}>
                                            {LABELS.SECTIONS.TITLES.SERIEWIKIN_FOR} {issue?.titles?.name}
                                            <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                        </a>
                                    }
                                    {
                                        issue?.titles?.comics_org_url &&
                                        <a className={"d-block"} href={issue?.titles?.comics_org_url}
                                           target={"_blank"} rel={"noreferrer"}>
                                            {issue?.titles?.name} {LABELS.SECTIONS.TITLES.ON_COMICS_ORG}
                                            <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                        </a>
                                    }
                                    <SeriekatalogenTitleLink titleName={issue?.titles?.name}/>
                                </div>
                                {
                                    issue.source && issue.source !== "" &&
                                    <Sources issue={issue}/>
                                }
                            </div>
                            {
                                !!issue?.titles?.is_valued && issue.grade_values && !!issue.grade_values.length &&
                                <div className={"sms-section--light variant variant--grade mb-4"}>
                                    <h2>{LABELS.SECTIONS.GRADES.GRADE_VALUE}</h2>
                                    <table className={"table table-sm table-responsive table-striped mb-0 mt-3"}>
                                        <caption>
                                            <p className={"mb-0"}>{LABELS.SECTIONS.GRADES.GRADE_VALUES_FOR} {displayName}</p>

                                        </caption>
                                        <thead>
                                        <tr>
                                            <th scope={"col"}>År / Nummer</th>
                                            <th scope={"col"}>GD</th>
                                            <th scope={"col"}>VG</th>
                                            <th scope={"col"}>FN</th>
                                            <th scope={"col"}>VF</th>
                                            <th scope={"col"}>NM</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope={"row"}>{issue.year} {issue.number}{!!issue.is_variant && issue.variant_suffix}</th>
                                            <td>{renderGradeValue(issue, "GD")}</td>
                                            <td>{renderGradeValue(issue, "VG")}</td>
                                            <td>{renderGradeValue(issue, "FN")}</td>
                                            <td>{renderGradeValue(issue, "VF")}</td>
                                            <td>{renderGradeValue(issue, "NM")}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }
                            {
                                isCollectingIssue &&
                                <div className={"sms-section--light variant variant--grade mb-4"}>
                                    <h2>{LABELS.SECTIONS.GRADES.GRADE}</h2>
                                    <div className={"mb-3"}>
                                        {
                                            isCollectingIssue && grades &&
                                            grades.sort((a, b) => a.id - b.id).map((g, index) => <GradeBadge
                                                key={g.id} grade={g.grade}
                                                index={index}/>)
                                        }
                                    </div>
                                    <p>
                                        {TEXTS.GRADE_TEXT_2} <a href="https://seriekatalogen.se/grades/index.html"
                                                                rel="noreferrer"
                                                                target={"_blank"}>{TEXTS.GRADE_TEXT_3}</a>.
                                    </p>
                                    <p>{TEXTS.GRADE_TEXT_4}</p>
                                    {
                                        grades &&
                                        grades.sort((a, b) => a.id - b.id).map((grade, index) => {
                                            return gradeValues && !!gradeValues.length && (
                                                <EditGrade key={grade.id} grade={grade} fetchGrades={fetchGrades}
                                                           issue={issue} index={index}
                                                           gradeValues={gradeValues}/>
                                            );
                                        })
                                    }
                                    <IconButton variant={"primary"} icon={faPlus} onClick={() => handleAddGrade()}
                                                label={LABELS.SECTIONS.GRADES.ADD_GRADE}/>
                                </div>
                            }
                        </div>
                    </>
            }
        </div>
        :
        <NoMatch/>
}
