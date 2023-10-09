import React, {useState, useEffect} from "react";
import {PANES, STATISTICS} from "../../../helpers/constants";
import {useAppContext} from "../../../context/AppContext";
import {getTitlesCountByUser} from "../../../helpers/functions/serviceFunctions/serviceFunctions";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesCount, setUserTitlesCount] = useState(null);

    useEffect(() => {
        if (user) {
            getTitlesCountByUser(user.id, setUserTitlesCount).then();
        }

    }, [user]);

    return (
        <div>
            <h1>{PANES.OVERVIEW.NAME}</h1>
            <p>
                {PANES.OVERVIEW.COLLECTING_1} {userTitlesCount && userTitlesCount} {PANES.OVERVIEW.COLLECTING_2} {STATISTICS.TOTAL_TITLES_COUNT} {PANES.OVERVIEW.COLLECTING_3}
            </p>
        </div>
    )
}
