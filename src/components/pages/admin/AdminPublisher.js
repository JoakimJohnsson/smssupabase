import React, {useCallback, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../miniComponents/Spinner";
import {BUCKETS, FILETYPES, TABLES} from "../../../helpers/constants";
import {isTrue} from "../../../helpers/functions";
import {AdminH1} from "../../headings";
import {getRowByTableAndId} from "../../serviceFunctions";
import {ToggleEditButtons} from "../../miniComponents/ToggleEditButton";
import {AdminPublisherEditInfo} from "./AdminPublisherEditInfo";
import {AdminPublisherInfo} from "./AdminPublisherInfo";
import {ImageUploader} from "../../ImageUploader";


export const AdminPublisher = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [disableReset, setDisableReset] = useState(false);
    const {id} = useParams();

    const fetchPublisherData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        fetchPublisherData();
        setImageFilename(publisher.image_filename);
        setImageUrl(publisher.image_url);
    }, [id, fetchPublisherData, setImageFilename, setImageUrl, imageFilename, imageUrl, publisher.image_filename, publisher.image_url])

    return loading && !disableReset ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={publisher.name}/>
                    <div className={"sms-dashboard-col"}>
                        <div className={"sms-form"}>
                            {
                                edit ?
                                    <AdminPublisherEditInfo publisher={publisher} updatePublisher={fetchPublisherData}/>
                                    :
                                    <>
                                        <ImageUploader
                                            imageUrl={imageUrl}
                                            setImageUrl={setImageUrl}
                                            imageFilename={imageFilename}
                                            setImageFilename={setImageFilename}
                                            uploading={uploading}
                                            setUploading={setUploading}
                                            bucketName={BUCKETS.PUBLISHER_IMAGES}
                                            tableName={TABLES.PUBLISHERS}
                                            setDisableReset={setDisableReset}
                                            fileType={FILETYPES.PUBLISHER_IMAGE}
                                            id={publisher.id}
                                        />
                                        <AdminPublisherInfo publisher={publisher}/>
                                    </>
                            }
                            <ToggleEditButtons edit={edit} setSearchParams={setSearchParams}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
