import React, {useState, useEffect} from "react";
import {LABELS_AND_HEADINGS, PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../helpers/functions/serviceFunctions/titleFunctions";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import FilterFormFormat from "../../../search-filter/FilterFormFormat";
import {useFormatQueryFilter} from "../../../../helpers/customHooks/useFormatQueryFilter";
import {filterByFormat, filterQueryByNameAndStartYear, hasTrueValue, sortByNameAndStartYear} from "../../../../helpers/functions/functions";
import {Link} from "react-router-dom";


export const TitlesPane = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [setSearchParams, query, comic, comiclarge, album, pocket, hardcover, special] = useFormatQueryFilter();
    const {user} = useAppContext();

    useEffect(() => {
        getTitlesForUser(user.id, setTitlesData).then(() => setLoading(false));
    }, [user.id])

    return (
        <>
            <h1 className={"mb-5"}>{PANES.TITLES.NAME}</h1>
            <FilterFormFormat
                setSearchParams={setSearchParams}
                query={query}
                comic={comic}
                comiclarge={comiclarge}
                album={album}
                pocket={pocket}
                hardcover={hardcover}
                special={special}
                placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
            {
                loading ?
                    <CustomSpinner size={"4x"}/>
                    :
                    <ul className={"sms-list--with-cards"}>
                        {
                            query ?
                                titlesData
                                    .filter((title) => {
                                        return (
                                            filterQueryByNameAndStartYear(title, query)
                                        )
                                    })
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
                        }
                    </ul>

            }
        </>
    )
}
