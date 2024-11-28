import React from "react";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {useAppContext} from "../../../../context/AppContext";
import {SimpleMessagesList} from "../../../message/SimpleMessagesList";


export const OverviewMessages = () => {

    const {userMessages, setUserMessages} = useAppContext();

    return userMessages && !!userMessages.length && (
        <div className={"sms-dashboard-col--sm"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.DASHBOARD.OVERVIEW.INCOMING_MESSAGES}</h2>
                <SimpleMessagesList messagesData={userMessages} setMessagesData={setUserMessages}/>
            </div>
        </div>
    )
}
