import React, {useCallback, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {getRowByTableAndId, getRowsByTable} from "../../../serviceFunctions";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import {AdminH1} from "../../../headings";
import {ToggleEditButtons} from "../../../minis/ToggleEditButton";
import {ImageUploader} from "../../../ImageUploader";
import formatData from "../../../../helpers/valueLists/formats.json";


export const AdminTitle = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [publishersData, setPublishersData] = useState(null);
    const {id} = useParams();

    const fetchTitleData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    useEffect(() => {
        fetchTitleData();
        setImageFilename(title.image_filename);
        setImageUrl(title.image_url);
    }, [id, fetchTitleData, setImageFilename, setImageUrl, imageFilename, imageUrl, title.image_filename, title.image_url])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={title.name + " " + title.start_year + " - " + title.end_year}/>
                    <div className={"sms-dashboard-col"}>
                        <div className={"sms-form"}>
                            <ImageUploader
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                imageFilename={imageFilename}
                                setImageFilename={setImageFilename}
                                uploading={uploading}
                                setUploading={setUploading}
                                bucketName={BUCKETS.TITLE_IMAGES}
                                tableName={TABLES.TITLES}
                                fileType={FILETYPES.TITLE_IMAGE}
                                id={title.id}
                                update={fetchTitleData}
                            />
                            <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                            <input
                                id="name"
                                className={"form-control mb-3"}
                                type="text"
                                value={title.name}
                                onChange={() => console.log("name")}
                                disabled={!edit}
                            />
                            <label className={"form-label"} htmlFor="startyear">{LABELS_AND_HEADINGS.START_YEAR_DB}</label>
                            <input
                                id="startyear"
                                className={"form-control mb-3"}
                                type="number"
                                value={title.start_year}
                                onChange={() => console.log("start year")}
                                disabled={!edit}
                            />
                            <label className={"form-label"} htmlFor="endyear">{LABELS_AND_HEADINGS.END_YEAR_DB}</label>
                            <input
                                id="endyear"
                                className={"form-control mb-3"}
                                type="number"
                                value={title.end_year}
                                onChange={() => console.log("end year")}
                                disabled={!edit}
                            />
                            <label className={"form-label"} htmlFor="publisher">{LABELS_AND_HEADINGS.PUBLISHERS_DB}</label>
                            {
                                publishersData &&
                                <select
                                    id="publisher"
                                    className={"form-select mb-3"}
                                    value={title.publisher_id}
                                    disabled={!edit}
                                    onChange={() => console.log("publisher")}>
                                    <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                    {printOptions(publishersData)}
                                </select>
                            }
                            <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                            {
                                formatData &&
                                <select
                                    id="format"
                                    className={"form-select mb-3"}
                                    value={title.format_id}
                                    disabled={!edit}
                                    onChange={() => console.log("format")}>
                                    <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                    {printOptions(formatData)}
                                </select>
                            }
                            <label className={"form-label"} htmlFor="totalissues">{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>
                            <input
                                id="totalissues"
                                className={"form-control mb-3"}
                                type="number"
                                value={title.total_issues}
                                onChange={() => console.log("total issues")}
                                disabled={!edit}
                            />
                            <ToggleEditButtons edit={edit} setSearchParams={setSearchParams}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
