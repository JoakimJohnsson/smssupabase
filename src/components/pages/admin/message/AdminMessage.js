import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS, MESSAGE_STATUS_TEXT, MESSAGE_STATUS_TEXT_GLOBAL, ROUTES, TEXTS} from "../../../../helpers/constants/configConstants";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {getRowByTableAndId} from "../../../../services/serviceFunctions";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {MessageIcons} from "../../../message/MessageIcons";
import {FriendlyDate} from "../../../minis/FriendlyDate";
import {MessageStatusChanger} from "../../../message/MessageStatusChanger";


export const AdminMessage = () => {

    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchMessageData = useCallback(() => {
        getRowByTableAndId(TABLES.MESSAGES, setMessage, id).then(() => setLoading(false));
    }, [id])

    useEffect(() => {
        fetchMessageData();
    }, [id, fetchMessageData]);

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            {
                loading ?
                    <div className={"row row-padding--main"}>
                        <OverlaySpinner/>
                    </div>
                    :
                    <>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
                                {/* Table MESSAGE does not have a name column - ignore name and use message title instead. */}
                                <HeadingWithBreadCrumbs doIgnoreName={true} bcName={message.title} text={LABELS_AND_HEADINGS.MESSAGE}/>
                            </div>
                        </div>
                        <div className={"row row-padding--secondary"}>
                            <div className={"col-12 col-lg-10"}>
                                <div className={"sms-section--light"}>
                                    <h2>
                                        <span>{message.title} - </span>
                                        <span>{message.is_global ? MESSAGE_STATUS_TEXT_GLOBAL[message.status].name : MESSAGE_STATUS_TEXT[message.status].name} </span>
                                        <span>{message.is_global === 1 && " - " + LABELS_AND_HEADINGS.MESSAGE_GLOBAL}</span>
                                    </h2>
                                    <div className={"mb-4"}>
                                        <MessageIcons message={message} size={"fa-3x"}/>
                                    </div>
                                    <p className={"mb-3 lead"}>{TEXTS.MESSAGE_WAS_SENT} <FriendlyDate dateString={message.created_at}/>.</p>
                                    <p className={"mb-5 text-parsed"}>{message.text}</p>
                                    <MessageStatusChanger message={message} fetchMessageData={fetchMessageData}/>
                                    {
                                        message.origin_table && message.origin_id &&
                                        <Link className={"btn btn-outline-primary sms-btn"}
                                              to={`/${message.origin_table}/${message.origin_id}`}>{TEXTS.MESSAGE_LINK}</Link>
                                    }
                                    {
                                        message.sender_id &&
                                        <Link className={"btn btn-outline-primary sms-btn"}
                                              to={`/users/${message.sender_id}`}>{TEXTS.MESSAGE_LINK_SENDER}</Link>
                                    }
                                    <Link className={"btn btn-outline-primary sms-btn"}
                                          to={ROUTES.ADMIN.MESSAGES}>{LABELS_AND_HEADINGS.SEE_ALL_MESSAGES}</Link>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}
