import React, {useEffect, useState, useCallback} from "react";
import {useParams} from "react-router-dom";
import {FILETYPES} from "../../../../helpers/constants/configConstants";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {BUCKETS, TABLES} from "../../../../helpers/constants/serviceConstants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminIssueInfoEdit} from "./AdminIssueInfoEdit";
import {getIssueName, objectDoesExist} from "../../../../helpers/functions";
import {issueIconDuoTone, publishersIconDuoTone, titleIconDuoTone} from "../../../icons";
import {useIssueData} from "../../../../helpers/customHooks/useIssueData";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {AdminIssueGradeValueEdit} from "./AdminIssueGradeValueEdit";
import {getGradeValuesByIssueId} from "../../../../services/collectingService";
import {IconLink} from "../../../minis/IconLink";
import {NoMatch} from "../../../routes/NoMatch";


export const AdminIssue = () => {

    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [newIssue, setNewIssue] = useState({});
    const [gradeValues, setGradeValues] = useState([]);

    const {
        issue,
        setIssue,
        loading,
        fetchData
    } = useIssueData(id, true);

    useEffect(() => {
        setImageFilename(issue.image_filename);
        setImageUrl(issue.image_url);
    }, [id, setImageFilename, setImageUrl, imageFilename, imageUrl, issue.image_filename, issue.image_url])

    const fetchGradeValues = useCallback(() => {
        getGradeValuesByIssueId(id, setGradeValues).then();
    }, [id]);

    useEffect(() => {
        fetchGradeValues();
        setNewIssue({...issue});
    }, [fetchGradeValues, issue]);

    return objectDoesExist(issue) ? (
            <main id="main-content" className={"main-container"}>
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
                                                            bcName={getIssueName(issue)}/>
                                    <p className={"lead"}>{TEXTS.ADMIN_ISSUE_LEAD}</p>
                                    <p>{TEXTS.ADMIN_ISSUE_TEXT}</p>
                                    <IconLink
                                        variant={"primary"}
                                        icon={issueIconDuoTone}
                                        path={`/issues/${issue.id}`}
                                        label={getIssueName(issue)}
                                    />
                                    <IconLink
                                        variant={"primary"}
                                        icon={titleIconDuoTone}
                                        path={`/titles/${issue.title_id}`}
                                        label={issue.titles.name + " " + issue.titles.start_year}
                                    />
                                    <IconLink
                                        variant={"primary"}
                                        icon={titleIconDuoTone}
                                        path={`/admin/titles/${issue.title_id}`}
                                        label={LABELS.COMMON.EDIT + " " + issue.titles.name + " " + issue.titles.start_year}
                                    />
                                    <IconLink
                                        variant={"primary"}
                                        icon={publishersIconDuoTone}
                                        path={`/admin/publishers/${issue.publisher_id}`}
                                        label={LABELS.COMMON.EDIT + " " + issue.publishers.name}
                                    />
                                </div>
                            </div>
                            <div className={"row row-padding--secondary"}>
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
                                <AdminIssueInfoEdit issue={issue} setIssue={setIssue} newIssue={newIssue} setNewIssue={setNewIssue} title={issue.titles}/>
                                <AdminIssueGradeValueEdit issue={issue} title={issue.titles} gradeValues={gradeValues} setGradeValues={setGradeValues}
                                                          fetchGradeValues={fetchGradeValues}/>
                            </div>
                        </>
                }
            </main>
        )
        :
        <NoMatch/>
}
