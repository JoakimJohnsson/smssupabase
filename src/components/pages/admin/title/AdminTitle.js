import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {getRowByTableAndId} from "../../../serviceFunctions";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminTitleInfoEdit} from "./AdminTitleInfoEdit";


export const AdminTitle = () => {

    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newTitle, setNewTitle] = useState({});

    const fetchTitleData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchTitleData();
        setImageFilename(title.image_filename);
        setImageUrl(title.image_url);
    }, [id, fetchTitleData, setImageFilename, setImageUrl, imageFilename, imageUrl, title.image_filename, title.image_url])

    useEffect(() => {
        setNewTitle({...title});
    }, [title])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={title.name + " " + title.start_year + " - " + title.end_year}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <AdminTitleInfoEdit title={title} setTitle={setTitle} newTitle={newTitle} setNewTitle={setNewTitle}/>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <h2>{LABELS_AND_HEADINGS.IMAGE}</h2>
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
                    </div>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form mb-4"}>
                        <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                    </div>
                </div>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form pb-5"}>
                        <h2>{LABELS_AND_HEADINGS.ADD_ISSUES}</h2>
                        {/*<label className={"form-label"} htmlFor="year">{LABELS_AND_HEADINGS.START_YEAR_DB}</label>*/}
                        {/*<input*/}
                        {/*    id="year"*/}
                        {/*    className={CLASSES.FORM_INPUT_DEFAULT}*/}
                        {/*    type="number"*/}
                        {/*    value={title.start_year}*/}
                        {/*    onChange={() => console.log("hej")}*/}
                        {/*/>*/}
                        {/*<label className={"form-label"} htmlFor="totalissues">{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>*/}
                        {/*<input*/}
                        {/*    id="totalissues"*/}
                        {/*    className={CLASSES.FORM_INPUT_DEFAULT}*/}
                        {/*    type="number"*/}
                        {/*    value={12}*/}
                        {/*    onChange={() => console.log("hej")}*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
        </main>
    )
}
