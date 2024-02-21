import {useState, useEffect} from "react";
import {
    checkIfIsCollectingIssue,
    checkIfIsUpgradingIssue,
    checkIfIsWantingIssue,
    getGradesByUserIdAndIssueId
} from "../../services/collectingService";
import {doesUserCollectTitle} from "../databaseFunctions";


// TODO Använd denna istället för use is coll issue och title


export const useCollectingStatus = (userId, issueId, titleId) => {

    const [isCollectingIssue, setIsCollectingIssue] = useState(false);
    const [isCollectingTitle, setIsCollectingTitle] = useState(false);

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

    useEffect(() => {
        const checkCollectingTitleStatus = async () => {
            if (userId && titleId) {
                const response = await doesUserCollectTitle(userId, titleId);
                const isSuccess = response?.data === true || response === true;
                setIsCollectingTitle(isSuccess);
            }
        };
        checkCollectingTitleStatus().then();
    }, [userId, titleId]);

    return {
        isCollectingIssue,
        setIsCollectingIssue,
        isWantingIssue,
        setIsWantingIssue,
        isUpgradingIssue,
        setIsUpgradingIssue,
        grades,
        isCollectingTitle,
        setIsCollectingTitle
    };
}
