import React, {useEffect, useState} from "react";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {Link} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../../services/serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {MessagesList} from "../../../message/MessagesList";
import {filterGlobalMessage} from "../../../../helpers/functions";


export const MessagesSection = () => {

    const [limitedMessagesData, setLimitedMessagesData] = useState(null);
    const [messages, setMessages] = useState(null);
    const [globalMessages, setGlobalMessages] = useState(null);

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.MESSAGES, "created_at", setLimitedMessagesData, 5, true).then()
    }, [])

    useEffect(() => {
        if (limitedMessagesData) {
            setMessages(limitedMessagesData.filter((m) => filterGlobalMessage(m, false)));
            setGlobalMessages(limitedMessagesData.filter((m) => filterGlobalMessage(m, true)));
        }
    }, [limitedMessagesData]);

    return (
        <div className={"sms-page-col mb-5"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS.SECTIONS.MESSAGES.MESSAGES}</h2>
                {
                    limitedMessagesData ?
                        <>
                            <p>{TEXTS.SHOWING_LATEST_MESSAGES}</p>
                            <MessagesList messagesData={messages} setMessagesData={setMessages}/>
                            <h3>{LABELS.COMMON.MESSAGES_GLOBAL}</h3>
                            <MessagesList messagesData={globalMessages} setMessagesData={setGlobalMessages}/>
                        </>
                        :
                        <NoDataAvailable/>
                }
                <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.ADMIN.MESSAGES}>{LABELS.COMMON.SEE_ALL_MESSAGES}</Link>
            </div>
        </div>
    )
}
