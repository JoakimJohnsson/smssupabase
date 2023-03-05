import React from "react";
import {AdminTools} from "./AdminTools";
import {UserTools} from "./UserTools";


export const ListToolBox = ({item, name, displayName, data, setData, showAdminInfo, route, table, imageBucket, isTitle, isIssue}) => {

    return showAdminInfo ?
        <AdminTools item={item} name={name} displayName={displayName} data={data} setData={setData} route={route} table={table}
                    imageBucket={imageBucket}/>
        :
        isTitle || isIssue ?
            <UserTools item={item} displayName={displayName} isTitle={isTitle}/>
            :
            <></>
}
