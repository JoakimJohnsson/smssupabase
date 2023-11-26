import React from "react";
import {Icon} from "../../icons";
import {faEye, faEyeSlash} from "@fortawesome/pro-regular-svg-icons";


export const StatusIcon = ({statusId}) => {
    switch (statusId) {
        case 0:
            return (<Icon icon={faEyeSlash} className={"me-2 fa-fw text-danger"}/>);
        case 1:
            return (<Icon icon={faEye} className={"me-2 fa-fw text-success"}/>);
        case 2:
            return (<Icon icon={faEye} className={"me-2 fa-fw text-danger--lighter"}/>);
        default:
            return false;
    }
}
