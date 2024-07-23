import React, {useState, useCallback, useEffect} from "react";
import {useAppContext} from "../../../../context/AppContext";
import {getTitleProgressForUser} from "../../../../helpers/functions";
import {MyTitlesPaneListItemProgress} from "./MyTitlesPaneListItemProgress";
import {MyTitlesPaneListItemImage} from "./MyTitlesPaneListItemImage";
import {MyTitlesPaneListItemTitle} from "./MyTitlesPaneListItemTitle";
import {MyTitlesPaneListItemInfoColumn} from "./MyTitlesPaneListItemInfoColumn";
import {MyTitlesPaneListItemFunctionsColumn} from "./MyTitlesPaneListItemFunctionsColumn";
import {Link} from "react-router-dom";


export const MyTitlesPaneListItem = ({title}) => {

    const {user} = useAppContext();
    const [titleProgress, setTitleProgress] = useState({});
    const [completed, setCompleted] = useState(false);

    let collectTextParts = titleProgress?.noCollectedIssues + " / " + titleProgress.totalIssues;

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
            <article className={"row"}>
                <Link to={`/titles/${title.id}`} className={"hocus-standard"}
                      title={title.name}>
                    <MyTitlesPaneListItemTitle title={title}/>
                    <MyTitlesPaneListItemImage title={title}/>
                    <MyTitlesPaneListItemProgress titleProgress={titleProgress} collectTextParts={collectTextParts}/>
                </Link>
                <div className={"col-12"}>
                    <div className={"bg-dog border-bottom border-end border-start border-primary"}>
                        <div className={"row"}>
                            <MyTitlesPaneListItemInfoColumn title={title} completed={completed} titleProgress={titleProgress}/>
                            <MyTitlesPaneListItemFunctionsColumn title={title} user={user} titleProgress={titleProgress}/>
                        </div>
                    </div>
                </div>
            </article>
        </li>
    )
}
