import React, {useEffect, useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {IconButton} from "../../../minis/IconButton";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {filterGlobalMessage, handleBacking} from "../../../../helpers/functions";
import {MessagesList} from "../../../message/MessagesList";
import {AddMessage} from "../../../message/AddMessage";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {Icon, globalIconDuoTone} from "../../../icons";


export const AdminMessages = () => {

    const [messagesData, setMessagesData] = useState(null);
    const [messages, setMessages] = useState(null);
    const [globalMessages, setGlobalMessages] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAdminMessages = useCallback(() => {
        getRowsByTable(TABLES.MESSAGES, setMessagesData).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchAdminMessages();
    }, [fetchAdminMessages]);

    useEffect(() => {
        if (messagesData) {
            setMessages(messagesData.filter((m) => filterGlobalMessage(m, false)));
            setGlobalMessages(messagesData.filter((m) => filterGlobalMessage(m, true)));
        }
    }, [messagesData]);

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.MESSAGES}/>
                    <p className={"lead"}>{TEXTS.MESSAGES_ADMIN_TEXT_1}</p>
                    <p className={"mb-4"}>{TEXTS.MESSAGES_ADMIN_TEXT_2}</p>
                    <a href={"#global-message-section"} className={"btn btn-primary btn-cta d-inline-block d-xxl-none mb-4"}>
                        <Icon icon={globalIconDuoTone} className={"btn-cta--icon"}/>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL_SEND}
                    </a>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-page-col--full mb-5"}>
                    <div className={"sms-section--light"}>
                        {
                            loading ?
                                <div className={"row row-padding--main"}>
                                    <OverlaySpinner/>
                                </div>
                                :
                                <>
                                    <h2>{LABELS_AND_HEADINGS.MESSAGES_RECEIVED}</h2>
                                    {
                                        messages ?
                                            <MessagesList messagesData={messages} setMessagesData={setMessages}/>
                                            :
                                            <NoDataAvailable/>
                                    }
                                    <h2>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL}</h2>
                                    {
                                        globalMessages ?
                                            <MessagesList messagesData={globalMessages} setMessagesData={setGlobalMessages}/>
                                            :
                                            <NoDataAvailable/>
                                    }
                                    <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                                label={LABELS_AND_HEADINGS.BACK}/>
                                </>
                        }
                    </div>
                </div>
                <div className={"sms-dashboard-col mb-5"}>
                    <div className={"sms-section--light"}>
                        <h2 id={"global-message-section"}>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL_SEND}</h2>
                        <AddMessage isGlobalMessage={true} fetchAdminMessages={fetchAdminMessages}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
