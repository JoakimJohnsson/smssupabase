import React, {} from "react";
import {HeadingWithBreadCrumbs} from "../../headings";
import {SearchAndFilterTest} from "./SearchAndFilterTest.jsx";
import {UtilsTest} from "./UtilsTest.jsx";

export const Home = () => {
    return (
        <main id="main-content" className={"container-fluid main-container dashboard"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={"Test publikationer DiVA JS"}/>
                </div>
                <SearchAndFilterTest/>
                <UtilsTest/>
            </div>
        </main>
    )
}
