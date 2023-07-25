import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import FilterForm from "../search-filter/FilterForm";
import {sortByNameAndStartYear} from "../../helpers/functions/functions";
import {useSearchFilter} from "../../helpers/customHooks/useSearchFilter";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {TitlesListItem} from "./TitlesListItem";


export const Titles = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [searchParams, setSearchParams, filterQuery] = useSearchFilter();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                    <FilterForm filterQuery={filterQuery} searchParams={searchParams} setSearchParams={setSearchParams}
                                placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    titlesData
                                        .filter(title => title.name.toLowerCase()
                                                .includes(filterQuery.toLowerCase()) ||
                                            title.start_year.toString().toLowerCase()
                                                .includes(filterQuery.toLowerCase()) ||
                                            filterQuery === ""
                                        )
                                        .sort((a, b) => sortByNameAndStartYear(a, b))
                                        .map((title) =>
                                            <TitlesListItem key={title.id} title={title}/>
                                        )
                                }
                            </ul>
                    }
                </div>
            </div>
        </main>
    )
}
