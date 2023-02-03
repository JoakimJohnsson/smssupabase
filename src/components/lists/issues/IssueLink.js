import React, {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getNameByTableAndId} from "../../serviceFunctions";
import {TABLES} from "../../../helpers/constants";
import {Spinner} from "../../minis/Spinner";


export const IssueLink = ({showAdminInfo, issue, title}) => {

    const [titleName, setTitleName] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTitleName = useCallback(() => {
        getNameByTableAndId(TABLES.TITLES, issue.title_id, setTitleName).then(() => setLoading(false));
    }, [issue]);

    useEffect(() => {
        if (!title) {
            fetchTitleName();
        } else {
            setTitleName(title.name)
            setLoading(false);
        }
    }, [title, fetchTitleName])

    return loading ? (<Spinner/>) :  (
        <Link to={showAdminInfo ? `/admin/issues/${issue.id}` : `/issues/${issue.id}`}
              className={"me-3"}>
                {titleName} #{issue.number} {issue.year}
        </Link>
    )
}
