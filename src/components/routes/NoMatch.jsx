import React, {useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
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

    return (
        <>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <main id="main-content" className={"main-container"}>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
                                <HeadingWithBreadCrumbs text={LABELS.COMMON.STATUS_404}/>
                                <NoRouteAvailable/>
                            </div>
                        </div>
                    </main>
            }
        </>
    )
}
