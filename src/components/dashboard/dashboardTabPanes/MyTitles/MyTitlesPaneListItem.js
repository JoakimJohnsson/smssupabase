import React, {useState, useCallback, useEffect} from "react";
import {useAppContext} from "../../../../context/AppContext";
import {getTitleProgressForUser} from "../../../../helpers/functions";
import {MyTitlesPaneListItemProgress} from "./MyTitlesPaneListItemProgress";
import {MyTitlesPaneListItemImage} from "./MyTitlesPaneListItemImage";
import {MyTitlesPaneListItemTitle} from "./MyTitlesPaneListItemTitle";
import {MyTitlesPaneListItemInfoColumn} from "./MyTitlesPaneListItemInfoColumn";
import {MyTitlesPaneListItemFunctionsColumn} from "./MyTitlesPaneListItemFunctionsColumn";


export const MyTitlesPaneListItem = ({title}) => {

    const {user} = useAppContext();
    const [titleProgress, setTitleProgress] = useState({});
    const [completed, setCompleted] = useState(false);

    let collectTextParts = titleProgress.noCollectedIssues + " / " + titleProgress.totalIssues;

    const fetchTitleProgress = useCallback(async () => {
        setTitleProgress(await getTitleProgressForUser(title, user.id))
    }, [title, user.id]);

    useEffect(() => {
        fetchTitleProgress().then();
    }, [fetchTitleProgress]);

    useEffect(() => {
        if (titleProgress) {
            setCompleted((titleProgress.noCollectedIssues === titleProgress.totalIssues));
        }
    }, [titleProgress]);

    return (
        <li className={"title-card"}>
            <div className={"row"}>
                <MyTitlesPaneListItemTitle title={title}/>
                <MyTitlesPaneListItemImage title={title}/>
                <MyTitlesPaneListItemProgress titleProgress={titleProgress} collectTextParts={collectTextParts}/>
                <div className={"col-12 "}>
                    <div className={"bg-horse"}>
                        <div className={"row"}>
                            <MyTitlesPaneListItemInfoColumn title={title} completed={completed} titleProgress={titleProgress}/>
                            <MyTitlesPaneListItemFunctionsColumn title={title} user={user} titleProgress={titleProgress}/>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
