import React from "react";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {ListToolBox} from "../lists/ListToolBox";
import {ROUTES} from "../../helpers/constants/configConstants";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {sortByDateCreatedDesc} from "../../helpers/functions";
import {CalendarDate} from "../minis/CalendarDate";
import {TopicIcon} from "./TopicIcon";
import {DraftRenderer} from "../draft/DraftRenderer.jsx";


export const SimpleMessagesList = ({messagesData, setMessagesData}) => {

    return messagesData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                messagesData.length ?
                    (messagesData
                            .sort((a, b) => sortByDateCreatedDesc(a, b)).map((m, index) =>
                                <li key={index} className={"list-group-item px-0 py-0"}>
                                    <div className={"row pt-3"}>
                                        <div className={"col-12 d-flex justify-content-between mb-3"}>
                                            <div className={"d-flex align-items-center"}>
                                                <div className={"pe-3"}>
                                                    <CalendarDate dateString={m.created_at}/>
                                                </div>
                                                <div className={"d-flex align-items-center"}>
                                                    <TopicIcon topicId={m.topic_id} size={"fa-2x"}/>
                                                    <h3 className={"m-0"}>{m.title}</h3>
                                                </div>
                                            </div>
                                            <div className={"d-flex align-items-center"}>
                                                {
                                                    <ListToolBox
                                                        item={m}
                                                        name={m.title}
                                                        displayName={m.title}
                                                        data={messagesData}
                                                        setData={setMessagesData}
                                                        showAdvancedTools={true}
                                                        route={ROUTES.ADMIN.MESSAGES}
                                                        table={TABLES.MESSAGES}
                                                        showEditButton={false}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className={"ms-1 ms-sm-2 mb-2"}>
                                            <DraftRenderer text={m.text}/>
                                        </div>
                                    </div>
                                </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
