import React from "react";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {useAppContext} from "../../../../context/AppContext";
import {SimpleMessagesList} from "../../../message/SimpleMessagesList";
import {DashboardSectionLight} from "../../../pages/pagecomponents/DashboardSectionLight.jsx";


export const OverviewMessages = () => {

    const {userMessages, setUserMessages} = useAppContext();

    return userMessages && !!userMessages.length && (
        <DashboardSectionLight>
            <h2>{LABELS.SECTIONS.DASHBOARD.OVERVIEW.INCOMING_MESSAGES}</h2>
            <SimpleMessagesList messagesData={userMessages} setMessagesData={setUserMessages}/>
        </DashboardSectionLight>
    )
}
