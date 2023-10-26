import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../helpers/functions/functions";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {TitlesListItem} from "./TitlesListItem";
import {useFormatQueryFilter} from "../../helpers/customHooks/useFormatQueryFilter";
import FilterFormFormat from "../search-filter/FilterFormFormat";


export const Titles = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [setSearchParams, query, comic, comiclarge, album, pocket, hardcover, special, collectible] = useFormatQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                    <FilterFormFormat
                        setSearchParams={setSearchParams}
                        query={query}
                        comic={comic}
                        comiclarge={comiclarge}
                        album={album}
                        pocket={pocket}
                        hardcover={hardcover}
                        special={special}
                        collectible={collectible}
                        placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    query ?
                                        filterTitlesData(titlesData, query, comic, comiclarge, album, pocket, hardcover, special, collectible)
                                            .map((title) =>
                                                <TitlesListItem key={title.id} title={title}/>
                                            )
                                        :
                                        titlesData
                                            .filter((title) => {
                                                if (hasTrueValue([comic, comiclarge, album, pocket, hardcover, special, collectible])) {
                                                    return (
                                                        filterByFormat(title, comic, comiclarge, album, pocket, hardcover, special, collectible)
                                                    )
                                                } else {
                                                    return true;
                                                }
                                            })
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
