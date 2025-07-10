import React from "react";
import {Breadcrumbs} from "../minis/Breadcrumbs";
import {BackButton} from "../minis/BackButton.jsx";

export const HeadingWithBreadCrumbs = ({text, doIgnoreName, bcName}) => {
    return (
        <div className={"col-12"}>
            <div className={"d-flex justify-content-between align-items-center mb-5"}>
                <Breadcrumbs doIgnoreName={doIgnoreName} bcName={bcName}/>
                <BackButton/>
            </div>
            <div className={"col-12 col-lg-10 col-xl-8"}>
                <h1>{text}</h1>
            </div>
        </div>
    )
}
