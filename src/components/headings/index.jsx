import React from "react";
import {Breadcrumbs} from "../minis/Breadcrumbs";

export const HeadingWithBreadCrumbs = ({text, doIgnoreName, bcName}) => {
    return (
        <div className={"col-12 col-lg-10 col-xl-8"}>
            <Breadcrumbs doIgnoreName={doIgnoreName} bcName={bcName}/>
            <h1>{text}</h1>
        </div>
    )
}
