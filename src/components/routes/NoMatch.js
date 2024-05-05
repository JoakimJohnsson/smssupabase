import React, {useEffect, useState} from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {CONFIG, LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";
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
                    <div className={"row row-padding--main"}>
                        <OverlaySpinner/>
                    </div>
                    :
                    <main id="main-content" className={"container-fluid main-container"}>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
                                <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.STATUS_404}/>
                                <NoRouteAvailable/>
                            </div>
                        </div>
                    </main>
            }
        </>
    )
}
