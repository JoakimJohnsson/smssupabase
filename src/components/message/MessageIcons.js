import React from "react";
import {GlobalIcon} from "../icons";
import {TopicIcon} from "./TopicIcon";
import {StatusIcon} from "./StatusIcon";


export const MessageIcons = ({message, size = false, showBorder = false}) => {
    
    return message && (
        <div className={`me-3 ${showBorder && "border-end"}`}>
            <StatusIcon statusId={message.status} size={size}/>
            <TopicIcon topicId={message.topic_id} size={size}/>
            {
                message.is_global === 1 &&
                <GlobalIcon className={`me-2 text-country fa-fw ${size}`}/>
            }
        </div>
    )
}
