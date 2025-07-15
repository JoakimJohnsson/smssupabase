import React, {useCallback, useEffect, useState} from "react";
import {checkGradingStatus} from "../../../../services/collectingService";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {
    gradingIconDuoTone,
    Icon,
    infoIconDuoTone,
    statusIconFailDuoTone,
    statusIconSuccessDuoTone
} from "../../../icons/Icons.jsx";
import {PANES, TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {getIssuesByTitleId} from "../../../../services/issueService";
import {getTitleTotalValuesByUserAndTitle} from "../../../../helpers/databaseFunctions.js";


export const MyTitlesPaneListItemFunctionsColumn = ({title, user, titleProgress}) => {

    const [gradingStatusOpen, setGradingStatusOpen] = useState(false);
    const [issuesData, setIssuesData] = useState({});
    const [issueNeedsGrading, setIssueNeedsGrading] = useState(false);
    const [titleValue, setTitleValue] = useState(null);
    const [loadingGradingStatus, setLoadingGradingStatus] = useState(false);

    const fetchTitleValue = useCallback(async () => {
        const data = await getTitleTotalValuesByUserAndTitle(user.id, title.id);

        if (data) {
            if (data[0]?.total_value) {
                setTitleValue(data[0].total_value);
            } else {
                setTitleValue(0);
            }
        }
    }, [title, user.id]);

    const fetchIssuesData = useCallback(() => {
        getIssuesByTitleId(setIssuesData, title.id).then(() => setLoadingGradingStatus(false));
    }, [title.id]);

    const handleCheckGradingStatus = async () => {
        setGradingStatusOpen(!gradingStatusOpen);
        // No need to check grading status if tha grading status section is closed
        if (!gradingStatusOpen) {
            setLoadingGradingStatus(true);
            try {
                await checkGradingStatus(issuesData, user.id, setIssueNeedsGrading);
                fetchTitleValue();
            } finally {
                setLoadingGradingStatus(false);
            }
        }
    }

    useEffect(() => {
        fetchIssuesData();
    }, [fetchIssuesData, fetchTitleValue]);

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
                                            titleValue !== null &&
                                            <p>
                                                {PANES.TITLES.COLLECTING_VALUE_1} <span
                                                className={"text-grade"}>{titleValue}</span> kr.
                                            </p>
                                        }
                                        {
                                            issueNeedsGrading ?
                                                <p className={"alert alert-danger d-flex align-items-center m-0"}>
                                                    <Icon icon={statusIconFailDuoTone} className={"me-3"} size={"2x"}/>
                                                    {PANES.TITLES.GRADE_MISSING}
                                                </p>
                                                :
                                                <p className={"alert alert-success d-flex align-items-center m-0"}>
                                                    <Icon icon={statusIconSuccessDuoTone} className={"me-3"}
                                                          size={"2x"}/>
                                                    {PANES.TITLES.GRADE_FOUND}
                                                </p>
                                        }
                                    </>
                            }
                        </>
                        :
                        <>
                            {
                                titleProgress.progress ?
                                    <button onClick={() => handleCheckGradingStatus()}
                                            className={"btn btn-primary p-3 rounded-2 w-100 d-flex align-items-center text-start"}>
                                        <Icon icon={gradingIconDuoTone} className={"me-2"} size={"2x"}/>
                                        <span className={"mx-3"}>
                                                    {
                                                        PANES.TITLES.COLLECTING_CHECK_GRADING_STATUS_OPEN_1 +
                                                        ` ${title.name} ` +
                                                        PANES.TITLES.COLLECTING_CHECK_GRADING_STATUS_OPEN_2
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
