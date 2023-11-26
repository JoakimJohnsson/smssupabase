import React from "react";
import {StatusIconRead, StatusIconTodo, StatusIconUnRead} from "../../icons";


export const StatusIcon = ({statusId}) => {
    switch (statusId) {
        case 0:
            return (<StatusIconUnRead className={"me-2 fa-fw text-danger"}/>);
        case 1:
            return (<StatusIconRead className={"me-2 fa-fw text-success"}/>);
        case 2:
            return (<StatusIconTodo className={"me-2 fa-fw text-danger--lighter"}/>);
        default:
            return false;
    }
}
