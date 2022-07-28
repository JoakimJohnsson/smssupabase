import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../Spinner";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import {getTitle} from "../../serviceFunctions";


export const AdminTitle = () => {
    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        getTitle(setLoading, setTitle, id).then();
    }, [id])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{title.name}</span></h1>
                    <BackButton customClass={"mb-3"}/>
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
                    <h2>Id: {title.id}</h2>
                    <h3>Year start: {title.start_year}</h3>
                    <h3>Year end: {title.end_year}</h3>
                    <h3>Format: {title.format}</h3>
                    <h3>Total number of issues: {title.total_issues}</h3>
                </div>
            </div>
        </main>
    )
}
