import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {supabase} from "../../../supabase/supabaseClient";
import {Spinner} from "../../miniComponents/Spinner";
import {BackButton} from "../../miniComponents/BackButton";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import countryData from "../../../helpers/valueLists/countries.json";
import {getObjectNameById} from "../../../helpers/functions";
import {AdminIcon} from "../../icons/AdminIcon";


export const AdminPublisher = () => {
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        async function getPublisher() {
            try {
                setLoading(true);
                let {data, error, status} = await supabase
                    .from('publishers')
                    .select('*').eq('id', id)
                if (error && status !== 406) {
                    console.log('Error: ', error);
                }
                if (data) {
                    setPublisher(data[0])
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getPublisher().then();
    }, [id])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><AdminIcon textVariant={"xl"}/><span>{publisher.name}</span></h1>
                    <BackButton customClass={"mb-3"}/>
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
        </main>
    )
}
