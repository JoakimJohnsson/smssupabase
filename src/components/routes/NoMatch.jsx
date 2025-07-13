import React, {useEffect, useState} from "react";
import {CONFIG} from "../../helpers/constants/configConstants";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {NoRouteAvailable} from "../minis/NoRouteAvailable";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {PageMainContent} from "../pages/pagecomponents/PageMainContent.jsx";


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
        <PageMainContent heading={LABELS.COMMON.STATUS_404}>
            <NoRouteAvailable/>
        </PageMainContent>
}
