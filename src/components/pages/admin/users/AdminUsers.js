import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking} from "../../../../helpers/functions/functions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {UsersList} from "../../../lists/users/UsersList";


export const AdminUsers = () => {

    const [usersData, setUsersData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then();
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <div className={"sms-dashboard-col"}>
                        <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_USERS}</h1>
                        <Breadcrumbs/>
                        <div className={"sms-section--light"}>
                            {
                                usersData && usersData.length > 0 ?
                                    <UsersList usersData={usersData}/>
                                    :
                                    <NoDataAvailable/>
                            }
                            <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                        label={LABELS_AND_HEADINGS.BACK}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
