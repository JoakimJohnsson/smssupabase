import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {getRowByTableAndId} from "../../../serviceFunctions";
import {ImageUploader} from "../../../ImageUploader";
import {AdminPublisherInfoEdit} from "./AdminPublisherInfoEdit";


export const AdminPublisher = () => {

    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newPublisher, setNewPublisher] = useState({});

    const fetchPublisherData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchPublisherData();
        setImageFilename(publisher.image_filename);
        setImageUrl(publisher.image_url);
    }, [id, fetchPublisherData, setImageFilename, setImageUrl, imageFilename, imageUrl, publisher.image_filename, publisher.image_url]);

    useEffect(() => {
        setNewPublisher({...publisher});
    }, [publisher])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={publisher.name}/>
                    <p className={"lead"}>{TEXTS.ADMIN_PUBLISHER_LEAD}</p>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <AdminPublisherInfoEdit publisher={publisher} setPublisher={setPublisher} newPublisher={newPublisher}
                                        setNewPublisher={setNewPublisher}/>
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
                            bucketName={BUCKETS.PUBLISHER_IMAGES}
                            tableName={TABLES.PUBLISHERS}
                            fileType={FILETYPES.PUBLISHER_IMAGE}
                            id={publisher.id}
                            update={fetchPublisherData}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
