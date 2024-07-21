import React from "react";
import {AdvancedTools} from "./AdvancedTools";
import {UserTools} from "./UserTools";


export const ListToolBox = ({
                                item,
                                name,
                                displayName,
                                data,
                                setData,
                                showAdvancedTools,
                                route,
                                table,
                                imageBucket = false,
                                isTitle,
                                fetchTitleProgress,
                                isIssue,
                                isCollectingIssue,
                                setIsCollectingIssue,
                                showEditButton = true
                            }) => {

    return showAdvancedTools ?
        <AdvancedTools item={item} name={name} displayName={displayName} data={data} setData={setData} route={route} table={table}
                       imageBucket={imageBucket} showEditButton={showEditButton}/>
        :
        isTitle || isIssue ?
            <UserTools item={item} displayName={displayName} isTitle={isTitle} fetchTitleProgress={fetchTitleProgress}
                       isCollectingIssue={isCollectingIssue} setIsCollectingIssue={setIsCollectingIssue}/>
            :
            <></>
}
