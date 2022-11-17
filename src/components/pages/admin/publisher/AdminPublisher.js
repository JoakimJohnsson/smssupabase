import React, {useCallback, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import {AdminH1} from "../../../headings";
import {getRowByTableAndId} from "../../../serviceFunctions";
import {ToggleEditButtons} from "../../../minis/ToggleEditButton";
import {ImageUploader} from "../../../ImageUploader";
import countryData from "../../../../helpers/valueLists/countries.json";


export const AdminPublisher = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();

    const fetchPublisherData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchPublisherData();
        setImageFilename(publisher.image_filename);
        setImageUrl(publisher.image_url);
    }, [id, fetchPublisherData, setImageFilename, setImageUrl, imageFilename, imageUrl, publisher.image_filename, publisher.image_url])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={publisher.name}/>
                    <div className={"sms-dashboard-col"}>
                        <div className={"sms-form"}>
                            <ImageUploader
                                imageUrl={imageUrl}
                                setImageUrl={setImageUrl}
                                imageFilename={imageFilename}
                                setImageFilename={setImageFilename}
                                uploading={uploading}
                                setUploading={setUploading}
                                bucketName={BUCKETS.PUBLISHER_IMAGES}
                                tableName={TABLES.PUBLISHERS}
                                fileType={FILETYPES.PUBLISHER_IMAGE}
                                id={publisher.id}
                                update={fetchPublisherData}
                            />
                            <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME_DB}</label>
                            <input
                                id="name"
                                className={"form-control mb-3"}
                                type="text"
                                value={publisher.name}
                                onChange={() => console.log("name")}
                                disabled={!edit}
                            />
                            <label className={"form-label"} htmlFor="country">{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                            {
                                countryData &&
                                <select
                                    id="country"
                                    className={"form-select mb-3"}
                                    value={publisher.country_id}
                                    disabled={!edit}
                                    onChange={() => console.log("format")}>
                                    <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                    {printOptions(countryData)}
                                </select>
                            }
                            <ToggleEditButtons edit={edit} setSearchParams={setSearchParams}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
