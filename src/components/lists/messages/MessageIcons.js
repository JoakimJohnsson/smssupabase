import React from "react";
import {GlobalIcon} from "../../icons";
import {TopicIcon} from "./TopicIcon";
import {StatusIcon} from "./StatusIcon";


export const MessageIcons = ({message}) => {
    return message && (
        <>
            <TopicIcon topicId={message.topic_id}/>
            <StatusIcon statusId={message.status}/>
            {
                message.is_global === 1 &&
                <GlobalIcon className={"me-2 text-country fa-fw"}/>
            }
        </>
    )
}
