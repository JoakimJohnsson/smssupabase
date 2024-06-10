import React, {useEffect, useState, useCallback} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {useNavigate, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS, ROUTES} from "../../helpers/constants/configConstants";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {getIssueName, objectDoesExist, renderGradeValue} from "../../helpers/functions";
import countryData from "../../helpers/valueLists/countries.json";
import {useIssueData} from "../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../minis/OverlaySpinner";
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
import {handleCollectingIssue, handleCollectingTitle} from "../../services/serviceFunctions";
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
import {Message} from "../message/Message";
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
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {SeriekatalogenTitleLink} from "../minis/SeriekatalogenTitleLink";
import {NoMatch} from "../routes/NoMatch";


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

    const collectIssueTextStart = LABELS_AND_HEADINGS.COLLECT_ISSUE_START + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_START_2;
    const collectIssueTextStop = LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP + " " + displayName + " " + LABELS_AND_HEADINGS.COLLECT_ISSUE_STOP_2;

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

    return objectDoesExist(issue) ? (
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
                                                        <><Icon icon={faMinus} size={"1x"} className={"me-2"}/>{LABELS.COMMON.DELETE}</>
                                                        :
                                                        <><Icon icon={faPlus} size={"1x"} className={"me-2"}/>{LABELS.COMMON.ADD}</>
                                                }
                                            </button>
                                            :
                                            <button
                                                aria-label={LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + issue?.titles?.name}
                                                className={`btn ${isCollectingTitle ? "btn-success" : "btn-outline-secondary"} p-2 rounded-0 w-100 flex-column justify-content-center mb-4`}
                                                onClick={() => handleCollectingTitle(user.id, issue?.titles?.id, setInformationMessage, isCollectingTitle, setIsCollectingTitle, true)}>
                                                {LABELS_AND_HEADINGS.COLLECT_TITLE_START + " " + issue?.titles?.name}
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
                                                                aria-label={LABELS_AND_HEADINGS.PREVIOUS}>
                                                                <Icon icon={faArrowLeftLong} className={"fa-2x"}/>
                                                            </button>
                                                            <button
                                                                onClick={() => navigate(`/issues/${nextIssueId}`)}
                                                                disabled={!nextIssueId}
                                                                className={"btn btn-sm btn-outline-secondary "} aria-label={LABELS.COMMON.NEXT}>
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
                                                    label={isWantingIssue ? TEXTS.REMOVE_ISSUE_WANTED : TEXTS.ADD_ISSUE_WANTED}
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
                                        <Message originObject={issue} originTable={TABLES.ISSUES}/>
                                    </div>
                                    <div className={"mb-5"}>
                                        {
                                            issue.description &&
                                            <p className={"lead mb-4"}>{issue.description}</p>
                                        }
                                        <h2>{issue?.titles?.name}</h2>
                                        <p className={"mb-4"}>{issue?.titles?.description}</p>
                                        <h2>{issue?.publishers?.name}</h2>
                                        <div className={"mb-4"}>
                                            <p className={"mb-4"}>{issue?.publishers?.description}</p>
                                            <h2>{LABELS.COMMON.LINKS}</h2>
                                            {
                                                issue?.titles?.wiki_url &&
                                                <a className={"d-block"} href={issue?.titles?.wiki_url} target={"_blank"} rel={"noreferrer"}>
                                                    {LABELS_AND_HEADINGS.SERIEWIKIN_FOR} {issue?.titles?.name}
                                                    <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                                </a>
                                            }
                                            {
                                                issue?.titles?.comics_org_url &&
                                                <a className={"d-block"} href={issue?.titles?.comics_org_url} target={"_blank"} rel={"noreferrer"}>
                                                    {issue?.titles?.name} {LABELS_AND_HEADINGS.ON_COMICS_ORG}
                                                    <Icon icon={faArrowUpRightFromSquare} className={"ms-2"}/>
                                                </a>
                                            }
                                        </div>
                                        {
                                            issue.source && issue.source !== "" &&
                                            <Sources issue={issue}/>
                                        }
                                    </div>
                                    {
                                        !!issue?.titles?.is_valued && issue.grade_values && !!issue.grade_values.length &&
                                        <div className={"sms-section--light section--grade mb-4"}>
                                            <h2>{LABELS.SECTIONS.GRADES.GRADE_VALUE}</h2>
                                            <table className={"table table-sm table-responsive table-striped mb-0 mt-3"}>
                                                <caption>
                                                    <p className={"mb-0"}>{LABELS_AND_HEADINGS.GRADE_VALUES_FOR} {displayName}</p>
                                                    <SeriekatalogenTitleLink titleName={issue?.titles?.name}/>
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
                                                        label={LABELS.SECTIONS.GRADES.ADD_GRADE}/>
                                        </div>
                                    }
                                </div>
                            </>
                    }
                </div>
            </main>
        )
        :
        <NoMatch/>
}
