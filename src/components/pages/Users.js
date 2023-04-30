import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useSearchFilter} from "../../helpers/customHooks/useSearchFilter";
import FilterForm from "../search-filter/FilterForm";
import {sortByName} from "../../helpers/functions/functions";
import {Link} from "react-router-dom";


export const Users = () => {

    const [loading, setLoading] = useState(true);
    const [usersData, setUsersData] = useState(null);
    const [searchParams, setSearchParams, filter] = useSearchFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_USERS}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-page-col"}>
                    <FilterForm filter={filter} searchParams={searchParams} setSearchParams={setSearchParams}
                                placeholder={LABELS_AND_HEADINGS.FILTER_NAME}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    usersData
                                        .filter(user => user.firstname.toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            user.lastname.toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            filter === ""
                                        )
                                        .map((user) =>
                                            <li key={user.id} className={"title-card"}>
                                                <Link to={`/users/${user.id}`} className={"hocus-standard"}
                                                      title={user.firstname + " " + user.lastname}>
                                                    <div className={"image-container mb-2 position-relative"}>
                                                        <img
                                                            src={user.image_url}
                                                            alt={user.firstname + " " + user.lastname}
                                                            className="w-100"
                                                        />
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                }
                            </ul>
                    }
                </div>
            </div>
        </main>
    )
}
