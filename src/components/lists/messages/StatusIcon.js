import React from "react";
import {EditIcon, KeyIcon, LinkIcon} from "../../icons";


export const StatusIcon = ({statusId}) => {
    switch (statusId) {
        case 0:
            return (<EditIcon className={"me-2 fa-fw text-danger"}/>);
        case 1:
            return (<LinkIcon className={"me-2 fa-fw text-success"}/>);
        case 2:
            return (<KeyIcon className={"me-2 fa-fw text-marvelklubben-0"}/>);
        default:
            return false;
    }
}
