import React, {useEffect, useState, useCallback} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useNavigate, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../helpers/constants";
import {getIssueName} from "../../helpers/functions";
import countryData from "../../helpers/valueLists/countries.json";
import {useIssueData} from "../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {EditIcon, Icon} from "../icons";
import {faArrowUpRightFromSquare, faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {FormatBadge} from "../minis/FormatBadge";
import {CountryBadge} from "../minis/CountryBadge";
import {GradeBadge} from "../grade/GradeBadge";
import {MarvelKlubbenBadge} from "../grade/MarvelKlubbenBadge";
import {getIssueIdByTitleAndNumber} from "../../services/issueService";
import {faArrowLeftLong, faArrowRightLong, faCloudQuestion, faCloudXmark, faCloudArrowUp} from "@fortawesome/pro-duotone-svg-icons";
import {CustomSpinner} from "../minis/CustomSpinner";
import {ImageViewerCover} from "./pagecomponents/ImageViewerCover";
import {useAppContext} from "../../context/AppContext";
import {useIsCollectingIssue} from "../../helpers/customHooks/useIsCollectingIssue";
import {handleCollectingIssue, handleCollectingTitle} from "../../services/serviceFunctions";
import {useIsCollectingTitle} from "../../helpers/customHooks/useIsCollectingTitle";
import {
    addIssueToUpgrade,
    addIssueToWanted,
    getGradesByUserIdAndIssueId,
    removeIssueFromUpgrade,
    removeIssueFromWanted
} from "../../services/collectingService";
import {TitleBadge} from "../minis/TitleBadge";
import {PublisherBadge} from "../minis/PublisherBadge";
import {Sources} from "./pagecomponents/Sources";
import {AddMessage} from "../message/AddMessage";
import {FunctionButton} from "../minis/FunctionButton";
import {EditGrade} from "../grade/EditGrade";


export const Issue = () => {

    const {id} = useParams();
    const {setInformationMessage, user, profile} = useAppContext();
    const [grade, setGrade] = useState(4);
    const [prevIssueId, setPrevIssueId] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [nextIssueId, setNextIssueId] = useState(null);
    const [loadingButtons, setLoadingButtons] = useState(true);
    const navigate = useNavigate();
    const [isCollectingIssue, setIsCollectingIssue, isWantingIssue, setIsWantingIssue, isUpgradingIssue, setIsUpgradingIssue] = useIsCollectingIssue(user.id, id);

    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;

    const [
        issue,
        loading
    ] = useIssueData(id);

    const [isCollectingTitle, setIsCollectingTitle] = useIsCollectingTitle(user.id, issue.title_id);

    const fetchIssueIds = useCallback(() => {
        if (issue.number && issue.title_id && issue.year) {
            let prevNumber = issue.number - 1;
            let nextNumber = issue.number + 1;
            let titleId = issue.title_id;
            let year = issue.year;
            getIssueIdByTitleAndNumber(prevNumber, titleId, year, setPrevIssueId).then(() => {
                getIssueIdByTitleAndNumber(nextNumber, titleId, year, setNextIssueId).then(() => setLoadingButtons(false));
            });
        }
    }, [issue]);

    const fetchGrade = useCallback(() => {
        getGradesByUserIdAndIssueId(user.id, id, setGrade).then();
    }, [id, user.id])

    useEffect(() => {
        if (issue) {
            setDisplayName(getIssueName(issue));
            fetchIssueIds();
            fetchGrade();
        }
    }, [fetchIssueIds, fetchGrade, issue])

    const handleWanted = () => {
        if (isWantingIssue) {
            removeIssueFromWanted(user.id, issue.id).then(() => setIsWantingIssue(false));
        } else {
            addIssueToWanted(user.id, issue.id).then(() => setIsWantingIssue(true));
        }
    }

    const handleUpgrade = () => {
        if (isUpgradingIssue) {
            removeIssueFromUpgrade(user.id, issue.id).then(() => setIsUpgradingIssue(false));
        } else {
            addIssueToUpgrade(user.id, issue.id).then(() => setIsUpgradingIssue(true));
        }
    }

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={getIssueName(issue)} doIgnoreName={true} bcName={getIssueName(issue)}/>
                            </div>
                            <div className={"col-12 col-md-4 col-xl-3 mb-4"}>
                                <ImageViewerCover url={issue.image_url} displayName={displayName} isCollectingIssue={isCollectingIssue}/>
                                {
                                    isCollectingTitle ?
                                        <button
                                            aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                                            className={`btn ${isCollectingIssue ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 justify-content-center mb-4`}
                                            onClick={() => handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue)}>
                                            {
                                                isCollectingIssue ?
                                                    <><Icon icon={faMinus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.DELETE}</>
                                                    :
                                                    <><Icon icon={faPlus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.ADD}</>
                                            }
                                        </button>
                                        :
                                        <button
                                            aria-label={LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + issue.titles.name}
                                            className={`btn ${isCollectingTitle ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 flex-column justify-content-center mb-4`}
                                            onClick={() => handleCollectingTitle(user.id, issue.titles.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle)}>
                                            {LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + issue.titles.name}
                                        </button>
                                }
                                {
                                    issue.titles.total_issues > 1 &&
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
                                                            aria-label={LABELS_AND_HEADINGS.PREVIOUS}>
                                                            <Icon icon={faArrowLeftLong} className={"fa-2x"}/>
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/issues/${nextIssueId}`)}
                                                            disabled={!nextIssueId}
                                                            className={"btn btn-sm btn-outline-secondary "} aria-label={LABELS_AND_HEADINGS.NEXT}>
                                                            <Icon icon={faArrowRightLong} className={"fa-2x"}/>
                                                        </button>
                                                    </div>
                                                </>
                                        }
                                    </>
                                }
                            </div>
                            <div className={"col-12 col-md-8 col-xl-6"}>
                                <div className={"d-flex align-items-center flex-wrap mb-3"}>
                                    {
                                        isCollectingIssue &&
                                        <GradeBadge grade={grade}/>
                                    }
                                    <TitleBadge title={issue.titles}/>
                                    {
                                        !!issue.is_variant &&
                                        <span className={`tag-badge text-black bg-info`}>Variant</span>
                                    }
                                    <PublisherBadge publisher={issue.publishers}/>
                                    {
                                        issue.is_marvelklubben === 1 &&
                                        <MarvelKlubbenBadge number={issue.marvelklubben_number}/>
                                    }
                                    <FormatBadge formatId={issue.titles.format_id}/>
                                    {
                                        countryData &&
                                        <CountryBadge countryId={issue.publishers.country_id}/>
                                    }
                                    {
                                        profile && profile.role >= 1 &&
                                        <Link to={`/admin/issues/${issue.id}?edit=true`} title={LABELS_AND_HEADINGS.EDIT + " " + displayName}><span
                                            className={`tag-badge text-black bg-issue-400`}><EditIcon/> {LABELS_AND_HEADINGS.EDIT + " " + displayName}</span></Link>
                                    }
                                </div>
                                <div className={"mb-3"}>
                                    {
                                        isCollectingTitle &&
                                        <>
                                            <FunctionButton
                                                variant={"secondary"}
                                                icon={isWantingIssue ? faCloudXmark : faCloudQuestion}
                                                onClick={() => handleWanted()}
                                                label={isWantingIssue ? LABELS_AND_HEADINGS.REMOVE_ISSUE_WANTED : LABELS_AND_HEADINGS.ADD_ISSUE_WANTED}
                                                id={"message-form-toggler"}
                                                showLabel={true}
                                            />
                                            {
                                                isCollectingIssue &&
                                                <FunctionButton
                                                    variant={"secondary"}
                                                    icon={isUpgradingIssue ? faCloudXmark : faCloudArrowUp}
                                                    onClick={() => handleUpgrade()}
                                                    label={isUpgradingIssue ? LABELS_AND_HEADINGS.REMOVE_ISSUE_UPGRADE : LABELS_AND_HEADINGS.ADD_ISSUE_UPGRADE}
                                                    id={"message-form-toggler"}
                                                    showLabel={true}
                                                />
                                            }
                                        </>
                                    }
                                    <AddMessage originObject={issue} originTable={TABLES.ISSUES}/>
                                </div>
                                <div className={"mb-4"}>
                                    <h2>{issue.titles.name}</h2>
                                    <p className={"mb-4"}>{issue.titles.description}</p>
                                    <h2>{issue.publishers.name}</h2>
                                    <div className={"mb-4"}>
                                        <p>{issue.publishers.description}</p>
                                        {
                                            issue.titles.wiki_url &&
                                            <p>
                                                <a href={issue.titles.wiki_url} target={"_blank"} rel={"noreferrer"}>
                                                    {LABELS_AND_HEADINGS.SERIEWIKIN_FOR} {issue.titles.name}
                                                    <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                                </a>
                                            </p>
                                        }
                                        {
                                            issue.titles.comics_org_url &&
                                            <p>
                                                <a href={issue.titles.comics_org_url} target={"_blank"} rel={"noreferrer"}>
                                                    {issue.titles.name} {LABELS_AND_HEADINGS.ON_COMICS_ORG}
                                                    <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                                </a>
                                            </p>
                                        }
                                    </div>
                                    {
                                        issue.source && issue.source !== "" &&
                                        <Sources issue={issue}/>
                                    }
                                </div>
                                {
                                    isCollectingIssue &&
                                    <div className={"sms-section--light mb-4"}>
                                        <h2>{LABELS_AND_HEADINGS.GRADE}</h2>
                                        <p>{TEXTS.GRADE_TEXT_2} <a href="https://seriekatalogen.se/grades/index.html" rel="noreferrer" target={"_blank"}>Seriekatalogen</a>.</p>
                                        <EditGrade grade={grade} setGrade={setGrade} issue={issue}/>
                                    </div>
                                }
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
