import React, {useState} from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {getRowsByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../../helpers/functions/serviceFunctions/serviceFunctions";
import {updateProfileRole} from "../../../helpers/functions/serviceFunctions/profileFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import {useAppContext} from "../../../context/AppContext";
import {RemoveAdminButton} from "./RemoveAdminButton";
import {AddAdminButton} from "./AddAdminButton";
import {getUserName, hasImage} from "../../../helpers/functions/functions";
import {Link} from "react-router-dom";


export const UsersList = ({usersData, setUsersData, limited = false, filterQuery = ""}) => {

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
                    (usersData
                            .filter(user => user.firstname.toLowerCase()
                                    .includes(filterQuery.toLowerCase()) ||
                                user.lastname.toLowerCase()
                                    .includes(filterQuery.toLowerCase()) ||
                                user.id.toLowerCase()
                                    .includes(filterQuery.toLowerCase()) ||
                                filterQuery === ""
                            )
                            .map((u, index) =>
                                // Super admins does not have to be in this list
                                u.role !== 2 &&
                                <li key={index} className={"list-group-item px-0"}>
                                    <div className={"row"}>
                                        <div className={"sms-list-col--main"}>
                                            <div className={"d-flex align-items-center"}>
                                                {
                                                    hasImage(u) &&
                                                    <img src={u.image_url} className={"list-image me-2"}
                                                         alt={LABELS_AND_HEADINGS.PROFILE_IMAGE + " " + u.firstname || getUserName(u)}/>
                                                }
                                                {
                                                    <Link to={`/users/${u.id}`}
                                                          title={getUserName(u)}>
                                                        {
                                                            u.firstname && u.lastname
                                                                ?
                                                                u.firstname + " " + u.lastname
                                                                :
                                                                getUserName(u)
                                                        }
                                                    </Link>
                                                }
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
