import React from "react";
import {Link} from "react-router-dom";
import {NoDataAvailable} from "../minis/NoDataAvailable";
import {ListToolBox} from "../lists/ListToolBox";
import {ROUTES, TABLES} from "../../helpers/constants";
import {sortByDateCreatedDesc} from "../../helpers/functions";
import {MessageIcons} from "./MessageIcons";
import {CalendarDate} from "../minis/CalendarDate";


export const MessagesList = ({messagesData, setMessagesData}) => {

    return messagesData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                messagesData.length ?
                    (messagesData
                            .sort((a, b) => sortByDateCreatedDesc(a, b)).map((m, index) =>
                                <li key={index} className={"list-group-item px-0"}>
                                    <div className={"row"}>
                                        <div className={"col-12 d-flex justify-content-between"}>
                                            <div className={"d-flex align-items-center"}>
                                                <div className={"pe-3"}>
                                                    <CalendarDate dateString={m.created_at}/>
                                                </div>
                                                <div className={"d-flex align-items-center"}>
                                                    <MessageIcons message={m} showBorder={true} size={"fa-2x"}/>
                                                    <Link to={`/admin/messages/${m.id}`} className={"me-3"}>
                                                        {m.title}
                                                    </Link>
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
                                                        showAdminInfo={true}
                                                        route={ROUTES.ADMIN.MESSAGES}
                                                        table={TABLES.MESSAGES}
                                                        showEditButton={false}
                                                    />
                                                }
                                            </div>
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
