import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../helpers/constants";
import {getRowByTableAndId} from "../serviceFunctions";
import {getObjectNameById} from "../../helpers/functions";
import countryData from "../../helpers/valueLists/countries.json";
import {Link} from "react-router-dom";


export const PublisherInformation = ({title}) => {
    const [publisher, setPublisher] = useState(null);

    useEffect(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, title.publisher).then();
    }, [title.publisher])

    return publisher && countryData && (
        <>
            <h3><span>{LABELS_AND_HEADINGS.PUBLISHERS}:</span> <Link to={ROUTES.ADMIN.PUBLISHERS + publisher.id}>{publisher.name}</Link></h3>
            <h3><span>{LABELS_AND_HEADINGS.COUNTRY}:</span> <span>{getObjectNameById(countryData, publisher.country_id)}</span></h3>
        </>

    )
}
