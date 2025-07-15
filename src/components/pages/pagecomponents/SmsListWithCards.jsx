import React from "react";


export const SmsListWithCards = ({children}) => {
    return (
        <div className={"col-12"}>
            <ul className={"sms-list--with-cards"}>
                {children}
            </ul>
        </div>
    )
}
