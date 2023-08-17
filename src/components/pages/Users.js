import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useSearchFilter} from "../../helpers/customHooks/useSearchFilter";
import FilterFormSimple from "../search-filter/FilterFormSimple";
import {UserCard} from "../lists/users/UserCard";


export const Users = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const [searchParams, setSearchParams, filterQuery] = useSearchFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_USERS}/>
                    <FilterFormSimple filterQuery={filterQuery} searchParams={searchParams} setSearchParams={setSearchParams}
                                      placeholder={LABELS_AND_HEADINGS.FILTER_NAME}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    usersData
                                        .filter(user => user.firstname?.toLowerCase().includes(filterQuery.toLowerCase()) ||
                                            user.lastname?.toLowerCase().includes(filterQuery.toLowerCase()) ||
                                            filterQuery === ""
                                        )
                                        .map((user) =>
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
