import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../../../helpers/constants";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {UsersList} from "../../../lists/users/UsersList";
import {Link} from "react-router-dom";


export const UsersCard = () => {

    const [limitedUsersData, setLimitedUsersData] = useState(null);

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.PROFILES, "lastname", setLimitedUsersData, 5, false).then();
    }, [])

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light"}>
                <h2>{LABELS_AND_HEADINGS.USERS}</h2>
                {
                    limitedUsersData ?
                        <>
                            <p>{TEXTS.SHOWING_LATEST_USERS}</p>
                            <UsersList usersData={limitedUsersData} setUsersData={setLimitedUsersData} limited/>
                        </>
                        :
                        <NoDataAvailable/>
                }
                <Link className={"btn btn-outline-primary sms-btn"} to={ROUTES.ADMIN.USERS}>{LABELS_AND_HEADINGS.SEE_ALL_USERS}</Link>
            </div>
        </div>
    )
}
