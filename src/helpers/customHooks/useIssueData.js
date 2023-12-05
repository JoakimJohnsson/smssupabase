import {useState, useCallback, useEffect} from "react";
import {getIssueDataWithPublisherAndTitle} from "../../services/serviceFunctions";


export const useIssueData = (id, withFetchAndSetIssue = false) => {

    const [issue, setIssue] = useState({});
    const [loading, setLoading] = useState(true);


    const fetchData = useCallback(() => {
        getIssueDataWithPublisherAndTitle(setIssue, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    if (withFetchAndSetIssue) {
        return [
            issue,
            setIssue,
            loading,
            fetchData
        ];

    } else {
        return [
            issue,
            loading
        ];

    }


}
