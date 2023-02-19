import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {UserIcon} from "../../icons";
import {AdminIconDuoTone, NotAdminIconDuoTone} from "../../icons-duotone";


export const UsersList = ({usersData}) => {

    return usersData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                usersData.length ?
                    (usersData.map((u, index) =>
                            <li key={index} className={"list-group-item px-0"}>
                                <div className={"row"}>
                                    <div className={"sms-list-col--main"}>
                                        <div>
                                            <UserIcon size={"1x"} className={"me-2"}/>
                                            {u.firstname} {u.lastname}
                                        </div>
                                    </div>
                                    <div className={"sms-list-col--tools"}>
                                        <div className={"d-inline-block text-end"}>
                                            {
                                                u.role === 1 ?
                                                    <AdminIconDuoTone className={"fa-xl text-success"}/>
                                                    :
                                                    <NotAdminIconDuoTone className={"fa-xl text-danger"}/>
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
