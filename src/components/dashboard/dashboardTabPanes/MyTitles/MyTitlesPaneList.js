import React from "react";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../../../helpers/functions";
import {MyTitlesPaneListItem} from "./MyTitlesPaneListItem";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";


export const MyTitlesPaneList = ({query, titlesData, comic, comiclarge, album, pocket, hardcover, special, collectible}) => {

    return titlesData && !!titlesData.length ?
        (
            <ul className={"sms-list--with-cards"}>
                {
                    query ?
                        filterTitlesData(titlesData, query, comic, comiclarge, album, pocket, hardcover, special, collectible)
                            .map((t) =>
                                <MyTitlesPaneListItem key={t.id} title={t}/>
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
                            .map((t) =>
                                <MyTitlesPaneListItem key={t.id} title={t}/>
                            )
                }
            </ul>
        )
        :
        <NoDataAvailable/>
}
