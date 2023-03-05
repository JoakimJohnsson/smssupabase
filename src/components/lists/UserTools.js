import React from "react";
import {TitleTool} from "./TitleTool";
import {IssueTool} from "./IssueTool";


export const UserTools = ({item, displayName, isTitle}) => {

    return (
        <div className={"d-inline-block text-end"}>
            {
                isTitle ?
                    <TitleTool item={item} displayName={displayName}/>
                    :
                    <IssueTool displayName={displayName}/>
            }
        </div>
    )
}
