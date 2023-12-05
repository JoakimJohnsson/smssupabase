import React from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {updateMessageStatus} from "../../services/messageService";
import {StatusIconActive, StatusIconInactive, StatusIconRead, StatusIconTodo, StatusIconUnRead} from "../icons";
import {useAppContext} from "../../context/AppContext";


export const MessageStatusChanger = ({message, fetchMessageData}) => {

    const {fetchMessages} = useAppContext();

    const handleSubmit = (value) => {
        updateMessageStatus(message.id, value).then(() => {
            fetchMessageData();
            fetchMessages();
        });
    }

    return message && (
        <div className={"mb-3"}>
            {
                message.is_global ?
                    <>
                        <button
                            onClick={() => handleSubmit(0)}
                            className={"btn bg-white hocus-standard text-black sms-btn"}
                            disabled={message.status === 0}
                        >
                            <StatusIconInactive className={"me-2"}/>
                            {LABELS_AND_HEADINGS.MESSAGES_MARK_AS_INACTIVE}
                        </button>
                        <button
                            onClick={() => handleSubmit(1)}
                            className={"btn bg-white hocus-standard text-black sms-btn"}
                            disabled={message.status === 1}
                        >
                            <StatusIconActive className={"me-2"}/>
                            {LABELS_AND_HEADINGS.MESSAGES_MARK_AS_ACTIVE}
                        </button>
                    </>
                    :
                    <>
                        <button
                            onClick={() => handleSubmit(0)}
                            className={"btn btn-danger sms-btn"}
                            disabled={message.status === 0}
                        >
                            <StatusIconUnRead className={"me-2"}/>
                            {LABELS_AND_HEADINGS.MESSAGES_MARK_AS_UNREAD}
                        </button>
                        <button
                            onClick={() => handleSubmit(1)}
                            className={"btn btn-success sms-btn"}
                            disabled={message.status === 1}
                        >
                            <StatusIconRead className={"me-2"}/>
                            {LABELS_AND_HEADINGS.MESSAGES_MARK_AS_READ}
                        </button>
                        <button
                            onClick={() => handleSubmit(2)}
                            className={"btn btn-title sms-btn"}
                            disabled={message.status === 2}
                        >
                            <StatusIconTodo className={"me-2"}/>
                            {LABELS_AND_HEADINGS.MESSAGES_MARK_AS_TODO}
                        </button>
                    </>
            }
        </div>
    )
}
