import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../../../helpers/constants/configConstants";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {useNavigate} from "react-router-dom";
import {handleBacking} from "../../../../helpers/functions";
import {faArrowLeft} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "../../../minis/IconButton";
import {UsersList} from "../../../lists/users/UsersList";
import {useSimpleQueryFilter} from "../../../../helpers/customHooks/useSimpleQueryFilter";
import FilterFormSimple from "../../../searchFilter/FilterFormSimple";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const AdminUsers = () => {

    const [usersData, setUsersData] = useState(null);
    const [loading, setLoading] = useState(false);
    const {setSearchParams, query} = useSimpleQueryFilter();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await getRowsByTable(TABLES.PROFILES, setUsersData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData(); // Promise can be ignored
    }, []);

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.USERS.ALL_USERS}/>
                    <p className={"lead"}>{TEXTS.SHOWING_LATEST_USERS}</p>
                    <p className={"mb-5"}>{TEXTS.USERS_COUNT_TEXT_1} {usersData && usersData.length} {TEXTS.USERS_COUNT_TEXT_2}</p>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams}
                                      placeholder={LABELS_AND_HEADINGS.FILTER_NAME}/>
                    <div className={"sms-section--light"}>
                        {
                            loading ?
                                <OverlaySpinner/>
                                :
                                <UsersList usersData={usersData} setUsersData={setUsersData} query={query}/>
                        }
                        <IconButton variant={"outline-primary"} icon={faArrowLeft}
                                    onClick={() => handleBacking(navigate)}
                                    label={LABELS.COMMON.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
