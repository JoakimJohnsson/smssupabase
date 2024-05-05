import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TEXTS} from "../../helpers/constants/configConstants";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {
    filterByFormat,
    filterTitlesData,
    hasTrueValue,
    sortByNameAndStartYear
} from "../../helpers/functions";
import {useFormatQueryFilter} from "../../helpers/customHooks/useFormatQueryFilter";
import {getRowsByTable} from "../../services/serviceFunctions";
import FilterFormFormat from "../search-filter/FilterFormFormat";
import {LazyTextPlaceholder} from "../minis/LazyTextPlaceholder";
import {GradeValuesListItem} from "./GradeValuesListItem";
import {Accordion} from "react-bootstrap";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";
import {FormatBadge} from "../minis/FormatBadge";


export const GradeValues = () => {

    const [loading, setLoading] = useState(true);
    const [activeKey, setActiveKey] = useState(null);
    const [titlesData, setTitlesData] = useState(null);
    const [filteredTitlesData, setFilteredTitlesData] = useState(null);
    const {setSearchParams, query, comic, comiclarge, album, pocket, hardcover, special, collectible} = useFormatQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (titlesData) {
            if (query) {
                setFilteredTitlesData(filterTitlesData(titlesData, query, comic, comiclarge, album, pocket, hardcover, special, collectible));
            } else {
                setFilteredTitlesData(titlesData
                    .filter((title) => {
                        if (hasTrueValue([comic, comiclarge, album, pocket, hardcover, special, collectible])) {
                            return (
                                filterByFormat(title, comic, comiclarge, album, pocket, hardcover, special, collectible)
                            )
                        } else {
                            return true;
                        }
                    }).sort((a, b) => sortByNameAndStartYear(a, b)));
            }
        }
    }, [album, collectible, comic, comiclarge, hardcover, pocket, query, special, titlesData]);

    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.GRADES.GRADE_VALUES}/>
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
                        placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
                    <p className={"text-uppercase fs-large placeholder-glow"}>
                        {TEXTS.SHOWING} <span className={"fw-bolder"}>
                        {
                            filteredTitlesData ?
                                filteredTitlesData.length
                                :
                                <LazyTextPlaceholder charCount={2}/>
                        }
                        </span> {TEXTS.SHOWING_OF} {titlesData ? titlesData.length :
                        <LazyTextPlaceholder charCount={3}/>} {LABELS_AND_HEADINGS.TITLES}
                    </p>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <Accordion className={"sms-list--accordion mb-4"} flush onSelect={handleSelect}>
                                {
                                    filteredTitlesData &&
                                    filteredTitlesData.map(
                                        (title, index) =>
                                            <AccordionItem eventKey={index.toString()} key={index} onToggle={() => {
                                                setActiveKey(index.toString())
                                            }}>
                                                <AccordionHeader as={"h2"} className={"pb-0 mb-0"}>{title.name}
                                                    <FormatBadge formatId={title.format_id} customClass={"d-inline-block mx-3 mb-0"}
                                                                 year={title.start_year}/></AccordionHeader>
                                                <AccordionBody>
                                                    <GradeValuesListItem title={title} isActive={activeKey === index.toString()}/>
                                                </AccordionBody>
                                            </AccordionItem>
                                    )
                                }
                            </Accordion>
                    }
                </div>
            </div>
        </main>
    )
}
