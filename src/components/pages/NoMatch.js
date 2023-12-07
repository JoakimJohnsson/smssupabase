import React from "react";
import {HeadingWithBreadCrumbs} from "../headings";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {NoRouteAvailable} from "../minis/NoRouteAvailable";


export const NoMatch = () => {

    return (
        <>
            <main id="main-content" className={"container-fluid main-container"}>
                <div className={"row row-padding--main"}>
                    <div className={"sms-page-col--full"}>
                        <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.STATUS_404}/>
                        <NoRouteAvailable/>
                    </div>
                </div>
            </main>
        </>
    )
}
