import React, {useEffect, useState} from "react";
import {getDataIcon} from "../../helpers/functions";
import topicData from "../../helpers/valueLists/topics.json";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {FriendlyDate} from "../minis/FriendlyDate";
import {
    getIconByName,
    Icon,
    statusIconActiveDuoTone,
    statusIconTodoDuoTone,
    statusIconUnreadDuoTone
} from "../icons";
import {Link} from "react-router-dom";
import {useAppContext} from "../../context/AppContext";


export const MessageViewer = ({viewGlobal = false, viewUnread = false, viewTodo = false}) => {

    const {activeGlobalMessages, unreadMessages, todoMessages} = useAppContext();
    const [messages, setMessages] = useState(null);

    const getHeading = () => {
        if (viewGlobal) {
            return LABELS.COMMON.MESSAGES_FROM_ADMIN;
        } else if (viewTodo) {
            return LABELS.COMMON.MESSAGES_MARK_AS_TODO;
        } else {
            return LABELS.SECTIONS.MESSAGES.MESSAGES;
        }
    }

    const getIcon = () => {
        if (viewGlobal) {
            return <Icon icon={statusIconActiveDuoTone} className={"text-light me-2"} size={"2x"}/>;
        } else if (viewTodo) {
            return <Icon icon={statusIconTodoDuoTone} className={"text-light me-2"} size={"2x"}/>;
        } else {
            return <Icon icon={statusIconUnreadDuoTone} className={"text-light me-2"} size={"2x"}/>;
        }
    }

    useEffect(() => {
        if (viewGlobal) {
            setMessages(activeGlobalMessages);
        } else if (viewTodo) {
            setMessages(todoMessages);
        } else if (viewUnread) {
            setMessages(unreadMessages);
        } else {
            setMessages(null);
        }
    }, [activeGlobalMessages, todoMessages, unreadMessages, viewGlobal, viewTodo, viewUnread]);

    return messages && !!messages.length && (
        <div className={"global-message-viewer"}>
            <h2 className={"mb-3"}>
                {
                    getIcon()
                }
                {
                    getHeading()
                }
            </h2>
            {
                messages.map((m) => {
                    return (
                        <div key={m.id} className={"global-message"}>
                            <div className={"d-flex align-items-center mb-2"}>
                                {
                                    m.topic_id &&
                                    <Icon icon={getIconByName(getDataIcon(topicData, m.topic_id))} className={`me-2 mb-2 fa-fw fa-2x`}/>
                                }
                                <FriendlyDate dateString={m.created_at}/>
                            </div>
                            <h3>{m.title}</h3>
                            <p className={"text-parsed"}>{m.text}</p>
                            {
                                !viewGlobal &&
                                <Link to={`/admin/messages/${m.id}`} className={"me-3"}>
                                    {LABELS.COMMON.ADMINISTRATE_MESSAGE} {m.title}
                                </Link>
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
