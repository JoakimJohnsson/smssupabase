import React from "react";


export const PageSectionLight = ({children}) => {
    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light h-100"}>
                {children}
            </div>
        </div>
    )
}
