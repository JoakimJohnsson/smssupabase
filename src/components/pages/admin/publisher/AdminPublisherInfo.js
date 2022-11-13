import React from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import countryData from "../../../../helpers/valueLists/countries.json";
import {getObjectNameById} from "../../../../helpers/functions";


export const AdminPublisherInfo = ({publisher}) => {

    return publisher && (
        <>
            <h2>{LABELS_AND_HEADINGS.ID}: {publisher.id}</h2>
            <h3>{LABELS_AND_HEADINGS.COUNTRY}: {getObjectNameById(countryData, publisher.country_id)}</h3>
            <p>image_filename: {publisher.image_filename}</p>
            <p>image_url: {publisher.image_url}</p>
        </>
    )
}
