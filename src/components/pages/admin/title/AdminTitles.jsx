import React, {useEffect, useState} from "react";
import {ROUTES} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {TABLES} from "../../../../helpers/constants/serviceConstants";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {getRowsByTable} from "../../../../services/serviceFunctions";
import {IconButton} from "../../../minis/IconButton";
import {useNavigate} from "react-router-dom";
import {
    filterAdminTitlesData,
    filterByIsValued,
    handleBacking,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../../../helpers/functions";
import {faArrowLeft, faPlus} from "@fortawesome/pro-regular-svg-icons";
import FilterFormAdminTitles from "../../../searchFilter/FilterFormAdminTitles";
import {useAdminTitlesQueryFilter} from "../../../../helpers/customHooks/useAdminTitlesQueryFilter";
import {LazyTextPlaceholder} from "../../../minis/LazyTextPlaceholder";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {HeadingWithBreadCrumbs} from "../../../headings";


export const AdminTitles = () => {

    const [titlesData, setTitlesData] = useState(null);
    const [filteredTitlesData, setFilteredTitlesData] = useState(null);
    const navigate = useNavigate();
    const {setSearchParams, query, isvalued, isnotvalued} = useAdminTitlesQueryFilter();

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
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={LABELS.SECTIONS.TITLES.ALL_TITLES}/>
            <FilterFormAdminTitles query={query} isvalued={isvalued} isnotvalued={isnotvalued}
                                   setSearchParams={setSearchParams} placeholder={TEXTS.FILTER_TITLE_OR_YEAR}/>
            <p className={"text-uppercase fs-large placeholder-glow"}>
                {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredTitlesData ?
                                filteredTitlesData.length
                                :
                                <LazyTextPlaceholder charCount={2}/>
                        }
                        </span> {TEXTS.SHOWING_OF} {titlesData ? titlesData.length :
                <LazyTextPlaceholder charCount={3}/>} {LABELS.SECTIONS.TITLES.TITLES}
            </p>
            <div className={"sms-section--light"}>
                {
                    filteredTitlesData ?
                        <TitlesList titlesData={filteredTitlesData} setTitlesData={setTitlesData}
                                    showAdminInfo={true} query={query} showToolbox/>
                        :
                        <OverlaySpinner/>
                }
                <IconButton variant={"primary"} icon={faPlus} onClick={() => navigate(ROUTES.ADMIN.TITLE_ADD)}
                            label={LABELS.SECTIONS.TITLES.ADD_TITLE}/>
                <IconButton variant={"outline-primary"} icon={faArrowLeft} onClick={() => handleBacking(navigate)}
                            label={LABELS.COMMON.BACK}/>
            </div>
        </div>
    )
}
