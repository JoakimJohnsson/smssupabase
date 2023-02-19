import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {getRowsByTableWithLimitAndOrderByColumn} from "../../../serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {UsersList} from "../../../lists/users/UsersList";


export const UsersCard = () => {

    const [limitedUsersData, setLimitedUsersData] = useState(null);

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.PROFILES, "lastname", setLimitedUsersData, 5, false).then()
    }, [])

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"dashboard-card"}>
                <h2>{LABELS_AND_HEADINGS.USERS}</h2>
                {
                    limitedUsersData ?
                        <>
                            <p>{TEXTS.SHOWING_LATEST_USERS}</p>
                            <UsersList usersData={limitedUsersData}/>
                        </>
                        :
                        <NoDataAvailable/>
                }
            </div>
        </div>
    )
}
