import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import countryData from "../../../helpers/valueLists/countries.json";
import {getObjectNameById} from "../../../helpers/functions";


export const AdminPublisherInfo = ({publisher}) => {

    return publisher && (
        <>
            {
                publisher.image_url && publisher.image_filename &&
                <div className={"col-12 col-sm-6 col-md-4"}>
                    <img
                        src={publisher.image_url}
                        alt={publisher.image_filename}
                        className="w-100 mb-3"
                    />
                </div>
            }
            <h2>{LABELS_AND_HEADINGS.ID}: {publisher.id}</h2>
            <h3>{LABELS_AND_HEADINGS.COUNTRY}: {getObjectNameById(countryData, publisher.country_id)}</h3>
        </>
    )
}
