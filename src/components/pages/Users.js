import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {getRowsByTable} from "../../services/serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {UserCard} from "../lists/users/UserCard";
import {filterQueryByFirstNameAndLastName} from "../../helpers/functions";


export const Users = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_USERS}/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_NAME}/>
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
