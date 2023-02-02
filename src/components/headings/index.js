import React from "react";
import {Breadcrumbs} from "../minis/Breadcrumbs";

export const HeadingWithBreadCrumbs = ({text}) => {
    return (
        <>
            <h1>{text}</h1>
            <Breadcrumbs/>
        </>
    )
}
