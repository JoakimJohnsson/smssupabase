import React, {useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../miniComponents/Spinner";
import {LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import countryData from "../../../helpers/valueLists/countries.json";
import {getObjectNameById, isTrue} from "../../../helpers/functions";
import {AdminH1} from "../../headings";
import {getRowByTableAndId} from "../../serviceFunctions";
import {ToggleEditButtons} from "../../miniComponents/ToggleEditButton";


export const AdminPublisher = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get('edit'));
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={publisher.name}/>
                    {
                        publisher.image_url && publisher.image_filename &&
                        <div className={"col-12 col-sm-6 col-md-4"}>
                            <img
                                src={publisher.image_url}
                                alt={publisher.image_filename}
                                className='w-100 mb-3'
                            />
                        </div>
                    }
                    <ToggleEditButtons edit={edit} setSearchParams={setSearchParams}/>
                    <h2>{LABELS_AND_HEADINGS.ID}: {publisher.id}</h2>
                    <h3>{LABELS_AND_HEADINGS.COUNTRY}: {getObjectNameById(countryData, publisher.country_id)}</h3>
                </div>
            </div>
        </main>
    )
}
