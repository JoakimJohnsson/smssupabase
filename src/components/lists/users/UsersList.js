import React, {useState} from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {UserIcon} from "../../icons";
import {AdminIconDuoTone, NotAdminIconDuoTone} from "../../icons-duotone";
import {getRowsByTable, getRowsByTableWithLimitAndOrderByColumn, updateProfileRole} from "../../serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import {useAppContext} from "../../../context/AppContext";
import {CustomSpinner} from "../../minis/CustomSpinner";


export const UsersList = ({usersData, setUsersData, limited = false}) => {

    const {setInformationMessage} = useAppContext();
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [loadingRemove, setLoadingRemove] = useState(false);

    const handleChangeAdmin = (id, value, doSetLoading) => {
        doSetLoading(true);
        updateProfileRole(id, value, setInformationMessage).then(() => {
            if (limited) {
                getRowsByTableWithLimitAndOrderByColumn(TABLES.PROFILES, "lastname", setUsersData, 5, false).then(() => doSetLoading(false));
            } else {
                getRowsByTable(TABLES.PROFILES, setUsersData).then(() => doSetLoading(false));
            }
        });
    }

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
                                                    <button
                                                        className={"btn text-success sms-icon-btn"}
                                                        aria-label={LABELS_AND_HEADINGS.REMOVE_ADMIN_1 + u.firstname + LABELS_AND_HEADINGS.REMOVE_ADMIN_2}
                                                        onClick={() => handleChangeAdmin(u.id, 0, setLoadingRemove)}>
                                                        {
                                                            loadingRemove ?
                                                                <CustomSpinner className={"fa-xl"}/>
                                                                :
                                                                <AdminIconDuoTone className={"fa-xl"}/>
                                                        }

                                                    </button>
                                                    :
                                                    <button
                                                        className={"btn text-danger sms-icon-btn"}
                                                        aria-label={LABELS_AND_HEADINGS.ADD_ADMIN_1 + u.firstname + LABELS_AND_HEADINGS.ADD_ADMIN_2}
                                                        onClick={() => handleChangeAdmin(u.id, 1, setLoadingAdd)}>
                                                        {
                                                            loadingAdd ?
                                                                <CustomSpinner className={"fa-xl"}/>
                                                                :
                                                                <NotAdminIconDuoTone className={"fa-xl"}/>
                                                        }
                                                    </button>
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
