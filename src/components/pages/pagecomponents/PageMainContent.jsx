import React from "react";
import {HeadingWithBreadcrumbs} from "../../headings/HeadingWithBreadcrumbs.jsx";


export const PageMainContent = ({heading = "", variant = "standard", doIgnoreName = false, bcName = "", children}) => {

    let className;
    switch (variant) {
        case "row":
            className = "row";
            break;
        case "standard":
        default:
            className = "sms-page-col";
            break;
    }

    return (
        <div className={className}>
            {
                heading &&
                <HeadingWithBreadcrumbs text={heading} doIgnoreName={doIgnoreName} bcName={bcName}/>
            }
            {children}
        </div>
    )
}
