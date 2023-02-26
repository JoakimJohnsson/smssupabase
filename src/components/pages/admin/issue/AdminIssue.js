import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {getRowByTableAndId} from "../../../serviceFunctions";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminIssueInfoEdit} from "./AdminIssueInfoEdit";
import {getIssueName} from "../../../../helpers/functions";
import {IconButton} from "../../../minis/IconButton";
import {publishersIconDuoTone, titleIconDuoTone} from "../../../icons-duotone";


export const AdminIssue = () => {

    const [issue, setIssue] = useState({});
    const [title, setTitle] = useState({});
    const [publisher, setPublisher] = useState({});
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newIssue, setNewIssue] = useState({});
    const navigate = useNavigate();

    const fetchIssueAndTitleData = useCallback(() => {
        getRowByTableAndId(TABLES.ISSUES, setIssue, id).then(() => {
            if (issue.title_id) {
                getRowByTableAndId(TABLES.TITLES, setTitle, issue.title_id).then(() => {
                    if (title.publisher_id) {
                        getRowByTableAndId(TABLES.PUBLISHERS, setPublisher, title.publisher_id).then(() => setLoading(false))
                    }
                });
            }
        });
    }, [id, issue.title_id, title.publisher_id]);

    useEffect(() => {
        fetchIssueAndTitleData();
        setImageFilename(issue.image_filename);
        setImageUrl(issue.image_url);
    }, [id, fetchIssueAndTitleData, setImageFilename, setImageUrl, imageFilename, imageUrl, issue.image_filename, issue.image_url])

    useEffect(() => {
        setNewIssue({...issue});
    }, [issue])

    return (
        <main className={"container-fluid main-container"}>
            {
                loading ?
                    <div className={"row row-padding--main"}>
                        <CustomSpinner size={"4x"}/>
                    </div>
                    :
                    <>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
                                <HeadingWithBreadCrumbs text={getIssueName(title, issue)} doIgnoreName={true} name={getIssueName(title, issue)}/>
                                <p className={"lead"}>{TEXTS.ADMIN_ISSUE_LEAD}</p>
                                <p>{TEXTS.ADMIN_ISSUE_TEXT}</p>
                                <IconButton variant={"primary"} icon={titleIconDuoTone} onClick={() => navigate(`/admin/titles/${issue.title_id}`)}
                                            label={title.name}/>
                                <IconButton variant={"primary"} icon={publishersIconDuoTone}
                                            onClick={() => navigate(`/admin/publishers/${title.publisher_id}`)}
                                            label={publisher.name}/>
                            </div>
                        </div>
                        <div className={"row row-padding--secondary"}>
                            <AdminIssueInfoEdit issue={issue} setIssue={setIssue} newIssue={newIssue} setNewIssue={setNewIssue} title={title}/>
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
                    </>
            }
        </main>
    )
}
