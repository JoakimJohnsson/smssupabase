import {useState, useCallback, useEffect} from "react";
import {getIssueWithPublisherAndTitle} from "../../services/issueService";


export const useIssueData = (id, withFetchAndSetIssue = false) => {

    const [issue, setIssue] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(() => {
        getIssueWithPublisherAndTitle(setIssue, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (withFetchAndSetIssue) {
        return {
            issue,
            setIssue,
            loading,
            fetchData
        };
    } else {
        return {
            issue,
            loading
        };
    }
}
