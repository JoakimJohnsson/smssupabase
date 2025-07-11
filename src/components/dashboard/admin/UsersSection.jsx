import React, {useEffect, useState} from "react";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings.js";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getCountByTable, getRowsByTableWithLimitAndOrderByColumn} from "../../../../services/serviceFunctions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {UsersList} from "../../../lists/users/UsersList";
import {Link} from "react-router-dom";
import {DashboardSectionLight} from "../../../pages/pagecomponents/DashboardSectionLight.jsx";


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
        <DashboardSectionLight>
            <h2>{LABELS.COMMON.USERS}</h2>
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
            <Link className={"btn btn-outline-primary sms-btn"}
                  to={ROUTES.ADMIN.USERS}>{LABELS.COMMON.SEE_ALL_USERS}</Link>
        </DashboardSectionLight>
    )
}
