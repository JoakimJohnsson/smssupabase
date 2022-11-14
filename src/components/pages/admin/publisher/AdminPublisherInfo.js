import React from "react";
import {LABELS_AND_HEADINGS} from "../../../../helpers/constants";
import countryData from "../../../../helpers/valueLists/countries.json";
import {getObjectNameById} from "../../../../helpers/functions";


export const AdminPublisherInfo = ({publisher}) => {

    return publisher && (
        <>
            <h2>{publisher.name}</h2>
            <p><span className={"text-label"}>{LABELS_AND_HEADINGS.COUNTRY}:</span> {getObjectNameById(countryData, publisher.country_id)}</p>
            <p><span className={"text-label"}>{LABELS_AND_HEADINGS.IMAGE}:</span> {publisher.image_filename}</p>
            <p><span className={"text-label"}>{LABELS_AND_HEADINGS.IMAGE} URL:</span> {publisher.image_url}</p>
        </>
    )
}
