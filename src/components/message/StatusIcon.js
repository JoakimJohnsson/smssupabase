import React from "react";
import {StatusIconRead, StatusIconTodo, StatusIconUnRead} from "../icons";


export const StatusIcon = ({statusId, size}) => {
    switch (statusId) {
        case 0:
            return (<StatusIconUnRead className={`me-2 fa-fw text-danger ${size}`}/>);
        case 1:
            return (<StatusIconRead className={`me-2 fa-fw text-success ${size}`}/>);
        case 2:
            return (<StatusIconTodo className={`me-2 fa-fw text-title ${size}`}/>);
        default:
            return false;
    }
}
