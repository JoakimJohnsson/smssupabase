import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminIssueInfoEdit} from "./AdminIssueInfoEdit";
import {getIssueName} from "../../../../helpers/functions/functions";
import {IconButton} from "../../../minis/IconButton";
import {publishersIconDuoTone, titleIconDuoTone} from "../../../icons-duotone";
import {useIssueData} from "../../../../helpers/customHooks/useIssueData";


export const AdminIssue = () => {

    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newIssue, setNewIssue] = useState({});
    const navigate = useNavigate();

    const [
        issue,
        setIssue,
        title,
        publisher,
        loading,
        fetchData
    ] = useIssueData(id, true);

    useEffect(() => {
        setImageFilename(issue.image_filename);
        setImageUrl(issue.image_url);
    }, [id, setImageFilename, setImageUrl, imageFilename, imageUrl, issue.image_filename, issue.image_url])

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
                                        update={fetchData}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}
