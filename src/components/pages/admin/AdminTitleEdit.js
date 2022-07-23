import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {supabase} from "../../../supabase/supabaseClient";
import {Spinner} from "../../Spinner";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {BanIcon} from "@heroicons/react/solid";


export const AdminTitleEdit = () => {
    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        async function getTitle() {
            try {
                setLoading(true);
                let {data, error, status} = await supabase
                    .from('titles')
                    .select('*').eq('id', id)
                if (error && status !== 406) {
                    console.log('Error: ', error);
                }
                if (data) {
                    setTitle(data[0])
                }
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getTitle().then(() => 'Do something')
    }, [id])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{LABELS_AND_HEADINGS.EDIT} {title.name}</span></h1>
                    <h2> Name: {title.name}</h2>
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
