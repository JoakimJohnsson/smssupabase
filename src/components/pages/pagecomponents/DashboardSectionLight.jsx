import React from "react";


export const DashboardSectionLight = ({children}) => {
    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light h-100"}>
                {children}
            </div>
        </div>
    )
}
