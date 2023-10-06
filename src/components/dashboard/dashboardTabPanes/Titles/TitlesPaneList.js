import React from "react";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../../../helpers/functions/functions";
import {Link} from "react-router-dom";
import {TitlesPaneListItem} from "./TitlesPaneListItem";


export const TitlesPaneList = ({query, titlesData, comic, comiclarge, album, pocket, hardcover, special}) => {

    return (
        <ul className={"sms-list--with-cards"}>
            {
                query ?
                    filterTitlesData(titlesData, query, comic, comiclarge, album, pocket, hardcover, special)
                        .map((t) =>
                            <li key={t.id} className={"title-card"}>
                                <Link to={`/titles/${t.id}`} className={"hocus-standard"}
                                      title={t.name}>
                                    <div className={"image-container mb-2 position-relative"}>
                                        <img
                                            src={t.image_url}
                                            alt={t.name}
                                            className="w-100"
                                            loading={"lazy"}
                                        />
                                    </div>
                                </Link>
                            </li>
                        )
                    :
                    titlesData
                        .filter((title) => {
                            if (hasTrueValue([comic, comiclarge, album, pocket, hardcover, special])) {
                                return (
                                    filterByFormat(title, comic, comiclarge, album, pocket, hardcover, special)
                                )
                            } else {
                                return true;
                            }
                        })
                        .sort((a, b) => sortByNameAndStartYear(a, b))
                        .map((t) =>
                            <TitlesPaneListItem title={t}/>
                        )
            }
        </ul>
    )
}
