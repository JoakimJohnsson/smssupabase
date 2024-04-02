import React from "react";
import {TEXTS} from "../../helpers/constants/configConstants";
import {faDoNotEnter} from "@fortawesome/pro-duotone-svg-icons";
import {Icon} from "../icons";
import useBreadcrumbs from "use-react-router-breadcrumbs";


export const NoRouteAvailable = () => {

    const breadcrumbs = useBreadcrumbs();
    const pathname = breadcrumbs[breadcrumbs.length -1].location.pathname;

    return (
        <div className={"d-flex align-items-center py-2 mb-3"}>
            <Icon icon={faDoNotEnter} className={"fa-2xl fa-beat me-3"}/>
            <span className={"py-2 px-3 border fa-fade"}>{TEXTS.STATUS_404_ROUTE} {pathname}.</span>
        </div>
    )
}
