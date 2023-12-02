import React, {useEffect, useState, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {IconButton} from "../../../minis/IconButton";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {handleBacking} from "../../../../helpers/functions/functions";
import {MessagesList} from "../../../message/MessagesList";
import {AddMessage} from "../../../message/AddMessage";
import {GlobalIconDuoTone} from "../../../icons-duotone";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";


export const AdminMessages = () => {

    const [messagesData, setMessagesData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchMessages = useCallback(() => {
        getRowsByTable(TABLES.MESSAGES, setMessagesData).then(() => setLoading(false));
    }, [])

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.MESSAGES}</h1>
                    <Breadcrumbs/>
                    <p className={"lead"}>{TEXTS.MESSAGES_ADMIN_TEXT_1}</p>
                    <p className={"mb-4"}>{TEXTS.MESSAGES_ADMIN_TEXT_2}</p>
                    <a href={"#global-message-section"} className={"btn btn-primary btn-cta d-inline-block mb-4"}>
                        <GlobalIconDuoTone className={"btn-cta--icon"}/>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL_SEND}
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
                                        messagesData &&
                                        <MessagesList messagesData={messagesData} setMessagesData={setMessagesData} showGlobal={false}/>
                                    }
                                    <h2>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL}</h2>
                                    <p className={"lead"}>{TEXTS.MESSAGES_ADMIN_TEXT_3}</p>
                                    {
                                        messagesData &&
                                        <MessagesList messagesData={messagesData} setMessagesData={setMessagesData} showGlobal={true}/>
                                    }
                                    <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                                label={LABELS_AND_HEADINGS.BACK}/>
                                </>
                        }
                    </div>
                </div>
                <div className={"sms-page-col--full mb-5"}>
                    <div className={"sms-section--light"}>
                        <h2 id={"global-message-section"}>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL_SEND}</h2>
                        <AddMessage isGlobalMessage={true} fetchMessages={fetchMessages}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
