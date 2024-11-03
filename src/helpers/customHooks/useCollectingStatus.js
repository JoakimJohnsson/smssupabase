import {useCallback, useEffect, useMemo, useState} from "react";
import {
    checkIfIsCollectingIssue,
    getGradesByUserIdAndIssueId
} from "../../services/collectingService";
import {doesUserCollectTitle} from "../databaseFunctions";
import {TABLES} from "../constants/serviceConstants.js";
import {userIssueExists} from "../../services/serviceFunctions.js";


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

    useEffect( () => {
        // Reset values before checking
        setIsWantingIssue(false);
        setIsUpgradingIssue(false);
        const checkIssues = async () => {
            if (userId && issueId) {
                const wantedIssueExists = await userIssueExists(userId, issueId, TABLES.USERS_ISSUES_WANTED);
                const upgradeIssueExists = await userIssueExists(userId, issueId, TABLES.USERS_ISSUES_UPGRADE);
                setIsWantingIssue(wantedIssueExists);
                setIsUpgradingIssue(upgradeIssueExists);
            }
        };
        checkIssues();
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
