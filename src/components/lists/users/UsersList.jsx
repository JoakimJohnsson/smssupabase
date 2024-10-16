import React from "react";
import {NoDataAvailable} from "../../minis/NoDataAvailable";
import {getRowsByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../../services/serviceFunctions";
import {updateProfileRole} from "../../../services/profileService";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants/configConstants";
import {TABLES} from "../../../helpers/constants/serviceConstants";
import {useAppContext} from "../../../context/AppContext";
import {RemoveAdminButton} from "./RemoveAdminButton";
import {AddAdminButton} from "./AddAdminButton";
import {getUserName, hasImage} from "../../../helpers/functions";
import {Link} from "react-router-dom";
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import {Icon, adminIconDuoTone} from "../../icons";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings";
import {FriendlyDate} from "../../minis/FriendlyDate";


export const UsersList = ({usersData, setUsersData, limited = false, query = ""}) => {

    const {setInformationMessage} = useAppContext();

    const handleChangeAdmin = (id, value, doSetLoading) => {
        doSetLoading(true);
        updateProfileRole(id, value, setInformationMessage).then(() => {
            if (limited) {
                getRowsByTableWithLimitAndOrderByColumn(TABLES.PROFILES, "lastname", setUsersData, 5, false).then(() => doSetLoading(false));
            } else {
                getRowsByTable(TABLES.PROFILES, setUsersData).then(() => doSetLoading(false));
            }
            doSetLoading(false);
        });
    }

    return usersData && (
        <ul className={"sms-list--with-tools mb-4"}>
            {
                usersData.length ?
                    (usersData
                            .filter(user => (
                                (user.firstname?.toLowerCase().includes(query.toLowerCase())) ||
                                (user.lastname?.toLowerCase().includes(query.toLowerCase())) ||
                                user.id.toLowerCase().includes(query.toLowerCase()) ||
                                query === ""
                            ))
                            .map((u, index) =>
                                <li key={index} className={"list-group-item px-0"}>
                                    <div className={"row"}>
                                        <div className={"sms-list-col--main"}>
                                            <div className={"d-flex align-items-center"}>
                                                {
                                                    hasImage(u) &&
                                                    <img src={u.image_url} className={"list-image me-2"}
                                                         alt={LABELS_AND_HEADINGS.PROFILE_IMAGE + " " + u.firstname || getUserName(u)}/>
                                                }
                                                <div>
                                                    {
                                                        <Link to={`/users/${u.id}`} title={getUserName(u)}>
                                                            {getUserName(u)}
                                                        </Link>
                                                    }
                                                    { u.last_login &&
                                                        <p className={"mb-0"}>
                                                            {LABELS.COMMON.LATEST_LOG_IN} <FriendlyDate dateString={u.last_login}/>
                                                        </p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className={"sms-list-col--tools"}>
                                            <div className={"d-inline-block text-end"}>
                                                {
                                                    u.role !== 2 ?
                                                        (
                                                            u.role === 1 ?
                                                                <RemoveAdminButton user={u}
                                                                                   handleChangeAdmin={handleChangeAdmin}/>
                                                                :
                                                                <AddAdminButton user={u}
                                                                                handleChangeAdmin={handleChangeAdmin}/>
                                                        )
                                                        :
                                                        <OverlayTrigger
                                                            key={"is-super-admin-tooltip"}
                                                            placement={"top"}
                                                            overlay={
                                                                <Tooltip id={"is-super-admin-tooltip"}>
                                                                    {getUserName(u) + LABELS.SECTIONS.USERS.IS_SUPER_ADMIN}
                                                                </Tooltip>
                                                            }
                                                        >
                                                            <button
                                                                className={"text-grade btn sms-tool-btn no-hover"}
                                                                aria-label={getUserName(u) + LABELS.SECTIONS.USERS.IS_SUPER_ADMIN}>
                                                                <Icon icon={adminIconDuoTone} className={"fa-xl"}/>
                                                            </button>
                                                        </OverlayTrigger>
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
