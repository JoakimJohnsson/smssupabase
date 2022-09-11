import React from "react";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {getObjectNameById} from "../../../helpers/functions";
import {PublisherInformation} from "../../miniComponents/PublisherInformation";


export const AdminTitleInfo = ({title, formatData}) => {

    return title && formatData && (
        <>
            {
                title.image_url && title.image_filename &&
                <div className={"col-12 col-sm-6 col-md-4"}>
                    <img
                        src={title.image_url}
                        alt={title.image_filename}
                        className="w-100 mb-3"
                    />
                </div>
            }
            <h2>{LABELS_AND_HEADINGS.ID}: {title.id}</h2>
            <h3>{LABELS_AND_HEADINGS.FORMAT}: {getObjectNameById(formatData, title.format_id)}</h3>
            <h3>{LABELS_AND_HEADINGS.TOTAL_ISSUES}: {title.total_issues}</h3>
            {title && <PublisherInformation title={title}/>}
        </>
    )
}
