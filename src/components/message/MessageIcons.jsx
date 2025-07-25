import React from "react";
import {globalIcon, Icon} from "../icons/Icons.jsx";
import {TopicIcon} from "./TopicIcon";
import {StatusIcon} from "./StatusIcon";


export const MessageIcons = ({message, size = false, showBorder = false}) => {
    
    return message && (
        <div className={`d-none d-md-block me-3 ${showBorder && "border-end"}`}>
            <StatusIcon isGlobal={message.is_global} statusId={message.status} size={size}/>
            <TopicIcon topicId={message.topic_id} size={size}/>
            {
                message.is_global === 1 &&
                <Icon icon={globalIcon} className={`me-2 text-country fa-fw ${size}`}/>
            }
        </div>
    )
}
