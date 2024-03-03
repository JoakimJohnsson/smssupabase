import React, {useState, useEffect} from "react";
import {PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import {OverviewTitles} from "./OverviewTitles";
import {OverviewIssues} from "./OverviewIssues";
import {OverviewUpgradeIssues} from "./OverviewUpgradeIssues";
import {OverviewWantedIssues} from "./OverviewWantedIssues";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {OverviewValuation} from "./OverviewValuation";


export const OverviewPane = () => {

    const {user} = useAppContext();
    const [userTitlesData, setUserTitlesData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getTitlesForUser(user.id, setUserTitlesData).then(() => setLoading(false));
        }
    }, [user]);

    return (
        <>
            <HeadingWithBreadCrumbs text={PANES.OVERVIEW.NAME}/>
            {
                loading ?
                    <CustomSpinner size={"4x"}/>
                    :
                    <>
                        <OverviewTitles titlesData={userTitlesData}/>
                        <OverviewIssues titlesData={userTitlesData}/>
                        <OverviewValuation titlesData={userTitlesData}/>
                        <OverviewWantedIssues/>
                        <OverviewUpgradeIssues/>
                    </>
            }
        </>
    )
}
