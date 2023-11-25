import React from "react";
import {AdminTools} from "./AdminTools";
import {UserTools} from "./UserTools";


export const ListToolBox = ({
                                item,
                                name,
                                displayName,
                                data,
                                setData,
                                showAdminInfo,
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

    return showAdminInfo ?
        <AdminTools item={item} name={name} displayName={displayName} data={data} setData={setData} route={route} table={table}
                    imageBucket={imageBucket} showEditButton={showEditButton}/>
        :
        isTitle || isIssue ?
            <UserTools item={item} displayName={displayName} isTitle={isTitle} fetchTitleProgress={fetchTitleProgress}
                       isCollectingIssue={isCollectingIssue} setIsCollectingIssue={setIsCollectingIssue}/>
            :
            <></>
}
