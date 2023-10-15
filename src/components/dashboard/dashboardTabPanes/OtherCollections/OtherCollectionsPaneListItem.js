import React, {useEffect, useState} from "react";
import {getTitlesForUser, getTotalIssuesCountForTitlesData} from "../../../../helpers/functions/serviceFunctions/titleFunctions";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {getRowCountByTableAndUserId} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {PANES, STATISTICS, TABLES} from "../../../../helpers/constants";
import {ProgressBar} from "react-bootstrap";


export const OtherCollectionsPaneListItem = ({user}) => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [totalIssuesCountForCollection, setTotalIssuesCountForCollection] = useState(null);
    const [userIssuesCount, setUserIssuesCount] = useState(null);
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        getTitlesForUser(user.id, setTitlesData).then(() => setLoading(false));
    }, [user.id])

    useEffect(() => {
        getRowCountByTableAndUserId(TABLES.USERS_ISSUES, user.id, setUserIssuesCount).then();
    }, [user.id]);

    useEffect(() => {
        if (titlesData) {
            let totalCount;
            totalCount = getTotalIssuesCountForTitlesData(titlesData);
            if (totalCount) {
                setTotalIssuesCountForCollection(totalCount);
            }
        }
    }, [titlesData]);

    useEffect(() => {
        if (totalIssuesCountForCollection) {
            setProgress(Math.round(userIssuesCount / totalIssuesCountForCollection * 100));
        }
    }, [totalIssuesCountForCollection, userIssuesCount]);

    return loading ?
        <CustomSpinner/>
        :
        <li className={"sms-section--light mb-3"}>
            <h2>{user.firstname + " " + user.lastname}</h2>
            <p>
                {PANES.OTHER_COLLECTIONS.COLLECTING} {titlesData.length} / {STATISTICS.TOTAL_TITLES_COUNT} {PANES.OTHER_COLLECTIONS.TITLES}.
            </p>
            {
                progress &&
                progress === 100 ?
                    <ProgressBar striped variant="success" now={progress}/>
                    :
                    <ProgressBar striped now={progress} label={progress > 20 ? progress + PANES.OTHER_COLLECTIONS.COMPLETE : ""}/>
            }
        </li>
}
