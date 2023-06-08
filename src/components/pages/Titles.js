import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {Link} from "react-router-dom";
import FilterForm from "../search-filter/FilterForm";
import {sortByNameAndStartYear} from "../../helpers/functions/functions";
import {TitleTool} from "../lists/TitleTool";
import {useSearchFilter} from "../../helpers/customHooks/useSearchFilter";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";


export const Titles = () => {

    const [loading, setLoading] = useState(true);
    const [titlesData, setTitlesData] = useState(null);
    const [searchParams, setSearchParams, filter] = useSearchFilter();

    useEffect(() => {
        getRowsByTable(TABLES.TITLES, setTitlesData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_TITLES}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-page-col"}>
                    <FilterForm filter={filter} searchParams={searchParams} setSearchParams={setSearchParams}
                                placeholder={LABELS_AND_HEADINGS.FILTER_TITLE_OR_YEAR}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    titlesData
                                        .filter(title => title.name.toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            title.start_year.toString().toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            filter === ""
                                        )
                                        .sort((a, b) => sortByNameAndStartYear(a, b))
                                        .map((title) =>
                                            <li key={title.id} className={"title-card"}>
                                                <Link to={`/titles/${title.id}`} className={"hocus-standard"}
                                                      title={title.name + " " + title.start_year}>
                                                    <div className={"image-container mb-2 position-relative"}>
                                                        <img
                                                            src={title.image_url}
                                                            alt={LABELS_AND_HEADINGS.TITLE + " " + title.name}
                                                            className="w-100"
                                                            loading={"lazy"}
                                                        />
                                                        {
                                                            <div className={"title-card--year"}>{title.start_year}</div>
                                                        }
                                                    </div>
                                                </Link>
                                                <TitleTool title={title} displayName={title.name + " " + title.start_year} isCard/>
                                            </li>
                                        )
                                }
                            </ul>
                    }
                </div>
            </div>
        </main>
    )
}
