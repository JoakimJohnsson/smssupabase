import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS} from "../../helpers/constants/configConstants";
import {TABLES} from "../../helpers/constants/serviceConstants";
import {getRowsByTable} from "../../services/serviceFunctions";
import {HeadingWithBreadCrumbs} from "../headings";
import {OverlaySpinner} from "../minis/OverlaySpinner";
import {useSimpleQueryFilter} from "../../helpers/customHooks/useSimpleQueryFilter";
import FilterFormSimple from "../searchFilter/FilterFormSimple";
import {sortByName} from "../../helpers/functions";
import {Link} from "react-router-dom";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";


export const Publishers = () => {

    const [loading, setLoading] = useState(true);
    const [publishersData, setPublishersData] = useState(null);
    const {setSearchParams, query} = useSimpleQueryFilter();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then(() => setLoading(false));
    }, [])

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"sms-page-col"}>
                    <HeadingWithBreadCrumbs text={LABELS.SECTIONS.PUBLISHERS.ALL_PUBLISHERS}/>
                    <FilterFormSimple query={query} setSearchParams={setSearchParams} placeholder={LABELS_AND_HEADINGS.FILTER_PUBLISHER_NAME}/>
                    {
                        loading ?
                            <OverlaySpinner/>
                            :
                            <ul className={"sms-list--with-cards"}>
                                {
                                    query ?
                                        publishersData
                                            .filter(publisher => publisher.name.toLowerCase()
                                                    .includes(query.toLowerCase()) ||
                                                query === ""
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
                                                                loading={"lazy"}
                                                            />
                                                        </div>
                                                    </Link>
                                                </li>
                                            )
                                        :
                                        publishersData
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
                                                                loading={"lazy"}
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
