import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {
    addIssueData, deleteAllIssues,
    generateIssuesForTitle,
    getRowByTableAndId,
    getRowsByTableForeignKeyColumnAndForeignKeyId,
    handleInput
} from "../../../serviceFunctions";
import {BUCKETS, CLASSES, FILETYPES, LABELS_AND_HEADINGS, MESSAGES, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminTitleInfoEdit} from "./AdminTitleInfoEdit";
import {IssuesList} from "../../../lists/issues/IssuesList";
import {useAppContext} from "../../../../context/AppContext";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {getCalculatedYear, getIssuesPerYear, getYearsList} from "../../../../helpers/functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";
import {IssueIcon} from "../../../icons";


export const AdminTitle = () => {

    const [title, setTitle] = useState({});
    const [titleData, setTitleData] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadingGI, setLoadingGI] = useState(false);
    const [loadingDI, setLoadingDI] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [year, setYear] = useState(1975);
    const [number, setNumber] = useState(1);
    const [is_marvelklubben, setIs_marvelklubben] = useState(false);
    const [marvelklubben_number, setMarvelklubben_number] = useState(0);
    const [newTitle, setNewTitle] = useState({});
    const {setInformationMessage} = useAppContext();


    const fetchTitleAndIssuesData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            getRowsByTableForeignKeyColumnAndForeignKeyId(TABLES.ISSUES, "title_id", id, setIssuesData).then(() => setLoading(false));
        });
    }, [id]);

    useEffect(() => {
        fetchTitleAndIssuesData();
        setImageFilename(title.image_filename);
        setImageUrl(title.image_url);
        setYear(title.start_year);
    }, [id, fetchTitleAndIssuesData, setImageFilename, setImageUrl, imageFilename, imageUrl, title.image_filename, title.image_url, title.start_year, title.title_id])

    useEffect(() => {
        setNewTitle({...title});
    }, [title])

    useEffect(() => {
        if (newTitle) {
            setTitleData({
                years: getYearsList(newTitle.start_year, newTitle.end_year),
                issuesPerYear: getIssuesPerYear(newTitle.total_issues, newTitle.start_year, newTitle.end_year),
                titleId: newTitle.id
            });
        }
    }, [newTitle])

    const resetAddIssueForm = async () => {
        setNumber(1);
        setIs_marvelklubben(false);
        setMarvelklubben_number(0);
    }

    const validateTitleData = (titleData) => {
        return titleData.years.length && titleData.issuesPerYear > 0 && titleData.titleId;
    }

    const handleGenerateIssues = () => {
        setLoadingGI(true);
        if (titleData && validateTitleData(titleData)) {
            generateIssuesForTitle(titleData, setInformationMessage).then(() => {
                setTimeout(() => {
                    setLoadingGI(false);
                    fetchTitleAndIssuesData();
                }, 1000);
            })
        } else {
            setInformationMessage({show: true, status: 4, error: MESSAGES.ERROR.VALIDATION_UPLOAD_MISSING_INFO});
            setTimeout(() => {
                setLoadingGI(false);
            }, 1000);
        }
    }

    const handleDeleteIssues = (issuesData) => {
        setLoadingDI(true);
        if (issuesData && issuesData.length > 0) {
            deleteAllIssues(issuesData, setIssuesData, setInformationMessage).then(() => {
                setTimeout(() => {
                    setLoadingDI(false);
                    fetchTitleAndIssuesData();
                }, 1000);
            })
        } else {
            setInformationMessage({show: true, status: 4, error: MESSAGES.ERROR.VALIDATION_DELETE});
            setTimeout(() => {
                setLoadingDI(false);
            }, 1000);
        }
    }

    return title && loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}/>
                    <p className={"lead"}>{TEXTS.ADMIN_TITLE_LEAD}</p>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <AdminTitleInfoEdit title={title} setTitle={setTitle} newTitle={newTitle} setNewTitle={setNewTitle}/>
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
                            bucketName={BUCKETS.TITLE_IMAGES}
                            tableName={TABLES.TITLES}
                            fileType={FILETYPES.TITLE_IMAGE}
                            id={title.id}
                            update={fetchTitleAndIssuesData}
                        />
                    </div>
                </div>
            </div>
            <div className={"row row-padding--secondary"}>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form mb-4"}>
                        <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                        {
                            issuesData && issuesData.length > 0 ?
                                <IssuesList issuesData={issuesData} setIssuesData={setIssuesData} showAdminInfo={true} title={title}/>
                                :
                                <NoDataAvailable/>
                        }
                    </div>
                </div>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form pb-5"}>
                        <div className={"mb-4"}>
                            <h2>{LABELS_AND_HEADINGS.ADD_ISSUE_FOR} {title.name}</h2>
                            <label className={"form-label"} htmlFor="year">{LABELS_AND_HEADINGS.YEAR_DB}</label>
                            <input
                                id="year"
                                name="year"
                                className={CLASSES.FORM_INPUT_DEFAULT}
                                type="number"
                                value={year || ""}
                                onChange={(e) => handleInput(e, setYear)}
                            />
                            <label className={"form-label"} htmlFor="number">{LABELS_AND_HEADINGS.NUMBER_DB}</label>
                            <input
                                id="number"
                                name="number"
                                className={CLASSES.FORM_INPUT_DEFAULT}
                                type="number"
                                value={number || ""}
                                max={999}
                                min={1}
                                onChange={(e) => handleInput(e, setNumber)}
                            />
                            <div>
                                <input
                                    id={"marvelklubben"}
                                    name={"is_marvelklubben"}
                                    className={"form-check-input me-2"}
                                    type="checkbox"
                                    value={is_marvelklubben || false}
                                    onChange={(e) => handleInput(e, setIs_marvelklubben)}
                                />
                                <label className={"form-label"} htmlFor="marvelklubben">{LABELS_AND_HEADINGS.IS_MARVELKLUBBEN_DB}</label>
                            </div>
                            <label className={"form-label"} htmlFor="marvelklubbennumber">{LABELS_AND_HEADINGS.MARVELKLUBBEN_NUMBER_DB}</label>
                            <input
                                id={"marvelklubbennumber"}
                                name={"marvelklubben_number"}
                                className={CLASSES.FORM_INPUT_DEFAULT}
                                type="number"
                                value={marvelklubben_number || 0}
                                max={999}
                                min={0}
                                onChange={(e) => handleInput(e, setMarvelklubben_number)}
                            />
                            <button className={"btn btn-primary"}
                                    onClick={() => addIssueData({
                                        title_id: title.id,
                                        year: year,
                                        number: number,
                                        is_marvelklubben: is_marvelklubben,
                                        marvelklubben_number: marvelklubben_number,
                                    }, setInformationMessage).then(() => fetchTitleAndIssuesData())}
                                    disabled={!year || !number}>
                                <IssueIcon className={"me-2"}/>
                                {LABELS_AND_HEADINGS.ADD}
                            </button>
                            <button className={"btn btn-secondary"}
                                    onClick={resetAddIssueForm}>
                                {LABELS_AND_HEADINGS.RESET_FORM}
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <h2>{LABELS_AND_HEADINGS.DELETE_ALL_ISSUES_FOR} {title.name}</h2>
                        <p>{TEXTS.DELETE_ALL_ISSUES_INFO}</p>
                        <button className={"btn btn-danger d-flex align-items-center"} disabled={!(issuesData && issuesData.length > 0)}
                                onClick={() => handleDeleteIssues(issuesData)}>
                            {
                                loadingDI ?
                                    <>
                                        <Spinner small={true} className={"me-2"}/>
                                        {LABELS_AND_HEADINGS.DELETING}
                                    </>
                                    :
                                    <>
                                        <FontAwesomeIcon className={"me-2"} icon={faTrashCan}/>
                                        {LABELS_AND_HEADINGS.DELETE}
                                    </>
                            }
                        </button>
                    </div>
                </div>
                <div className={"sms-dashboard-col"}>
                    <div className={"sms-form"}>
                        <h2>{LABELS_AND_HEADINGS.AUTO_GENERATE_ISSUES_FOR} {title.name}</h2>
                        <p>{TEXTS.AUTO_GENERATE_ISSUES_INFO}</p>
                        <button className={"btn btn-primary"} onClick={() => handleGenerateIssues()}>
                            {
                                loadingGI ?
                                    <>
                                        <Spinner small={true} className={"me-2"}/>
                                        {LABELS_AND_HEADINGS.GENERATING_ISSUES}
                                    </>
                                    :
                                    <>
                                        <IssueIcon className={"me-2"}/>
                                        {LABELS_AND_HEADINGS.GENERATE_ISSUES}
                                    </>

                            }
                        </button>
                    </div>
                </div>
            </div>
        </main>
    )
}
