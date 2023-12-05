import React, {useState, useEffect} from "react";
import {PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import {OverviewTitles} from "./OverviewTitles";
import {OverviewIssues} from "./OverviewIssues";
import {OverviewUpgradeIssues} from "./OverviewUpgradeIssues";
import {OverviewWantedIssues} from "./OverviewWantedIssues";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesData, setUserTitlesData] = useState(null);

    useEffect(() => {
        if (user) {
            getTitlesForUser(user.id, setUserTitlesData).then();
        }
    }, [user]);

    return (
        <>
            <h1>{PANES.OVERVIEW.NAME}</h1>
            <div className={"row"}>
                <OverviewTitles titlesData={userTitlesData}/>
                <OverviewIssues titlesData={userTitlesData}/>
                <OverviewWantedIssues/>
                <OverviewUpgradeIssues/>
            </div>
        </>
    )
}
