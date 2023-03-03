import React, {useState} from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {UserIcon} from "../../icons";
import {getRowsByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../../helpers/functions/serviceFunctions/serviceFunctions";
import {updateProfileRole} from "../../../helpers/functions/serviceFunctions/profileFunctions";
import {TABLES} from "../../../helpers/constants";
import {useAppContext} from "../../../context/AppContext";
import {RemoveAdminButton} from "./RemoveAdminButton";
import {AddAdminButton} from "./AddAdminButton";


export const UsersList = ({usersData, setUsersData, limited = false}) => {

    const {setInformationMessage} = useAppContext();
    const [confirmed, setConfirmed] = useState(false);

    const handleChangeAdmin = (id, value, doSetLoading) => {
        doSetLoading(true);
        updateProfileRole(id, value, setInformationMessage, setConfirmed).then(() => {
            // Only do this if update was confirmed
            if (confirmed) {
                if (limited) {
                    getRowsByTableWithLimitAndOrderByColumn(TABLES.PROFILES, "lastname", setUsersData, 5, false).then(() => doSetLoading(false));
                } else {
                    getRowsByTable(TABLES.PROFILES, setUsersData).then(() => doSetLoading(false));
                }
            } else {
                // Update was not confirmed
                doSetLoading(false);
            }
        });

    }

    return usersData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                usersData.length ?
                    (usersData.map((u, index) =>
                            u.role !== 2 &&
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
                                                    <RemoveAdminButton user={u} handleChangeAdmin={handleChangeAdmin}/>
                                                    :
                                                    <AddAdminButton user={u} handleChangeAdmin={handleChangeAdmin}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    )
                    :
                    (<NoDataAvailable/>)
            }
        </ul>
    )
}
