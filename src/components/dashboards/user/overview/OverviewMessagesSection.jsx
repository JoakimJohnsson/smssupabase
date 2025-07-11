import React from "react";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {useAppContext} from "../../../../context/AppContext";
import {SimpleMessagesList} from "../../../message/SimpleMessagesList";
import {PageSectionLight} from "../../../pages/pagecomponents/PageSectionLight.jsx";


export const OverviewMessagesSection = () => {

    const {userMessages, setUserMessages} = useAppContext();

    return userMessages && !!userMessages.length && (
        <PageSectionLight>
            <h2>{LABELS.SECTIONS.DASHBOARD.OVERVIEW.INCOMING_MESSAGES}</h2>
            <SimpleMessagesList messagesData={userMessages} setMessagesData={setUserMessages}/>
        </PageSectionLight>
    )
}
