import {useState, useCallback, useEffect} from "react";
import {TABLES} from "../constants";
import {getRowByTableAndId} from "../functions/serviceFunctions/serviceFunctions";


export const useIssueData = (id, withFetchAndSetIssue = false) => {

    const [issue, setIssue] = useState({});
    const [title, setTitle] = useState({});
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(() => {
        getRowByTableAndId(TABLES.ISSUES, setIssue, id).then(() => {
            if (issue.title_id) {
                getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => {
                    if (title.publisher_id) {
                        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, title.publisher_id).then(() => setLoading(false))
                    }
                });
            }
        });
    }, [id, issue.title_id, title.publisher_id]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    if (withFetchAndSetIssue) {
        return [
            issue,
            setIssue,
            title,
            publisher,
            loading,
            fetchData
        ];

    } else {
        return [
            issue,
            title,
            publisher,
            loading
        ];

    }


}
