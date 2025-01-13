import React, {useEffect, useState} from "react";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {PublishersList} from "../../../lists/publishers/PublishersList";
import {IconButton} from "../../../minis/IconButton";
import {useNavigate} from "react-router-dom";
import {handleBacking} from "../../../../helpers/functions";
import {faArrowLeft, faPlus} from "@fortawesome/pro-regular-svg-icons";
import {useSimpleQueryFilter} from "../../../../helpers/customHooks/useSimpleQueryFilter";
import FilterFormSimple from "../../../searchFilter/FilterFormSimple";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";


export const AdminPublishers = () => {

    const [publishersData, setPublishersData] = useState(null);
    const navigate = useNavigate();
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}/>
            <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={TEXTS.FILTER_NAME}/>
            <div className={"sms-section--light"}>
                {
                    publishersData ?
                        <PublishersList publishersData={publishersData} setPublishersData={setPublishersData}
                                        showAdminInfo={true}
                                        query={query}/>
                        :
                        <OverlaySpinner/>
                }
                <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.PUBLISHER_ADD)}
                            label={LABELS.SECTIONS.PUBLISHERS.ADD_PUBLISHER}/>
                <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                            label={LABELS.COMMON.BACK}/>
            </div>
        </div>
    )
}
