import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {FILETYPES} from "../../../../helpers/constants/configConstants";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {BUCKETS, TABLES} from "../../../../helpers/constants/serviceConstants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {getRowByTableAndId} from "../../../../services/serviceFunctions";
import {ImageUploader} from "../../../ImageUploader";
import {AdminPublisherInfoEdit} from "./AdminPublisherInfoEdit";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {publishersIconDuoTone} from "../../../icons";
import {IconButton} from "../../../minis/IconButton";
import {objectDoesExist} from "../../../../helpers/functions";
import {NoMatch} from "../../../routes/NoMatch";


export const AdminPublisher = () => {

    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newPublisher, setNewPublisher] = useState({});
    const navigate = useNavigate();

    const fetchPublisherAndTitlesData = useCallback(() => {
        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, id).then(() => setLoading(false));
    }, [id])

    useEffect(() => {
        fetchPublisherAndTitlesData();
        setImageFilename(publisher.image_filename);
        setImageUrl(publisher.image_url);
    }, [id, fetchPublisherAndTitlesData, setImageFilename, setImageUrl, imageFilename, imageUrl, publisher.image_filename, publisher.image_url]);

    useEffect(() => {
        setNewPublisher({...publisher});
    }, [publisher])

    return objectDoesExist(publisher) ?
        <>
            {
                loading ?
                    <OverlaySpinner/>
                    :
                    <>
                        <div className={"sms-page-col"}>
                            <HeadingWithBreadCrumbs text={publisher.name}/>
                            <p className={"lead"}>{TEXTS.ADMIN_PUBLISHER_LEAD}</p>
                            <IconButton variant={"primary"} icon={publishersIconDuoTone}
                                        onClick={() => navigate(`/publishers/${publisher.id}`)}
                                        label={publisher.name}/>
                        </div>
                        <div className={"row"}>
                            <AdminPublisherInfoEdit publisher={publisher} setPublisher={setPublisher}
                                                    newPublisher={newPublisher}
                                                    setNewPublisher={setNewPublisher}/>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
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
                        </div>
                    </>
            }
        </>
        :
        <NoMatch/>
}
