import {useState, useEffect} from "react";
import {checkIfIsCollectingIssue} from "../functions/serviceFunctions/collectFunctions";


export const useIsCollectingIssue = (userId, issueId) => {

    const [isCollectingIssue, setIsCollectingIssue] = useState(false);

    useEffect(() => {
        // Reset value before checking
        setIsCollectingIssue(false);
        if (userId && issueId) {
            checkIfIsCollectingIssue(userId, issueId, setIsCollectingIssue).then();
        }
    }, [userId, issueId])

        return [
            isCollectingIssue,
            setIsCollectingIssue
        ];
}
