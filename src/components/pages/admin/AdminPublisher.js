import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {supabase} from "../../../supabase/supabaseClient";
import {Spinner} from "../../Spinner";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";


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
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{publisher.name}</span></h1>
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
                    <h2>Id: {publisher.id}</h2>
                </div>
            </div>
        </main>
    )
}
