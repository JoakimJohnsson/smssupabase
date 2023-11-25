import React from "react";
import {Link} from "react-router-dom";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {ListToolBox} from "../ListToolBox";
import {ROUTES, TABLES} from "../../../helpers/constants";
import {sortByDateCreated} from "../../../helpers/functions/functions";


export const MessagesList = ({messagesData, setMessagesData}) => {

    return messagesData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                messagesData.length ?
                    (messagesData
                            .sort((a, b) => sortByDateCreated(a, b)).map((m, index) =>
                                <li key={index} className={"list-group-item px-0"}>
                                    <div className={"row"}>
                                        <div className={"sms-list-col--main"}>
                                            <div className={"d-flex align-items-center"}>
                                                <div>
                                                    <Link to={`/admin/messages/${m.id}`} className={"me-3"}>
                                                        {m.title}
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"sms-list-col--tools"}>
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
                                </li>)
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
