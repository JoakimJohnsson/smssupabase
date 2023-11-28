import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {IconButton} from "../../../minis/IconButton";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {handleBacking} from "../../../../helpers/functions/functions";
import {MessagesList} from "../../../message/MessagesList";


export const AdminMessages = () => {

    const [messagesData, setMessagesData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.MESSAGES, setMessagesData).then();
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.MESSAGES}</h1>
                    <Breadcrumbs/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-section--light"}>
                        <h2>{LABELS_AND_HEADINGS.MESSAGES_RECEIVED}</h2>
                        {
                            messagesData &&
                            <MessagesList messagesData={messagesData} setMessagesData={setMessagesData} showAdminInfo={true}/>
                        }
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-section--light"}>
                        <h2>{LABELS_AND_HEADINGS.MESSAGES_GLOBAL_SEND}</h2>
                    </div>
                </div>
            </div>
        </main>
    )
}
