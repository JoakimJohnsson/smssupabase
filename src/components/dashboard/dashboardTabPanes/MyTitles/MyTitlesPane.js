import React, {useState, useEffect} from "react";
import {LABELS_AND_HEADINGS, PANES} from "../../../../helpers/constants";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import FilterFormFormat from "../../../search-filter/FilterFormFormat";
import {useFormatQueryFilter} from "../../../../helpers/customHooks/useFormatQueryFilter";
import {MyTitlesPaneList} from "./MyTitlesPaneList";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";


export const MyTitlesPane = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const {setSearchParams, query, comic, comiclarge, album, pocket, hardcover, special, collectible} = useFormatQueryFilter();
    const {user} = useAppContext();

    useEffect(() => {
        getTitlesForUser(user.id, setTitlesData).then(() => setLoading(false));
    }, [user.id])

    return (
        <div className={"sms-page-col"}>
            <HeadingWithBreadCrumbs text={PANES.TITLES.NAME}/>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
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
                        <MyTitlesPaneList query={query} titlesData={titlesData} comic={comic} comiclarge={comiclarge} album={album} pocket={pocket}
                                          hardcover={hardcover} special={special} collectible={collectible}/>
                    </>

            }
        </div>
    )
}
