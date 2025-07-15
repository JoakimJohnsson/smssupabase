import React, {useMemo} from "react";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../../../helpers/functions";
import {MyTitlesPaneListItem} from "./MyTitlesPaneListItem";
import FilteredListInfo from "../../../searchFilter/FilteredListInfo.jsx";
import {SmsListWithCards} from "../../../pages/pagecomponents/SmsListWithCards.jsx";


export const MyTitlesPaneList = (props) => {
    const {
        query,
        titlesData,
        ...formats // Capture comic, comiclarge, album, pocket, hardcover, special, collectible as formats
    } = props;

    // Check if any format filters are active
    const isFormatFilterActive = useMemo(() => hasTrueValue(Object.values(formats)), [formats]);

    // Memoize filtered and sorted data
    const filteredTitles = useMemo(() => {
        if (!titlesData || !titlesData.length) return [];

        if (query) {
            return filterTitlesData(titlesData, query, ...Object.values(formats));
        }

        const filtered = isFormatFilterActive
            ? titlesData.filter((title) => filterByFormat(title, ...Object.values(formats)))
            : titlesData;

        return filtered.sort((a, b) => sortByNameAndStartYear(a, b));
    }, [titlesData, query, formats, isFormatFilterActive]);

    return (
        <>
            <FilteredListInfo filteredData={filteredTitles} totalData={titlesData}/>
            <SmsListWithCards>
                {filteredTitles.map((t) => (
                    <MyTitlesPaneListItem key={t.id} title={t}/>
                ))}
            </SmsListWithCards>
        </>
    );
};
