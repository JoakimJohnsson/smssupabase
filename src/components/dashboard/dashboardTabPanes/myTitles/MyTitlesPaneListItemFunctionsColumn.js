import React, {useCallback, useEffect, useState} from "react";
import {checkGradingStatus} from "../../../../services/collectingService";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {gradingIconDuoTone, Icon, infoIconDuoTone, statusIconFailDuoTone, statusIconSuccessDuoTone} from "../../../icons";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../../helpers/constants/configConstants";
import {getIssuesByTitleId} from "../../../../services/issueService";


export const MyTitlesPaneListItemFunctionsColumn = ({title, user, titleProgress}) => {

    const [gradingStatusOpen, setGradingStatusOpen] = useState(false);
    const [issuesData, setIssuesData] = useState({});
    const [issueNeedsGrading, setIssueNeedsGrading] = useState(false);
    const [loadingGradingStatus, setLoadingGradingStatus] = useState(false);

    const fetchIssuesData = useCallback(() => {
        getIssuesByTitleId(setIssuesData, title.id).then(() => setLoadingGradingStatus(false));
    }, [title.id]);

    const handleCheckGradingStatus = () => {
        setGradingStatusOpen(!gradingStatusOpen);
        setLoadingGradingStatus(true);
        checkGradingStatus(issuesData, user.id, setIssueNeedsGrading).then(() => setLoadingGradingStatus(false));
    }

    useEffect(() => {
        fetchIssuesData();
    }, [fetchIssuesData]);

    return (
        <div className={"col-12"}>
            <div className={"p-3"}>
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
                                            className={"btn btn-primary p-3 rounded-2 w-100 d-flex align-items-center text-start"}>
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
                                        {TEXTS.COLLECTING_CHECK_GRADING_STATUS_NO_ISSUES}
                                    </p>
                            }
                        </>
                }
            </div>
        </div>
    )
}
