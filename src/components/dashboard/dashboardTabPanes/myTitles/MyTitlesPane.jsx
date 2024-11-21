import React, {useState, useEffect} from "react";
import {PANES, TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import FilterFormFormat from "../../../searchFilter/FilterFormFormat";
import {useFormatQueryFilter} from "../../../../helpers/customHooks/useFormatQueryFilter";
import {MyTitlesPaneList} from "./MyTitlesPaneList";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";


export const MyTitlesPane = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
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
    const {user} = useAppContext();

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                await getTitlesForUser(user.id, setTitlesData);
            } catch (error) {
                console.error('Failed to fetch titles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTitles(); // It's ok to ignore returned Promise here
    }, [user.id]);

    return (
        <div className="col-12">
            <div className="row row-padding--main">
                <HeadingWithBreadCrumbs text={PANES.TITLES.NAME}/>
                {
                    loading ?
                        <OverlaySpinner/>
                        :
                        <div>
                            <FilterFormFormat
                                setSearchParams={setSearchParams}
                                query={query}
                                comic={comic}
                                comiclarge={comiclarge}
                                album={album}
                                pocket={pocket}
                                hardcover={hardcover}
                                special={special}
                                placeholder={TEXTS.FILTER_TITLE_OR_YEAR}/>
                            <MyTitlesPaneList query={query} titlesData={titlesData} comic={comic}
                                              comiclarge={comiclarge} album={album} pocket={pocket}
                                              hardcover={hardcover} special={special} collectible={collectible}/>
                        </div>

                }
            </div>
        </div>
    )
}
