import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES} from "../../../../helpers/constants/configConstants";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getCountByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../../../services/serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {UsersList} from "../../../lists/users/UsersList";
import {Link} from "react-router-dom";


export const UsersSection = () => {

    const [limitedUsersData, setLimitedUsersData] = useState(null);
    const [totalProfiles, setTotalProfiles] = useState(null);

    useEffect(() => {
        getRowsByTableWithLimitAndOrderByColumn(TABLES.PROFILES, "updated_at", setLimitedUsersData, 5, false).then();
    }, [])

    useEffect(() => {
        getCountByTable(TABLES.PROFILES, setTotalProfiles).then();
    }, []);

    return (
        <div className={"sms-dashboard-col"}>
            <div className={"sms-section--light h-100"}>
                <h2>{LABELS_AND_HEADINGS.USERS}</h2>
                {
                    limitedUsersData ?
                        <>
                            <p>{TEXTS.SHOWING_LATEST_USERS}</p>
                            <p>{TEXTS.USERS_COUNT_TEXT_1} {totalProfiles} {TEXTS.USERS_COUNT_TEXT_2}</p>
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
