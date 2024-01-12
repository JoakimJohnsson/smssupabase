import {useState, useEffect} from "react";
import {
    checkIfIsCollectingIssue,
    checkIfIsUpgradingIssue,
    checkIfIsWantingIssue,
    getGradesByUserIdAndIssueId
} from "../../services/collectingService";


export const useIsCollectingIssue = (userId, issueId) => {

    const [isCollectingIssue, setIsCollectingIssue] = useState(false);
    const [isWantingIssue, setIsWantingIssue] = useState(false);
    const [isUpgradingIssue, setIsUpgradingIssue] = useState(false);
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        // Reset value before checking
        setIsCollectingIssue(false);
        if (userId && issueId) {
            checkIfIsCollectingIssue(userId, issueId, setIsCollectingIssue).then();
        }
    }, [userId, issueId]);

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
        if (userId && issueId) {
            getGradesByUserIdAndIssueId(userId, issueId, setGrades).then();
        }
    }, [userId, issueId]);

        return {
            isCollectingIssue,
            setIsCollectingIssue,
            isWantingIssue,
            setIsWantingIssue,
            isUpgradingIssue,
            setIsUpgradingIssue,
            grades
        };
}
