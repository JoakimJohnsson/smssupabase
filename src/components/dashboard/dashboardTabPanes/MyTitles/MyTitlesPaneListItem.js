import React, {useState, useCallback, useEffect} from "react";
import {Link} from "react-router-dom";
import {PieChart, Pie, ResponsiveContainer, Cell} from "recharts";
import {useAppContext} from "../../../../context/AppContext";
import {getTitleProgressForUser} from "../../../../helpers/functions";
import {FormatBadge} from "../../../minis/FormatBadge";
import {getIssuesByTitleId} from "../../../../services/issueService";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../../helpers/constants";
import {checkGradingStatus} from "../../../../services/collectingService";
import {Icon, gradingIconDuoTone, infoIconDuoTone, statusIconFailDuoTone, statusIconSuccessDuoTone} from "../../../icons";


export const MyTitlesPaneListItem = ({title}) => {

    const {user} = useAppContext();
    const [titleProgress, setTitleProgress] = useState({});
    const [progressData, setProgressData] = useState([]);
    const [completed, setCompleted] = useState(false);
    const [gradingStatusOpen, setGradingStatusOpen] = useState(false);
    const [issuesData, setIssuesData] = useState({});
    const [loadingGradingStatus, setLoadingGradingStatus] = useState(false);
    const [issueNeedsGrading, setIssueNeedsGrading] = useState(false);

    const fetchIssuesData = useCallback(() => {
        getIssuesByTitleId(setIssuesData, title.id).then(() => setLoadingGradingStatus(false));
    }, [title.id]);

    const fetchTitleProgress = useCallback(async () => {
        setTitleProgress(await getTitleProgressForUser(title, user.id))
    }, [title, user.id]);

    useEffect(() => {
        fetchTitleProgress().then();
    }, [fetchTitleProgress]);

    useEffect(() => {
        if (titleProgress) {
            setProgressData([
                {name: 'A', value: titleProgress.noCollectedIssues, color: "#ffd700"},
                {name: 'B', value: titleProgress.noMissingIssues, color: "#999"}
            ]);
            setCompleted((titleProgress.noCollectedIssues === titleProgress.totalIssues));
        }
    }, [titleProgress]);

    useEffect(() => {
        fetchIssuesData();
    }, [fetchIssuesData]);

    const setFillColor = (color) => {
        if (completed) {
            return "#33cc99"
        } else {
            return color;
        }
    }

    const handleCheckGradingStatus = () => {
        setGradingStatusOpen(!gradingStatusOpen);
        setLoadingGradingStatus(true);
        checkGradingStatus(issuesData, user.id, setIssueNeedsGrading).then(() => setLoadingGradingStatus(false));
    }

    return (
        <li className={"title-card"}>
            <div className={"bg-horse border"}>
                <div className={"row p-0 p-sm-3"}>
                    <div className={"col-12 col-md-6 col-lg-12 col-xl-5"}>
                        <Link to={`/titles/${title.id}`} className={"hocus-standard"}
                              title={title.name}>
                            <div className={"image-container mb-2 position-relative"}>
                                <img
                                    src={title.image_url}
                                    alt={title.name}
                                    className="w-100"
                                    loading={"lazy"}
                                />
                            </div>
                            <h2 className={"p-2 p-sm-0 mb-3"}>{title.name}</h2>
                        </Link>
                        <div className={"p-2 p-sm-0"}>
                            <span
                                className={`tag-badge text-black mb-3 ${completed ? "bg-success" : "bg-grade"}`}>{titleProgress.progress + "%"}</span>
                            <FormatBadge formatId={title.format_id} customClass={"mb-3"} year={title.start_year}/>
                        </div>
                    </div>
                    <div className={"col-12 col-md-6 col-lg-12 col-xl-7"}>
                        <div className={"p-2 h-100"}>
                            <ResponsiveContainer width="100%" minHeight={"225px"}>
                                <PieChart>
                                    <defs>
                                        <pattern id="pattern-A" width="2" height="2" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                                            <rect width="2" height="4" fill="#ffd700"/>
                                        </pattern>
                                        <pattern id="pattern-B" width="1" height="1" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                                            <rect width="1" height="1" fill="#141a1b"/>
                                        </pattern>
                                    </defs>
                                    <Pie
                                        dataKey="value"
                                        data={progressData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={80}
                                        stroke="none"
                                        label={true}
                                    >
                                        {
                                            progressData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={setFillColor(`url(#pattern-${entry.name})`)}/>
                                            ))
                                        }
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className={"col-12 col-md-8 col-lg-12 col-xl-6 col-xxl-12"}>
                        <div className={"p-3 p-sm-0"}>
                            {
                                gradingStatusOpen ?
                                    <>
                                        {
                                            loadingGradingStatus ?
                                                <div className={"text-center"}>
                                                    <CustomSpinner size={"2x"}/>
                                                </div>
                                                :
                                                <>
                                                    {
                                                        issueNeedsGrading ?
                                                            <p className={"alert alert-danger d-flex align-items-center m-0"}>
                                                                <Icon icon={statusIconFailDuoTone} className={"me-3"} size={"2x"}/>
                                                                {TEXTS.GRADE_MISSING}
                                                            </p>
                                                            :
                                                            <p className={"alert alert-success d-flex align-items-center m-0"}>
                                                                <Icon icon={statusIconSuccessDuoTone} className={"me-3"} size={"2x"}/>
                                                                {TEXTS.GRADE_FOUND}
                                                            </p>
                                                    }
                                                </>
                                        }
                                    </>
                                    :
                                    <>

                                        {
                                            !!titleProgress.progress ?
                                                <button onClick={() => handleCheckGradingStatus()}
                                                        className={"btn btn-outline-primary p-3 rounded-2 w-100 d-flex align-items-center text-start"}>
                                                    <Icon icon={gradingIconDuoTone} className={"me-2"} size={"2x"}/>
                                                    <span className={"mx-3"}>
                                                        {
                                                            LABELS_AND_HEADINGS.COLLECTING_CHECK_GRADING_STATUS_OPEN_1 +
                                                            ` ${title.name} ` +
                                                            LABELS_AND_HEADINGS.COLLECTING_CHECK_GRADING_STATUS_OPEN_2
                                                        }
                                                    </span>
                                                </button>
                                                :
                                                <p className={"alert alert-info d-flex align-items-center m-0"}>
                                                    <Icon icon={infoIconDuoTone} className={"me-3"} size={"2x"}/>
                                                    {LABELS_AND_HEADINGS.COLLECTING_CHECK_GRADING_STATUS_NO_ISSUES}
                                                </p>
                                        }
                                    </>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </li>
    )
}
