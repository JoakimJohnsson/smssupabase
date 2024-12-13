import React, {useEffect, useState} from "react";
import {TEXTS} from "../../../helpers/constants/textConstants/texts.js";
import {TABLES} from "../../../helpers/constants/serviceConstants.js";
import {LABELS} from "../../../helpers/constants/textConstants/labelsAndHeadings.js";
import {HeadingWithBreadCrumbs} from "../../headings/index.jsx";
import {OverlaySpinner} from "../../minis/OverlaySpinner.jsx";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../../helpers/functions.jsx";
import {getRowsByTable} from "../../../services/serviceFunctions.js";
import {TitlesListItem} from "./TitlesListItem.jsx";
import {useFormatQueryFilter} from "../../../helpers/customHooks/useFormatQueryFilter.js";
import FilterFormFormat from "../../searchFilter/FilterFormFormat.jsx";

import FilteredListInfo from "../../searchFilter/FilteredListInfo.jsx";


export const Titles = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [filteredTitlesData, setFilteredTitlesData] = useState(null);
    const {
        setSearchParams,
        query,
        comic,
        comiclarge,
        album,
        pocket,
        hardcover,
        special,
        collectible
    } = useFormatQueryFilter();

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
                    placeholder={TEXTS.FILTER_TITLE_OR_YEAR}/>
                <FilteredListInfo filteredData={filteredTitlesData} totalData={titlesData}/>
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
    )
}
