import React, {useEffect, useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {IconButton} from "../../../minis/IconButton";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {filterGlobalMessage, handleBacking} from "../../../../helpers/functions";
import {MessagesList} from "../../../message/MessagesList";
import {Message} from "../../../message/Message";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {supabase} from "../../../../supabase/supabaseClient";
import {PageSectionLight} from "../../pagecomponents/PageSectionLight.jsx";
import {PageMainContent} from "../../pagecomponents/PageMainContent.jsx";


export const AdminMessages = () => {

    const [messagesData, setMessagesData] = useState(null);
    const [messages, setMessages] = useState(null);
    const [sentMessages, setSentMessages] = useState(null);
    const [globalMessages, setGlobalMessages] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Messages sent to Admin by Users will not have a receiver id.
    const fetchAdminMessages = useCallback(async () => {
        try {
            let {data, error, status} = await supabase
                .from(TABLES.MESSAGES)
                .select("*")
                .is("receiver_id", null)
            if (error && status !== 406) {
                console.error(error);
            }
            if (data) {
                setMessagesData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    // Messages sent to users will not have a sender id.
    const fetchSentMessages = useCallback(async () => {
        try {
            let {data, error, status} = await supabase
                .from(TABLES.MESSAGES)
                .select("*")
                .is("sender_id", null)
            if (error && status !== 406) {
                console.error(error);
            }
            if (data) {
                setSentMessages(data);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchAdminMessages().then(() => {
            fetchSentMessages().then(() => setLoading(false))
        });
    }, [fetchAdminMessages, fetchSentMessages]);

    useEffect(() => {
        if (messagesData) {
            setMessages(messagesData.filter((m) => filterGlobalMessage(m, false)));
            setGlobalMessages(messagesData.filter((m) => filterGlobalMessage(m, true)));
        }
    }, [messagesData]);

    return (
        <PageMainContent heading={LABELS.SECTIONS.MESSAGES.MESSAGES}>
            <div className={"lead-wrapper"}>
                <p className={"lead"}>{TEXTS.MESSAGES_ADMIN_TEXT_1}</p>
                <p className={"mb-5"}>{TEXTS.MESSAGES_ADMIN_TEXT_2}</p>
            </div>
            <div className={"row"}>
                <PageSectionLight>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <>
                                <h2>{LABELS.COMMON.MESSAGES_RECEIVED}</h2>
                                {
                                    messages ?
                                        <MessagesList messagesData={messages} setMessagesData={setMessages}/>
                                        :
                                        <NoDataAvailable/>
                                }
                                <h2>{LABELS.COMMON.MESSAGES_SENT}</h2>
                                {
                                    sentMessages ?
                                        <MessagesList messagesData={sentMessages}
                                                      setMessagesData={setSentMessages}/>
                                        :
                                        <NoDataAvailable/>
                                }
                                <h2>{LABELS.COMMON.MESSAGES_GLOBAL}</h2>
                                {
                                    globalMessages ?
                                        <MessagesList messagesData={globalMessages}
                                                      setMessagesData={setGlobalMessages}/>
                                        :
                                        <NoDataAvailable/>
                                }
                                <IconButton variant={"outline-primary"} icon={faArrowLeft}
                                            onClick={() => handleBacking(navigate)}
                                            label={LABELS.COMMON.BACK}/>
                            </>
                    }
                </PageSectionLight>
                <PageSectionLight>
                    <h2 id={"global-message-section"}>{LABELS.COMMON.MESSAGES_GLOBAL_SEND}</h2>
                    <Message isGlobalMessage={true} fetchAdminMessages={fetchAdminMessages}/>
                </PageSectionLight>
            </div>
        </PageMainContent>
    )
}
