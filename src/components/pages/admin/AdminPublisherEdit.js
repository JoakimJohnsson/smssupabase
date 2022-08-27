import React, {useEffect, useState} from "react";
import {LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import {AdminH1} from "../../headings";
import {useParams} from "react-router-dom";
import {getObjectNameById} from "../../../helpers/functions";
import countryData from "../../../helpers/valueLists/countries.json";
import {Spinner} from "../../miniComponents/Spinner";
import {getRowByTableAndId} from "../../serviceFunctions";


export const AdminPublisherEdit = () => {

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
                    <AdminH1 text={LABELS_AND_HEADINGS.EDIT_PUBLISHER}/>
                    <div className={'row'}>
                        <div className={'sms-dashboard-col'}>
                            <div className={'sms-form'}>


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

                                <h2>{LABELS_AND_HEADINGS.ID}: {publisher.id}</h2>
                                <h3>{LABELS_AND_HEADINGS.COUNTRY}: {getObjectNameById(countryData, publisher.country_id)}</h3>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
