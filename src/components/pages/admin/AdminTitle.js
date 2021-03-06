import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../miniComponents/Spinner";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import {getTitle} from "../../serviceFunctions";
import {LABELS_AND_HEADINGS} from "../../../helpers/constants";
import formatData from "../../../helpers/valueLists/formats.json";
import {getName} from "../../../helpers/functions";

// TODO: Admin title page
// * in servicefunctions - instead of using getRowsbyTable in a component - we can create a servicefunction for every table - getBlaBlas() that uses getrowsbytable instead.
// * show publisher - with link to publisher
// * Get country from publisher
// * Users can chose if they want to start collecting this title

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
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{title.name} {title.start_year} - {title.end_year}</span></h1>
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
                    <h2>{LABELS_AND_HEADINGS.ID}: {title.id}</h2>
                    <h3>{LABELS_AND_HEADINGS.FORMAT}: {getName(formatData, title.format_id)}</h3>
                    <h3>{LABELS_AND_HEADINGS.TOTAL_ISSUES}: {title.total_issues}</h3>
                </div>
            </div>
        </main>
    )
}
