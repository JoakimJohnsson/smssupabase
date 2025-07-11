import React, {useEffect, useState} from "react";
import {HeadingWithBreadcrumbs} from "../headings/HeadingWithBreadcrumbs.jsx";
import {CONFIG} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {NoRouteAvailable} from "../minis/NoRouteAvailable";
import {OverlaySpinner} from "../minis/OverlaySpinner";


export const NoMatch = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, CONFIG.TIMEOUT_XXL);
        return () => clearTimeout(timer);
    }, []);

    return loading ?
        <OverlaySpinner/>
        :
        <div className={"sms-page-col"}>
            <HeadingWithBreadcrumbs text={LABELS.COMMON.STATUS_404}/>
            <NoRouteAvailable/>
        </div>
}
