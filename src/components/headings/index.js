import React from "react";
import {Breadcrumbs} from "../minis/Breadcrumbs";

export const HeadingWithBreadCrumbs = ({text, doIgnoreName}) => {
    return (
        <>
            <h1>{text}</h1>
            <Breadcrumbs doIgnoreName={doIgnoreName}/>
        </>
    )
}
