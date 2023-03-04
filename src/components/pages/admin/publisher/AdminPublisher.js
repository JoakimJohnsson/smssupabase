import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {getRowByTableAndId, getRowsByTableForeignKeyColumnAndForeignKeyId} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {ImageUploader} from "../../../ImageUploader";
import {AdminPublisherInfoEdit} from "./AdminPublisherInfoEdit";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {TitlesList} from "../../../lists/titles/TitlesList";
import {CustomSpinner} from "../../../minis/CustomSpinner";


export const AdminPublisher = () => {

    const [publisher, setPublisher] = useState({});
    const [titlesData, setTitlesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newPublisher, setNewPublisher] = useState({});

    const fetchPublisherAndTitlesData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => {
            getRowsByTableForeignKeyColumnAndForeignKeyId(TABLES.TITLES, "publisher_id", id, setTitlesData).then(() => setLoading(false));
        });
    }, [id])

    useEffect(() => {
        fetchPublisherAndTitlesData();
        setImageFilename(publisher.image_filename);
        setImageUrl(publisher.image_url);
    }, [id, fetchPublisherAndTitlesData, setImageFilename, setImageUrl, imageFilename, imageUrl, publisher.image_filename, publisher.image_url]);

    useEffect(() => {
        setNewPublisher({...publisher});
    }, [publisher])

    return (
        <main className={"container-fluid main-container"}>
            {
                loading ?
                    <div className={"row row-padding--main"}>
                        <OverlaySpinner/>
                    </div>
                    :
                    <>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
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
                                        update={fetchPublisherAndTitlesData}
                                    />
                                </div>
                            </div>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-form"}>
                                    <h2>{LABELS_AND_HEADINGS.TITLES}</h2>
                                    {titlesData ? <TitlesList titlesData={titlesData} setTitlesData={setTitlesData} showAdminInfo={false}/> :
                                        <CustomSpinner/>}
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}
