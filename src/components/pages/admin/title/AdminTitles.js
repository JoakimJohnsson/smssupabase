import React, {useEffect, useState} from "react";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {IconButton} from "../../../minis/IconButton";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {handleBacking} from "../../../../helpers/functions";
import {faArrowLeft, faPlus} from "@fortawesome/pro-regular-svg-icons";
import FilterFormSimple from "../../../search-filter/FilterFormSimple";
import {useSimpleQueryFilter} from "../../../../helpers/customHooks/useSimpleQueryFilter";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const navigate = useNavigate();
    const [setSearchParams, query] = useSimpleQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then();
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                    <Breadcrumbs/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
                    <div className={"sms-section--light"}>
                        {
                            titlesData ?
                                <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={true} query={query} showToolbox/>
                                :
                                <CustomSpinner className={"mb-3 d-block"}/>
                        }
                        <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD)}
                                    label={LABELS_AND_HEADINGS.ADD_TITLE}/>
                        <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                                    label={LABELS_AND_HEADINGS.BACK}/>
                    </div>
                </div>
            </div>
        </main>
    )
}
