import React from "react";
import {TitleTool} from "./TitleTool";
import {IssueTool} from "./IssueTool";


export const UserTools = ({item, displayName, isTitle, fetchTitleProgress, isCollectingIssue, setIsCollectingIssue}) => {

    return (
        <div className={"d-inline-block text-end"}>
            {
                isTitle ?
                    <TitleTool title={item} displayName={displayName}/>
                    :
                    <IssueTool issue={item} displayName={displayName} fetchTitleProgress={fetchTitleProgress} isCollectingIssue={isCollectingIssue} setIsCollectingIssue={setIsCollectingIssue}/>
            }
        </div>
    )
}
