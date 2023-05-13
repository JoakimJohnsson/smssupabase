import React, {useEffect, useState, useCallback} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useNavigate, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {getIssueName} from "../../helpers/functions/functions";
import countryData from "../../helpers/valueLists/countries.json";
import {useIssueData} from "../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {Icon} from "../icons";
import {faArrowUpRightFromSquare, faMinus, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {Grade} from "../grade/Grade";
import {FormatBadge} from "../minis/FormatBadge";
import {CountryBadge} from "../minis/CountryBadge";
import {GradeBadge} from "../grade/GradeBadge";
import {MarvelKlubbenBadge} from "../grade/MarvelKlubbenBadge";
import {getIssueIdByTitleAndNumber} from "../../helpers/functions/serviceFunctions/issueFunctions";
import {faArrowLeftLong, faArrowRightLong} from "@fortawesome/pro-duotone-svg-icons";
import {CustomSpinner} from "../minis/CustomSpinner";
import {ImageViewerCover} from "./pagecomponents/ImageViewerCover";
import {useAppContext} from "../../context/AppContext";
import {useIsCollectingIssue} from "../../helpers/customHooks/useIsCollectingIssue";
import {handleCollectingIssue} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {useIsCollectingTitle} from "../../helpers/customHooks/useIsCollectingTitle";
import {getGradeByUserIdAndIssueId} from "../../helpers/functions/serviceFunctions/collectFunctions";
import {TitleBadge} from "../minis/TitleBadge";
import {PublisherBadge} from "../minis/PublisherBadge";


export const Issue = () => {

    const {id} = useParams();
    const {setInformationMessage, user} = useAppContext();
    const [grade, setGrade] = useState(1);
    const [prevIssueId, setPrevIssueId] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [nextIssueId, setNextIssueId] = useState(null);
    const [loadingButtons, setLoadingButtons] = useState(true);
    const navigate = useNavigate();
    const [isCollectingIssue, setIsCollectingIssue] = useIsCollectingIssue(user.id, id);

    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;

    const [
        issue,
        loading
    ] = useIssueData(id);

    const [isCollectingTitle] = useIsCollectingTitle(user.id, issue.title_id);

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
        getGradeByUserIdAndIssueId(user.id, id, setGrade).then();
    }, [id, user.id])

    useEffect(() => {
        setDisplayName(getIssueName(issue));
        fetchIssueIds();
        fetchGrade();
    }, [fetchIssueIds, fetchGrade, issue])

    return (
        <main className={"container-fluid main-container"}>
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

                                <ImageViewerCover url={issue.image_url} displayName={displayName}/>
                                {
                                    isCollectingTitle &&
                                    <button
                                        aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                                        className={`btn ${isCollectingIssue ? "btn-danger" : "btn-success"} p-2 rounded-0 w-100 justify-content-center mb-4`}
                                        onClick={() => handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue)}>
                                        {
                                            isCollectingIssue ?
                                                <><Icon icon={faMinus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.DELETE}</>
                                                :
                                                <><Icon icon={faPlus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.ADD}</>
                                        }
                                    </button>
                                }
                                {
                                    loadingButtons ?
                                        <CustomSpinner/>
                                        :
                                        <>
                                            <div className={"text-center"}>
                                                <button
                                                    onClick={() => navigate(`/issues/${prevIssueId}`)}
                                                    disabled={!prevIssueId}
                                                    className={"btn btn-sm btn-outline-secondary me-3"} aria-label={LABELS_AND_HEADINGS.PREVIOUS}>
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
                            </div>
                            <div className={"col-12 col-md-8 col-xl-6"}>
                                <div className={"d-flex align-items-center flex-wrap mb-3"}>
                                    {
                                        isCollectingIssue &&
                                        <GradeBadge grade={grade}/>
                                    }
                                    <TitleBadge title={issue.titles}/>
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
                                </div>
                                <div className={"mb-4"}>
                                    <h2>{issue.titles.name}</h2>
                                    <p>{issue.titles.description}</p>
                                    <h2>{issue.publishers.name}</h2>
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
                                </div>
                                {
                                    isCollectingIssue &&
                                    <Grade issue={issue} grade={grade} setGrade={setGrade}/>
                                }
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
