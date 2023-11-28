import React from "react";
import {GlobalIcon} from "../icons";
import {TopicIcon} from "./TopicIcon";
import {StatusIcon} from "./StatusIcon";


export const MessageIcons = ({message, size = false}) => {
    return message && (
        <>
            <TopicIcon topicId={message.topic_id} size={size}/>
            <StatusIcon statusId={message.status} size={size}/>
            {
                message.is_global === 1 &&
                <GlobalIcon className={`me-2 text-country fa-fw ${size}`}/>
            }
        </>
    )
}
