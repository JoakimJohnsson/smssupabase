import React from "react";
import {HeadingWithBreadcrumbs} from "../../headings/HeadingWithBreadcrumbs.jsx";


export const PageMainContent = ({heading = "", variant = "standard", doIgnoreName = false, bcName = "", children}) => {

    let className = `sms-page-col`;

    return (
        <div className={className + " " + variant}>
            {
                heading &&
                <HeadingWithBreadcrumbs text={heading} doIgnoreName={doIgnoreName} bcName={bcName}/>
            }
            {children}
        </div>
    )
}
