import {useState, useEffect} from "react";
import {getIssueName} from "../functions";


export const useIssueDisplayName = (issue) => {

    const [displayName, setDisplayName] = useState("");

    useEffect(() => {
        if (issue) {
            setDisplayName(getIssueName(issue));
        }
    }, [issue])

    return [
        displayName
    ];
}
