import React, {useEffect, useState, useCallback} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {Link, useNavigate, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {getIssueName} from "../../helpers/functions/functions";
import {ImageViewerLogo} from "./pagecomponents/ImageViewerLogo";
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
        title,
        publisher,
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
        setDisplayName(getIssueName(title, issue));
        fetchIssueIds();
        fetchGrade();
    }, [fetchIssueIds, fetchGrade, title, issue])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                {
                    loading ?
                        <OverlaySpinner/>
                        :
                        <>
                            <div className={"sms-page-col"}>
                                <HeadingWithBreadCrumbs text={getIssueName(title, issue)} doIgnoreName={true} bcName={getIssueName(title, issue)}/>
                            </div>
                            <div className={"col-12 col-md-4 col-xl-3 mb-4"}>
                                {
                                    isCollectingTitle &&
                                    <button
                                        aria-label={isCollectingIssue ? collectIssueTextStop : collectIssueTextStart}
                                        className={`btn ${isCollectingIssue ? "btn-success" : "btn-danger"} p-2 rounded-0 w-100 justify-content-center mb-4`}
                                        onClick={() => handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue)}>
                                        {
                                            isCollectingIssue ?
                                                <><Icon icon={faMinus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.DELETE}</>
                                                :
                                                <><Icon icon={faPlus} size={"1x"} className={"me-2"}/>{LABELS_AND_HEADINGS.ADD}</>
                                        }
                                    </button>
                                }
                                <ImageViewerCover url={issue.image_url} fileName={issue.image_filename}/>
                                {
                                    loadingButtons ?
                                        <CustomSpinner/>
                                        :
                                        <>
                                            <div className={"text-center"}>
                                                <button
                                                    onClick={() => navigate(`/issues/${prevIssueId}`)}
                                                    disabled={!prevIssueId}
                                                    className={"btn btn-sm btn-outline-primary me-3"} aria-label={LABELS_AND_HEADINGS.PREVIOUS}>
                                                    <Icon icon={faArrowLeftLong} className={"fa-2x"}/>
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/issues/${nextIssueId}`)}
                                                    disabled={!nextIssueId}
                                                    className={"btn btn-sm btn-outline-primary "} aria-label={LABELS_AND_HEADINGS.NEXT}>
                                                    <Icon icon={faArrowRightLong} className={"fa-2x"}/>
                                                </button>
                                            </div>
                                        </>
                                }
                            </div>
                            <div className={"col-12 col-md-8 col-xl-6"}>
                                <div className={"d-flex align-items-center flex-wrap mb-2"}>
                                    {
                                        isCollectingIssue &&
                                        <GradeBadge grade={grade}/>
                                    }
                                    {
                                        issue.is_marvelklubben === 1 &&
                                        <MarvelKlubbenBadge number={issue.marvelklubben_number}/>
                                    }
                                    <FormatBadge formatId={title.format_id}/>
                                    {
                                        countryData &&
                                        <CountryBadge countryId={publisher.country_id}/>
                                    }
                                </div>
                                <div className={"mb-4"}>
                                    <p>{title.description}</p>
                                    <p>{publisher.description}</p>
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
                                <div className={"row mb-4"}>
                                    <div className={"col-12 col-md-6 mb-4 mb-md-0"}>
                                        <Link to={`/titles/${title.id}`} title={title.name}>
                                            <ImageViewerLogo url={title.image_url} fileName={title.image_filename}/>
                                        </Link>
                                    </div>
                                    <div className={"col-12 col-md-6 mb-4 mb-md-0"}>
                                        <Link to={`/publishers/${publisher.id}`} title={publisher.name}>
                                            <ImageViewerLogo url={publisher.image_url} fileName={publisher.image_filename}/>
                                        </Link>
                                    </div>
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
