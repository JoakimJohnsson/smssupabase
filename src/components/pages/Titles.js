import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../helpers/functions";
import {getRowsByTable} from "../../services/serviceFunctions";
import {TitlesListItem} from "./TitlesListItem";
import {useFormatQueryFilter} from "../../helpers/customHooks/useFormatQueryFilter";
import FilterFormFormat from "../search-filter/FilterFormFormat";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {LABELS} from "../../helpers/textConstants/labelsAndHeadings";


export const Titles = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [filteredTitlesData, setFilteredTitlesData] = useState(null);
    const {setSearchParams, query, comic, comiclarge, album, pocket, hardcover, special, collectible} = useFormatQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (titlesData) {
            if (query) {
                setFilteredTitlesData(filterTitlesData(titlesData, query, comic, comiclarge, album, pocket, hardcover, special, collectible));
            } else {
                setFilteredTitlesData(titlesData
                    .filter((title) => {
                        if (hasTrueValue([comic, comiclarge, album, pocket, hardcover, special, collectible])) {
                            return (
                                filterByFormat(title, comic, comiclarge, album, pocket, hardcover, special, collectible)
                            )
                        } else {
                            return true;
                        }
                    }).sort((a, b) => sortByNameAndStartYear(a, b)));
            }
        }
    }, [album, collectible, comic, comiclarge, hardcover, pocket, query, special, titlesData]);

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.TITLES.ALL_TITLES}/>
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
                    <p className={"text-uppercase fs-large placeholder-glow"}>
                        {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredTitlesData ?
                                filteredTitlesData.length
                                :
                                <LazyTextPlaceholder charCount={2}/>
                        }
                        </span> {TEXTS.SHOWING_OF} {titlesData ? titlesData.length : <LazyTextPlaceholder charCount={3}/>} {LABELS_AND_HEADINGS.TITLES}
                    </p>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    filteredTitlesData &&
                                    filteredTitlesData.map((title) => <TitlesListItem key={title.id} title={title}/>)
                                }
                            </ul>
                    }
                </div>
            </div>
        </main>
    )
}
