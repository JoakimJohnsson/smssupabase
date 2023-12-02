import React, {useState, useEffect} from "react";
import {LABELS_AND_HEADINGS, PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import FilterFormFormat from "../../../search-filter/FilterFormFormat";
import {useFormatQueryFilter} from "../../../../helpers/customHooks/useFormatQueryFilter";
import {TitlesPaneList} from "./TitlesPaneList";


export const TitlesPane = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [setSearchParams, query, comic, comiclarge, album, pocket, hardcover, special, collectible] = useFormatQueryFilter();
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
                    <TitlesPaneList query={query} titlesData={titlesData} comic={comic} comiclarge={comiclarge} album={album} pocket={pocket}
                                    hardcover={hardcover} special={special} collectible={collectible}/>

            }
        </>
    )
}
