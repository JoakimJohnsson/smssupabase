import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, ROUTES, TABLES} from "../../../../helpers/constants";
import {isTrue, printOptions} from "../../../../helpers/functions";
import {AdminH1} from "../../../headings";
import {getRowByTableAndId, updatePublisherData} from "../../../serviceFunctions";
import {ImageUploader} from "../../../ImageUploader";
import countryData from "../../../../helpers/valueLists/countries.json";
import {ArrowLeftButton} from "../../../minis/ArrowLeftButton";


export const AdminPublisher = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const [formMessage, setFormMessage] = useState({show: false, error: false, message: ""});
    const edit = isTrue(searchParams.get("edit"));
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newPublisher, setNewPublisher] = useState({});
    const navigate = useNavigate();

    const fetchPublisherData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchPublisherData();
        setImageFilename(publisher.image_filename);
        setImageUrl(publisher.image_url);
    }, [id, fetchPublisherData, setImageFilename, setImageUrl, imageFilename, imageUrl, publisher.image_filename, publisher.image_url])

    useEffect(() => {
        setNewPublisher({...publisher});
    }, [publisher])

    const handleChange = (name, value) => {
        setNewPublisher({...newPublisher, [name]: value});
    }

    const handleSubmit = () => {
        updatePublisherData(publisher.id, newPublisher, setFormMessage).then(() => setSearchParams({edit: !edit}));
        setPublisher({...newPublisher});
    }

    const handleAbort = () => {
        setNewPublisher({...publisher});
        setSearchParams({edit: !edit});
    }

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
                                id={"name"}
                                name={"name"}
                                className={"form-control mb-3"}
                                type="text"
                                value={newPublisher.name}
                                onChange={e => handleChange(e.target.name, e.target.value)}
                                disabled={!edit}
                            />
                            <label className={"form-label"} htmlFor="country">{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                            {
                                countryData &&
                                <select
                                    id={"country"}
                                    name={"country_id"}
                                    className={"form-select mb-3"}
                                    value={newPublisher.country_id}
                                    disabled={!edit}
                                    onChange={e => handleChange(e.target.name, e.target.value)}>
                                    <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                    {printOptions(countryData)}
                                </select>
                            }
                            {
                                edit ?
                                    <>
                                        <button onClick={handleSubmit} className={"btn btn-primary"}>
                                            {LABELS_AND_HEADINGS.SAVE}
                                        </button>
                                        <button className={"btn btn-outline-secondary"} onClick={handleAbort}>
                                            {LABELS_AND_HEADINGS.ABORT}
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button onClick={() => setSearchParams({edit: !edit})} className={"btn btn-primary"}>
                                            {LABELS_AND_HEADINGS.EDIT}
                                        </button>
                                        <ArrowLeftButton onClick={() => navigate(ROUTES.ADMIN.PUBLISHERS)} label={LABELS_AND_HEADINGS.ALL_PUBLISHERS}/>
                                    </>
                            }
                            {
                                formMessage.show &&
                                <p className={formMessage.error ? "alert alert-danger mt-3" : "alert alert-success mt-3"}>
                                    {formMessage.message}
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
