import React from "react";
import {
    Icon,
    statusIconActive,
    statusIconInactive,
    statusIconRead,
    statusIconTodo,
    statusIconUnRead
} from "../icons/Icons.jsx";


export const StatusIcon = ({isGlobal, statusId, size}) => {

    switch (statusId) {
        case 0:
            if (isGlobal) {
                return (<Icon icon={statusIconInactive} className={`me-2 fa-fw text-black--lightest ${size}`}/>);
            } else {
                return (<Icon icon={statusIconUnRead} className={`me-2 fa-fw text-danger ${size}`}/>);
            }
        case 1:
            if (isGlobal) {
                return (<Icon icon={statusIconActive} className={`me-2 fa-fw text-white ${size}`}/>);
            } else {
                return (<Icon icon={statusIconRead} className={`me-2 fa-fw text-success ${size}`}/>);
            }
        case 2:
            return (<Icon icon={statusIconTodo} className={`me-2 fa-fw text-title ${size}`}/>);
        default:
            return false;
    }
}
