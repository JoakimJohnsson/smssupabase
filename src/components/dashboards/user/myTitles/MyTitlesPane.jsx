import React, {useState, useEffect} from "react";
import {debounce} from "lodash";
import {PANES, TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {useAppContext} from "../../../../context/AppContext";
import {getTitlesForUser} from "../../../../services/titleService";
import FilterFormFormat from "../../../searchFilter/FilterFormFormat";
import {useFormatQueryFilter} from "../../../../helpers/customHooks/useFormatQueryFilter";
import {MyTitlesPaneList} from "./MyTitlesPaneList";
import {HeadingWithBreadcrumbs} from "../../../headings/HeadingWithBreadcrumbs.jsx";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";

export const MyTitlesPane = () => {
    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
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
    const {user} = useAppContext();

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                await getTitlesForUser(user.id, setTitlesData);
            } catch (error) {
                console.error("Failed to fetch titles:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTitles();
    }, [user.id]);

    // Debounce the query input
    useEffect(() => {
        const debouncedQueryUpdate = debounce(() => {
            setDebouncedQuery(query); // Update the debounced query state
        }, 300); // 300ms debounce time

        debouncedQueryUpdate();
        return () => debouncedQueryUpdate.cancel(); // Cleanup on unmount or query change
    }, [query]);

    return (
        <>
            <HeadingWithBreadcrumbs text={PANES.TITLES.NAME}/>
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
                            placeholder={TEXTS.FILTER_TITLE_OR_YEAR}
                        />
                        <MyTitlesPaneList
                            query={debouncedQuery}
                            titlesData={titlesData}
                            comic={comic}
                            comiclarge={comiclarge}
                            album={album}
                            pocket={pocket}
                            hardcover={hardcover}
                            special={special}
                            collectible={collectible}
                        />
                    </>
            }
        </>
    );
};
