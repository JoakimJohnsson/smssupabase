import React, {useEffect, useState} from "react";
import {TEXTS} from "../../../helpers/constants/textConstants/texts.js";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings.js";
import {TABLES} from "../../../helpers/constants/serviceConstants.js";
import {getRowsByTable} from "../../../services/serviceFunctions.js";
import {HeadingWithBreadCrumbs} from "../../headings/index.jsx";
import {OverlaySpinner} from "../../minis/OverlaySpinner.jsx";
import {useSimpleQueryFilter} from "../../../helpers/customHooks/useSimpleQueryFilter.js";
import FilterFormSimple from "../../searchFilter/FilterFormSimple.jsx";
import {UserCard} from "../../lists/users/UserCard.jsx";
import {filterQueryByFirstNameAndLastName} from "../../../helpers/functions.jsx";


export const Users = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, []);

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.USERS.ALL_USERS}/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={TEXTS.FILTER_NAME}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    query ?
                                        usersData
                                            .filter((user) => {
                                                    return (
                                                        filterQueryByFirstNameAndLastName(user, query)
                                                    )
                                                }
                                            )
                                            .map((user) =>
                                                // Only show public users here
                                                user.is_public === 1 &&
                                                <UserCard key={user.id} user={user}/>
                                            )
                                        :
                                        usersData.map((user) =>
                                            // Only show public users here
                                            user.is_public === 1 &&
                                            <UserCard key={user.id} user={user}/>
                                        )
                                }
                            </ul>
                    }
                </div>
            </div>
        </main>
    )
}