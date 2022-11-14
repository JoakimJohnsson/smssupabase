import React, {useCallback, useEffect, useState} from "react";
import {useParams, useSearchParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {getRowByTableAndId} from "../../../serviceFunctions";
import {BUCKETS, FILETYPES, TABLES} from "../../../../helpers/constants";
import formatData from "../../../../helpers/valueLists/formats.json";
import {isTrue} from "../../../../helpers/functions";
import {AdminH1} from "../../../headings";
import {ToggleEditButtons} from "../../../minis/ToggleEditButton";
import {AdminTitleInfo} from "./AdminTitleInfo";
import {AdminTitleEditInfo} from "./AdminTitleEditInfo";
import {ImageUploader} from "../../../ImageUploader";


export const AdminTitle = () => {

    const [searchParams, setSearchParams] = useSearchParams({edit: false})
    const edit = isTrue(searchParams.get("edit"));
    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();

    const fetchTitleData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => setLoading(false));
    }, [id]);

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
                            {
                                edit ?
                                    <AdminTitleEditInfo/>
                                    :
                                    <>
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
                                        <AdminTitleInfo title={title} formatData={formatData}/>
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
