import {useCallback, useEffect, useMemo, useState} from "react";
import {
    checkIfIsCollectingIssue,
    checkIfIsUpgradingIssue,
    checkIfIsWantingIssue,
    getGradesByUserIdAndIssueId
} from "../../services/collectingService";
import {doesUserCollectTitle} from "../databaseFunctions";


export const useCollectingStatus = (userId, issueId, titleId) => {

    const [isCollectingIssue, setIsCollectingIssue] = useState(false);
    const [isCollectingTitle, setIsCollectingTitle] = useState(false);
    const [isWantingIssue, setIsWantingIssue] = useState(false);
    const [isUpgradingIssue, setIsUpgradingIssue] = useState(false);
    const [grades, setGrades] = useState([]);

    const fetchGrades = useCallback(() => {
        if (userId && issueId) {
            getGradesByUserIdAndIssueId(userId, issueId, setGrades).then();
        }
    }, [issueId, userId]);

    useEffect(() => {
        fetchGrades();
        // Reset value before checking
        setIsCollectingIssue(false);
        if (userId && issueId) {
            checkIfIsCollectingIssue(userId, issueId, setIsCollectingIssue).then();
        }
    }, [userId, issueId, fetchGrades]);

    useEffect(() => {
        // Reset value before checking
        setIsWantingIssue(false);
        if (userId && issueId) {
            checkIfIsWantingIssue(userId, issueId, setIsWantingIssue).then();
        }
    }, [userId, issueId]);

    useEffect(() => {
        // Reset value before checking
        setIsUpgradingIssue(false);
        if (userId && issueId) {
            checkIfIsUpgradingIssue(userId, issueId, setIsUpgradingIssue).then();
        }
    }, [userId, issueId]);

    useEffect(() => {
        const checkCollectingTitleStatus = async () => {
            if (userId && titleId) {
                try {
                    const response = await doesUserCollectTitle(userId, titleId);
                    const isSuccess = response?.data === true || response === true;
                    setIsCollectingTitle(isSuccess);
                } catch (error) {
                    console.error(error);
                    setIsCollectingTitle(false);
                }
            }
        };
        checkCollectingTitleStatus().then();
    }, [userId, titleId]);

    // By wrapping the return object with useMemo and specifying its dependencies,
    // React will only recompute the memoized value when one of these dependencies changes.
    return useMemo(() => ({
        isCollectingIssue,
        setIsCollectingIssue,
        isWantingIssue,
        setIsWantingIssue,
        isUpgradingIssue,
        setIsUpgradingIssue,
        grades,
        isCollectingTitle,
        setIsCollectingTitle,
        fetchGrades
    }), [isCollectingIssue, isWantingIssue, isUpgradingIssue, grades, isCollectingTitle, fetchGrades]);
}
