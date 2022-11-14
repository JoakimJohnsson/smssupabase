import React from "react";
import {AdminIcon} from "../icons";
import {Breadcrumbs} from "../minis/Breadcrumbs";


export const AdminH1 = ({text}) => {

    return (
        <>
            <h1 className={"text-icon-header"}><AdminIcon textVariant={"xl"}/><span>{text}</span></h1>
            <Breadcrumbs/>
        </>
    )
}
