import React, {useCallback, useEffect, useState} from "react";
import {getIconByName, Icon} from "../icons";
import {getDataIcon} from "../../helpers/functions";
import topicData from "../../helpers/valueLists/topics.json";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import {FriendlyDate} from "../minis/FriendlyDate";
import {getAllActiveGlobalMessages} from "../../services/messageService";


export const GlobalMessageViewer = () => {

    const [activeGlobalMessages, setActiveGlobalMessages] = useState(null);

    const fetchMessages = useCallback(() => {
        getAllActiveGlobalMessages(setActiveGlobalMessages).then();
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);


    return activeGlobalMessages && !!activeGlobalMessages.length && (
        <div className={"global-message-viewer"}>
            <h2>{LABELS_AND_HEADINGS.NEWS}</h2>
            {
                activeGlobalMessages.map((m) => {
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
                                {m.text}
                            </div>
                    )
                })
            }
        </div>
    )
}
