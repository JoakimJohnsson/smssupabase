import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {IconButton} from "../../../minis/IconButton";
import {useNavigate} from "react-router-dom";
import {handleBacking} from "../../../../helpers/functions";
import {faArrowLeft, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {useSimpleQueryFilter} from "../../../../helpers/customHooks/useSimpleQueryFilter";
import FilterFormSimple from "../../../search-filter/FilterFormSimple";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";


export const AdminPublishers = () => {

    const [publishersData, setPublishersData] = useState(null);
    const navigate = useNavigate();
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_NAME}/>
                    <div className={"sms-section--light"}>
                        {
                            publishersData ?
                                <PublishersList publishersData={publishersData} setPublishersData={setPublishersData} showAdminInfo={true}
                                                query={query}/>
                                :
                                <OverlaySpinner/>
                        }
                        <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)}
                                    label={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS_AND_HEADINGS.BACK}/>
                    </div>

                </div>
            </div>
        </main>
    )
}
