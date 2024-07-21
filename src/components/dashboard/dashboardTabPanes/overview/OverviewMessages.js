import React from "react";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {useAppContext} from "../../../../context/AppContext";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {SimpleMessagesList} from "../../../message/SimpleMessagesList";


export const OverviewMessages = () => {

    const {userMessages, setUserMessages} = useAppContext();

    return (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.DASHBOARD.OVERVIEW.INCOMING_MESSAGES}</h2>
                {
                    userMessages && userMessages.length ?
                        <SimpleMessagesList messagesData={userMessages} setMessagesData={setUserMessages}/>
                        :
                        <NoDataAvailable/>
                }
            </div>
        </div>
    )
}
