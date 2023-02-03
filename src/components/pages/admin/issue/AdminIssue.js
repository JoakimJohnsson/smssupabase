import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {getRowByTableAndId} from "../../../serviceFunctions";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminIssueInfoEdit} from "./AdminIssueInfoEdit";


export const AdminIssue = () => {

    const [issue, setIssue] = useState({});
    const [title, setTitle] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newIssue, setNewIssue] = useState({});

    const fetchIssueAndTitleData = useCallback(() => {
        getRowByTableAndId(TABLES.ISSUES, setIssue, id).then(() => {
            if (issue && issue.title_id) {
                getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => setLoading(false));
            }
        });
    }, [id, issue]);

    useEffect(() => {
        fetchIssueAndTitleData();
        setImageFilename(issue.image_filename);
        setImageUrl(issue.image_url);
    }, [id, fetchIssueAndTitleData, setImageFilename, setImageUrl, imageFilename, imageUrl, issue.image_filename, issue.image_url])

    useEffect(() => {
        setNewIssue({...issue});
    }, [issue])

    return loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={title.name + " #" + issue.number + " / " + issue.year} doIgnoreName={true}/>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <AdminIssueInfoEdit issue={issue} setIssue={setIssue} newIssue={newIssue} setNewIssue={setNewIssue}/>
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
                            bucketName={BUCKETS.ISSUE_IMAGES}
                            tableName={TABLES.ISSUES}
                            fileType={FILETYPES.ISSUE_IMAGE}
                            id={issue.id}
                            update={fetchIssueAndTitleData}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}
