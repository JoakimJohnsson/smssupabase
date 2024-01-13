import React, {useEffect, useState, useCallback} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useNavigate, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../helpers/constants";
import {getIssueName, renderGradeValue} from "../../helpers/functions";
import countryData from "../../helpers/valueLists/countries.json";
import {useIssueData} from "../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {Icon} from "../icons";
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
    addGrade,
    addIssueToUpgrade,
    addIssueToWanted,
    getGradesByUserIdAndIssueId,
    getGradeValuesByIssueId,
    removeIssueFromUpgrade,
    removeIssueFromWanted
} from "../../services/collectingService";
import {Sources} from "./pagecomponents/Sources";
import {AddMessage} from "../message/AddMessage";
import {FunctionButton} from "../minis/FunctionButton";
import {EditGrade} from "../grade/EditGrade";
import {IconButton} from "../minis/IconButton";
import {
    editIconDuoTone,
    publishersIconDuoTone,
    titleIconDuoTone,
    titlesIconDuoTone,
} from "../icons-duotone";
import {IconLink} from "../minis/IconLink";


export const Issue = () => {

    const {id} = useParams();
    const {setInformationMessage, user, profile} = useAppContext();
    const [grades, setGrades] = useState([]);
    const [gradeValues, setGradeValues] = useState([]);
    const [totalCopies, setTotalCopies] = useState(null);
    const [prevIssueId, setPrevIssueId] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [nextIssueId, setNextIssueId] = useState(null);
    const [loadingButtons, setLoadingButtons] = useState(true);
    const navigate = useNavigate();
    const {
        isCollectingIssue,
        setIsCollectingIssue,
        isWantingIssue,
        setIsWantingIssue,
        isUpgradingIssue,
        setIsUpgradingIssue
    } = useIsCollectingIssue(user.id, id);

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

    const fetchGrades = useCallback(() => {
        getGradesByUserIdAndIssueId(user.id, id, setGrades).then();
    }, [id, user.id]);

    const fetchGradeValues = useCallback(() => {
        getGradeValuesByIssueId(id, setGradeValues).then();
    }, [id]);

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

    const handleAddGrade = () => {
        addGrade(user.id, issue.id).then(() => fetchGrades());
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
                                            onClick={() => {
                                                handleCollectingIssue(user.id, issue.id, setInformationMessage, isCollectingIssue, setIsCollectingIssue);
                                                fetchGrades();
                                            }}>
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
                                            onClick={() => handleCollectingTitle(user.id, issue.titles.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle, true)}>
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
                                <IconLink
                                    variant={"primary"}
                                    icon={titlesIconDuoTone}
                                    path={ROUTES.DASHBOARD.PATH_MY_TITLES}
                                    label={LABELS_AND_HEADINGS.DASHBOARD_MY_TITLES}
                                />
                                <IconLink
                                    variant={"primary"}
                                    icon={titleIconDuoTone}
                                    path={`/titles/${issue.titles.id}`}
                                    label={issue.titles.name}
                                />
                                <IconLink
                                    variant={"primary"}
                                    icon={publishersIconDuoTone}
                                    path={`/publishers/${issue.publishers.id}`}
                                    label={issue.publishers.name}
                                />
                                {
                                    profile && profile.role >= 1 &&
                                    <IconLink
                                        variant={"primary"}
                                        icon={editIconDuoTone}
                                        path={`/admin/issues/${issue.id}?edit=true`}
                                        label={LABELS_AND_HEADINGS.EDIT + " " + displayName}
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
                                    <FormatBadge formatId={issue.titles.format_id}/>
                                    {
                                        countryData &&
                                        <CountryBadge countryId={issue.publishers.country_id}/>
                                    }
                                    <span className={"tag-badge bg-white text-black"}>{totalCopies} {LABELS_AND_HEADINGS.COPY}</span>
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
                                    !!issue.titles.is_valued && issue.grade_values && !!issue.grade_values.length &&
                                    <div className={"sms-section--light section--grade mb-4"}>
                                        <h2>{LABELS_AND_HEADINGS.GRADE_VALUE_VALUES}</h2>
                                        <table className={"table table-sm table-responsive table-striped mb-0 mt-3"}>
                                            <caption>{LABELS_AND_HEADINGS.GRADE_VALUE_VALUES_FOR} {displayName}</caption>
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
                                                <th scope={"row"}>{issue.year} {issue.number}</th>
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
                                    <div className={"sms-section--light section--grade mb-4"}>
                                        <h2>{LABELS_AND_HEADINGS.GRADE}</h2>
                                        <div className={"mb-3"}>
                                            {
                                                isCollectingIssue && grades &&
                                                grades.sort((a, b) => a.id - b.id).map((g, index) => <GradeBadge key={g.id} grade={g.grade}
                                                                                                                 index={index}/>)
                                            }
                                        </div>
                                        <p>
                                            {TEXTS.GRADE_TEXT_2} <a href="https://seriekatalogen.se/grades/index.html" rel="noreferrer"
                                                                    target={"_blank"}>{TEXTS.GRADE_TEXT_3}</a>.
                                        </p>
                                        <p>{TEXTS.GRADE_TEXT_4}</p>
                                        {
                                            grades &&
                                            grades.sort((a, b) => a.id - b.id).map((grade, index) => {
                                                return gradeValues && !!gradeValues.length && (
                                                    <EditGrade key={grade.id} grade={grade} fetchGrades={fetchGrades} issue={issue} index={index}
                                                               gradeValues={gradeValues}/>
                                                );
                                            })
                                        }
                                        <IconButton variant={"primary"} icon={faPlus} onClick={() => handleAddGrade()}
                                                    label={LABELS_AND_HEADINGS.ADD_GRADE}/>
                                    </div>
                                }
                            </div>
                        </>
                }
            </div>
        </main>
    )
}
