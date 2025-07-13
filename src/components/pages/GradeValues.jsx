import React, {useEffect, useState} from "react";
import {debounce} from "lodash"; // Import lodash for debouncing
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../helpers/constants/textConstants/texts";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../helpers/functions";
import {useFormatQueryFilter} from "../../helpers/customHooks/useFormatQueryFilter";
import {getRowsByTable} from "../../services/serviceFunctions";
import FilterFormFormat from "../searchFilter/FilterFormFormat";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {GradeValuesListItem} from "./GradeValuesListItem";
import {Accordion} from "react-bootstrap";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";
import {FormatBadge} from "../minis/FormatBadge";
import {PageMainContent} from "./pagecomponents/PageMainContent.jsx";

export const GradeValues = () => {
    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState(null);
    const [titlesData, setTitlesData] = useState(null);
    const [filteredTitlesData, setFilteredTitlesData] = useState(null);
    const [debouncedQuery, setDebouncedQuery] = useState(""); // New state for debounced query
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
                    filterTitlesData(
                        titlesData,
                        debouncedQuery,
                        comic,
                        comiclarge,
                        album,
                        pocket,
                        hardcover,
                        special,
                        collectible
                    )
                );
            } else {
                setFilteredTitlesData(
                    titlesData
                        .filter((title) => {
                            if (
                                hasTrueValue([
                                    comic,
                                    comiclarge,
                                    album,
                                    pocket,
                                    hardcover,
                                    special,
                                    collectible
                                ])
                            ) {
                                return filterByFormat(
                                    title,
                                    comic,
                                    comiclarge,
                                    album,
                                    pocket,
                                    hardcover,
                                    special,
                                    collectible
                                );
                            }
                            return true;
                        })
                        .sort((a, b) => sortByNameAndStartYear(a, b))
                );
            }
        }
    }, [
        debouncedQuery,
        titlesData,
        comic,
        comiclarge,
        album,
        pocket,
        hardcover,
        special,
        collectible
    ]);

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };

    return (
        <PageMainContent heading={LABELS.SECTIONS.GRADES.GRADE_VALUES}>
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
                placeholder={TEXTS.FILTER_TITLE_OR_YEAR}
            />
            <p className={"text-uppercase fs-large placeholder-glow"}>
                {TEXTS.SHOWING}{" "}
                <span className={"fw-bolder"}>
                    {filteredTitlesData ? (
                        filteredTitlesData.length
                    ) : (
                        <LazyTextPlaceholder charCount={2}/>
                    )}
                </span>{" "}
                {TEXTS.SHOWING_OF}{" "}
                {titlesData ? (
                    titlesData.length
                ) : (
                    <LazyTextPlaceholder charCount={3}/>
                )}{" "}
                {LABELS.SECTIONS.TITLES.TITLES}
            </p>
            {loading ? (
                <OverlaySpinner/>
            ) : (
                <Accordion
                    className={"sms-list--accordion mb-4"}
                    flush
                    onSelect={handleSelect}
                >
                    {filteredTitlesData &&
                        filteredTitlesData.map((title, index) => (
                            <AccordionItem
                                eventKey={index.toString()}
                                key={index}
                                onToggle={() => {
                                    setActiveKey(index.toString());
                                }}
                            >
                                <AccordionHeader
                                    as={"h2"}
                                    className={"pb-0 mb-0"}
                                >
                                    {title.name}
                                    <FormatBadge
                                        formatId={title.format_id}
                                        customClass={"d-inline-block mx-3 mb-0"}
                                        year={title.start_year}
                                    />
                                </AccordionHeader>
                                <AccordionBody>
                                    <GradeValuesListItem
                                        title={title}
                                        isActive={activeKey === index.toString()}
                                    />
                                </AccordionBody>
                            </AccordionItem>
                        ))}
                </Accordion>
            )}
        </PageMainContent>
    );
};
