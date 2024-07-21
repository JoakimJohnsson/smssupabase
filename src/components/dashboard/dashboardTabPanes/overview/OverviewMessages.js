import React from "react";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {useAppContext} from "../../../../context/AppContext";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";


export const OverviewMessages = () => {

    const {userMessages} = useAppContext();

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.DASHBOARD.OVERVIEW.INCOMING_MESSAGES}</h2>

                {
                    userMessages && userMessages.length ?
                        <ul className={"list-unstyled"}>
                            {
                                userMessages.map((message) => {
                                    return (
                                        <li key={message.id}>
                                            <p>{message.id}</p>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        :
                        <NoDataAvailable/>

                }


            </div>
        </div>
    )
}
