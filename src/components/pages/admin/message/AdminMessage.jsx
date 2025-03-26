import React, {useCallback, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {
    MESSAGE_STATUS_TEXT,
    MESSAGE_STATUS_TEXT_GLOBAL,
} from "../../../../helpers/constants/textConstants/messages";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {getRowByTableAndId} from "../../../../services/serviceFunctions";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {MessageIcons} from "../../../message/MessageIcons";
import {FriendlyDate} from "../../../minis/FriendlyDate";
import {MessageStatusChanger} from "../../../message/MessageStatusChanger";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {objectDoesExist} from "../../../../helpers/functions";
import {NoMatch} from "../../../routes/NoMatch";
import {githubMessageIcon, Icon} from "../../../icons/index.jsx";
import {Octokit} from "@octokit/core";
import {useAppContext} from "../../../../context/AppContext.jsx";
import {DraftRenderer} from "../../../draft/DraftRenderer.jsx";
import {convertFromRaw} from "draft-js";
import {stateToHTML} from "draft-js-export-html";


export const AdminMessage = () => {

    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {setInformationMessage} = useAppContext();

    const fetchMessageData = useCallback(() => {
        getRowByTableAndId(TABLES.MESSAGES, setMessage, id).then(() => setLoading(false));
    }, [id])

    useEffect(() => {
        fetchMessageData();
    }, [id, fetchMessageData]);

    const handleAddIssueToGithub = async () => {
        try {
            // Convert the Draft.js data to html string
            const contentState = convertFromRaw(JSON.parse(message.text));
            const htmlContent = stateToHTML(contentState);
            const octokit = new Octokit({
                auth: import.meta.env.VITE_GITHUB_ACCESS_TOKEN
            })
            await octokit.request("POST /repos/JoakimJohnsson/smssupabase/issues", {
                title: message.title,
                body: htmlContent,
            });
            setInformationMessage({show: true, status: 2, error: TEXTS.ISSUE_CREATED});
        } catch (error) {
            console.error("Error creating issue: ", error);
            setInformationMessage({show: true, status: 4, error: TEXTS.ISSUE_CREATED_ERROR});
        }
    }

    return objectDoesExist(message) ?
        <>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
                        <div className={"sms-page-col"}>
                            {/* Table MESSAGE does not have a name column - ignore name and use message title instead. */}
                            <HeadingWithBreadCrumbs doIgnoreName={true} bcName={message.title}
                                                    text={LABELS.SECTIONS.MESSAGES.MESSAGE}/>
                        </div>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <div className={"sms-section--light"}>
                                    <h2>
                                        <span>{message.title} - </span>
                                        <span>{message.is_global ? MESSAGE_STATUS_TEXT_GLOBAL[message.status].name : MESSAGE_STATUS_TEXT[message.status].name} </span>
                                        <span>{message.is_global === 1 && " - " + LABELS.COMMON.MESSAGE_GLOBAL}</span>
                                    </h2>
                                    <div className={"mb-4"}>
                                        <MessageIcons message={message} size={"fa-3x"}/>
                                    </div>
                                    <p className={"mb-3 lead"}>{TEXTS.MESSAGE_WAS_SENT} <FriendlyDate
                                        dateString={message.created_at}/>.</p>
                                    <DraftRenderer text={message.text}/>
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
                                          to={ROUTES.ADMIN.MESSAGES}>{LABELS.COMMON.SEE_ALL_MESSAGES}</Link>
                                    <button
                                        onClick={() => handleAddIssueToGithub()}
                                        className={"btn btn-outline-title sms-btn"}
                                    >
                                        <Icon icon={githubMessageIcon} className={"me-2"}/>
                                        {LABELS.COMMON.MESSAGES_ADD_ISSUE_ON_GITHUB}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
        :
        <NoMatch/>
}
