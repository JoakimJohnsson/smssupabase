import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking} from "../../../../helpers/functions";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {UsersList} from "../../../lists/users/UsersList";
import {useSimpleQueryFilter} from "../../../../helpers/customHooks/useSimpleQueryFilter";
import FilterFormSimple from "../../../search-filter/FilterFormSimple";


export const AdminUsers = () => {

    const [usersData, setUsersData] = useState(null);
    const [setSearchParams, query] = useSimpleQueryFilter();
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.PROFILES, setUsersData).then();
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_USERS}</h1>
                    <Breadcrumbs/>
                    <p className={"lead"}>{TEXTS.SHOWING_LATEST_USERS}</p>
                    <p className={"mb-5"}>{TEXTS.USERS_COUNT_TEXT_1} {usersData && usersData.length} {TEXTS.USERS_COUNT_TEXT_2}</p>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_NAME}/>
                    <div className={"sms-section--light"}>
                        {
                            usersData && usersData.length > 0 ?
                                <UsersList usersData={usersData} setUsersData={setUsersData} query={query}/>
                                :
                                <NoDataAvailable/>
                        }
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
