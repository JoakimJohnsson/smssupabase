import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../../../helpers/constants";
import {Link} from "react-router-dom";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../../services/serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {MessagesList} from "../../../message/MessagesList";


export const MessagesSection = () => {

    const [limitedMessagesData, setLimitedMessagesData] = useState(null);

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.MESSAGES, "created_at", setLimitedMessagesData, 5, true).then()
    }, [])

    return (
        <div className={"sms-page-col--full mb-5 "}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.MESSAGES}</h2>
                {
                    limitedMessagesData ?
                        <>
                            <p>{TEXTS.SHOWING_LATEST_MESSAGES}</p>
                            <h3>{LABELS_AND_HEADINGS.MESSAGES_RECEIVED}</h3>
                            <MessagesList messagesData={limitedMessagesData}
                                          setMessagesData={setLimitedMessagesData}
                                          showAdminInfo={true}/>
                            <h3>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL}</h3>
                            <MessagesList messagesData={limitedMessagesData}
                                          setMessagesData={setLimitedMessagesData}
                                          showAdminInfo={true}
                                          showGlobal/>
                        </>
                        :
                        <NoDataAvailable/>
                }
                <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.ADMIN.MESSAGES}>{LABELS_AND_HEADINGS.SEE_ALL_MESSAGES}</Link>
            </div>
        </div>
    )
}
