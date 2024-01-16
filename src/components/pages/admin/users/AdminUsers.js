import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {useNavigate} from "react-router-dom";
import {handleBacking} from "../../../../helpers/functions";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {UsersList} from "../../../lists/users/UsersList";
import {useSimpleQueryFilter} from "../../../../helpers/customHooks/useSimpleQueryFilter";
import FilterFormSimple from "../../../search-filter/FilterFormSimple";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";


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
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_USERS}/>
                    <p className={"lead"}>{TEXTS.SHOWING_LATEST_USERS}</p>
                    <p className={"mb-5"}>{TEXTS.USERS_COUNT_TEXT_1} {usersData && usersData.length} {TEXTS.USERS_COUNT_TEXT_2}</p>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_NAME}/>
                    <div className={"sms-section--light"}>
                        {
                            usersData ?
                                <UsersList usersData={usersData} setUsersData={setUsersData} query={query}/>
                                :
                                <OverlaySpinner/>
                        }
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
