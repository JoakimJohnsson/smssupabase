import React, {useEffect, useState} from "react";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {LABELS_AND_HEADINGS, ROUTES, TABLES, TEXTS} from "../../../../helpers/constants";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {IconButton} from "../../../minis/IconButton";
import {useNavigate} from "react-router-dom";
import {Breadcrumbs} from "../../../minis/Breadcrumbs";
import {
    filterAdminTitlesData,
    filterByIsValued,
    handleBacking,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../../../helpers/functions";
import {faArrowLeft, faPlus} from "@fortawesome/pro-regular-svg-icons";
import FilterFormAdminTitles from "../../../search-filter/FilterFormAdminTitles";
import {useAdminTitlesQueryFilter} from "../../../../helpers/customHooks/useAdminTitlesQueryFilter";
import {LazyTextPlaceholder} from "../../../minis/LazyTextPlaceholder";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const [filteredTitlesData, setFilteredTitlesData] = useState(null);
    const navigate = useNavigate();
    const [setSearchParams, query, isvalued, isnotvalued] = useAdminTitlesQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then();
    }, []);

    useEffect(() => {
        if (titlesData) {
            if (query) {
                setFilteredTitlesData(filterAdminTitlesData(titlesData, query, isvalued, isnotvalued));
            } else {
                setFilteredTitlesData(titlesData
                    .filter((title) => {
                        if (hasTrueValue([isvalued, isnotvalued])) {
                            return (
                                filterByIsValued(title, isvalued, isnotvalued)
                            )
                        } else {
                            return true;
                        }
                    }).sort((a, b) => sortByNameAndStartYear(a, b)));
            }
        }
    }, [isnotvalued, isvalued, query, titlesData]);

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <h1 className={"text-icon-header"}>{LABELS_AND_HEADINGS.ALL_TITLES}</h1>
                    <Breadcrumbs/>
                    <FilterFormAdminTitles query={query} isvalued={isvalued} isnotvalued={isnotvalued} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
                    <p className={"text-uppercase fs-large"}>
                        {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredTitlesData ?
                                filteredTitlesData.length
                                :
                                <LazyTextPlaceholder charCount={2}/>
                        }
                        </span> {TEXTS.SHOWING_OF} {titlesData ? titlesData.length : <LazyTextPlaceholder charCount={3}/>} {LABELS_AND_HEADINGS.TITLES}
                    </p>
                    <div className={"sms-section--light"}>
                        {
                            filteredTitlesData ?
                                <TitlesList titlesData={filteredTitlesData} setTitlesData={setTitlesData} showAdminInfo={true} query={query} showToolbox/>
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
