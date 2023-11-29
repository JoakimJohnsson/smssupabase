import React from "react";
import {StatusIconActive, StatusIconInactive, StatusIconRead, StatusIconTodo, StatusIconUnRead} from "../icons";


export const StatusIcon = ({isGlobal, statusId, size}) => {

    switch (statusId) {
        case 0:
            if (isGlobal) {
                return (<StatusIconInactive className={`me-2 fa-fw text-white-50 ${size}`}/>);
            } else {
                return (<StatusIconUnRead className={`me-2 fa-fw text-danger ${size}`}/>);
            }
        case 1:
            if (isGlobal) {
                return (<StatusIconActive className={`me-2 fa-fw text-white ${size}`}/>);
            } else {
                return (<StatusIconRead className={`me-2 fa-fw text-success ${size}`}/>);
            }
        case 2:
            return (<StatusIconTodo className={`me-2 fa-fw text-title ${size}`}/>);
        default:
            return false;
    }
}
