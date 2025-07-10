import React, {useEffect, useState} from "react";
import { debounce } from "lodash";
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
import {SmsListWithCards} from "../pagecomponents/SmsListWithCards.jsx";


export const Titles = () => {
    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [filteredTitlesData, setFilteredTitlesData] = useState(null);
    const [debouncedQuery, setDebouncedQuery] = useState("");
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

    // Debounce the query input
    useEffect(() => {
        const debouncedQueryUpdate = debounce(() => {
            setDebouncedQuery(query); // Update the debounced query state
        }, 300); // 300ms debounce time

        debouncedQueryUpdate();
        return () => debouncedQueryUpdate.cancel(); // Cleanup on unmount or query change
    }, [query]);

    useEffect(() => {
        if (titlesData) {
            if (debouncedQuery) {
                setFilteredTitlesData(
                    filterTitlesData(titlesData, debouncedQuery, comic, comiclarge, album, pocket, hardcover, special, collectible)
                );
            } else {
                setFilteredTitlesData(
                    titlesData
                        .filter((title) => {
                            if (hasTrueValue([comic, comiclarge, album, pocket, hardcover, special, collectible])) {
                                return filterByFormat(title, comic, comiclarge, album, pocket, hardcover, special, collectible);
                            }
                            return true;
                        })
                        .sort((a, b) => sortByNameAndStartYear(a, b))
                );
            }
        }
    }, [debouncedQuery, titlesData, comic, comiclarge, album, pocket, hardcover, special, collectible]);

    return (
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
                    <SmsListWithCards>
                        {
                            filteredTitlesData &&
                            filteredTitlesData.map((title) => <TitlesListItem key={title.id} title={title}/>)
                        }
                    </SmsListWithCards>
            }
        </div>
    )
}