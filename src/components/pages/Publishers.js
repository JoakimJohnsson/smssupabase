import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../helpers/constants";
import {getRowsByTable} from "../../helpers/functions/serviceFunctions/serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useSearchFilter} from "../../helpers/customHooks/useSearchFilter";
import FilterForm from "../search-filter/FilterForm";
import {sortByName} from "../../helpers/functions/functions";
import {Link} from "react-router-dom";


export const Publishers = () => {

    const [loading, setLoading] = useState(true);
    const [publishersData, setPublishersData] = useState(null);
    const [searchParams, setSearchParams, filter] = useSearchFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then(() => setLoading(false));
    }, [])

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
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
                                    publishersData
                                        .filter(publisher => publisher.name.toLowerCase()
                                                .includes(filter.toLowerCase()) ||
                                            filter === ""
                                        )
                                        .sort((a, b) => sortByName(a, b))
                                        .map((publisher) =>
                                            <li key={publisher.id} className={"title-card"}>
                                                <Link to={`/publishers/${publisher.id}`} className={"hocus-standard"}
                                                      title={publisher.name}>
                                                    <div className={"image-container mb-2 position-relative"}>
                                                        <img
                                                            src={publisher.image_url}
                                                            alt={publisher.name}
                                                            className="w-100"
                                                        />
                                                    </div>
                                                </Link>
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
