import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {LABELS_AND_HEADINGS, MESSAGE_STATUS_TEXT, ROUTES, TABLES} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {getRowByTableAndId} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {MessageIcons} from "../../../message/MessageIcons";


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
                                <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.MESSAGE}/>
                            </div>
                        </div>
                        <div className={"row row-padding--secondary"}>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
                                    <h2>{message.title} - {MESSAGE_STATUS_TEXT[message.status].name} {message.is_global === 1 && " - " + LABELS_AND_HEADINGS.MESSAGE_GLOBAL}</h2>
                                    <div className={"mb-4"}>
                                        <MessageIcons message={message} size={"fa-3x"}/>
                                    </div>
                                    <p className={"mb-5"}>{message.text}</p>
                                    <div className={"bg-dog p-3 mb-3"}>
                                        Ändra status
                                    </div>
                                    <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.ADMIN.MESSAGES}>{LABELS_AND_HEADINGS.SEE_ALL_MESSAGES}</Link>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}
