import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../miniComponents/Spinner";
import {getRowByTableAndId} from "../../serviceFunctions";
import {LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import formatData from "../../../helpers/valueLists/formats.json";
import {getObjectNameById} from "../../../helpers/functions";
import {PublisherInformation} from "../../miniComponents/PublisherInformation";
import {AdminH1} from "../../headings";


export const AdminTitle = () => {
    const [title, setTitle] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then();
    }, [id])

    return title && formatData ? (
            <main className={"container-fluid main-container"}>
                <div className={"row"}>
                    <div className={"col-12 main-col"}>
                        <AdminH1 text={title.name + " " + title.start_year + " - " + title.end_year}/>
                        {
                            title.image_url && title.image_filename &&
                            <div className={"col-12 col-sm-6 col-md-4"}>
                                <img
                                    src={title.image_url}
                                    alt={title.image_filename}
                                    className='w-100 mb-3'
                                />
                            </div>
                        }
                        <h2>{LABELS_AND_HEADINGS.ID}: {title.id}</h2>
                        <h3>{LABELS_AND_HEADINGS.FORMAT}: {getObjectNameById(formatData, title.format_id)}</h3>
                        <h3>{LABELS_AND_HEADINGS.TOTAL_ISSUES}: {title.total_issues}</h3>
                        <PublisherInformation title={title}/>
                    </div>
                </div>
            </main>
        )
        :
        (<Spinner/>)
}
