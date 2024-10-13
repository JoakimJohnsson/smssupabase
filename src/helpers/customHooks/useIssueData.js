import {useState, useCallback, useEffect} from "react";
import {getIssueWithPublisherAndTitle} from "../../services/issueService";


export const useIssueData = (id, withFetchAndSetIssue = false) => {

    const [issue, setIssue] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            await getIssueWithPublisherAndTitle(setIssue, id);
        } catch (error) {
            console.error('Failed to fetch issue data:', error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchData(); // Ignoring Promise
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
};
