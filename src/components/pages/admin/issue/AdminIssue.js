import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {BUCKETS, FILETYPES, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminIssueInfoEdit} from "./AdminIssueInfoEdit";
import {getIssueName} from "../../../../helpers/functions/functions";
import {IconButton} from "../../../minis/IconButton";
import {publishersIconDuoTone, titleIconDuoTone} from "../../../icons-duotone";
import {useIssueData} from "../../../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";


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
        <main id="main-content" className={"container-fluid main-container"}>
            {
                loading ?
                    <div className={"row row-padding--main"}>
                        <OverlaySpinner/>
                    </div>
                    :
                    <>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
                                <HeadingWithBreadCrumbs text={getIssueName(issue)} doIgnoreName={true}
                                                        name={getIssueName(issue)}/>
                                <p className={"lead"}>{TEXTS.ADMIN_ISSUE_LEAD}</p>
                                <p>{TEXTS.ADMIN_ISSUE_TEXT}</p>
                                <IconButton variant={"primary"} icon={titleIconDuoTone} onClick={() => navigate(`/admin/titles/${issue.title_id}`)}
                                            label={issue.titles.name + " " + issue.titles.start_year}/>
                                <IconButton variant={"primary"} icon={publishersIconDuoTone}
                                            onClick={() => navigate(`/admin/publishers/${issue.publisher_id}`)}
                                            label={issue.publishers.name}/>
                            </div>
                        </div>
                        <div className={"row row-padding--secondary"}>
                            <AdminIssueInfoEdit issue={issue} setIssue={setIssue} newIssue={newIssue} setNewIssue={setNewIssue} title={issue.titles}/>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
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
