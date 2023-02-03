import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Spinner} from "../../../minis/Spinner";
import {
    addIssueData,
    generateIssuesForTitle,
    getRowByTableAndId,
    getRowsByTableForeignKeyColumnAndForeignKeyId,
    handleInput
} from "../../../serviceFunctions";
import {BUCKETS, CLASSES, FILETYPES, LABELS_AND_HEADINGS, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminTitleInfoEdit} from "./AdminTitleInfoEdit";
import {IssuesList} from "../../../lists/issues/IssuesList";
import {useAppContext} from "../../../../context/AppContext";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {getIssuesPerYear, getYearsList} from "../../../../helpers/functions";


export const AdminTitle = () => {

    const [title, setTitle] = useState({});
    const [titleData, setTitleData] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [loading, setLoading] = useState(true);
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
            getRowsByTableForeignKeyColumnAndForeignKeyId(TABLES.ISSUES, "title_id", id ,setIssuesData).then(() => setLoading(false));
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
                issuesPerYear: getIssuesPerYear(newTitle.total_issues, newTitle.start_year, newTitle.end_year)
            });
        }
    }, [newTitle])

    const resetAddIssueForm = async () => {
        setNumber(1);
        setIs_marvelklubben(false);
        setMarvelklubben_number(0);
    }

    return title && loading ? (<Spinner/>) : (
        <main className={"container-fluid main-container"}>
            <div className={"row row-padding--main"}>
                <div className={"col-12"}>
                    <HeadingWithBreadCrumbs text={title.name + " " + title.start_year + " - " + title.end_year}/>
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
                            issuesData ?
                                <IssuesList issuesData={issuesData} setIssuesData={setIssuesData} showAdminInfo={true} title={title}/>
                                :
                                <NoDataAvailable />
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
                            value={year || 1975}
                            onChange={(e) => handleInput(e, setYear)}
                        />
                        <label className={"form-label"} htmlFor="number">{LABELS_AND_HEADINGS.NUMBER_DB}</label>
                        <input
                            id="number"
                            name="number"
                            className={CLASSES.FORM_INPUT_DEFAULT}
                            type="number"
                            value={number || 1}
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
                            {LABELS_AND_HEADINGS.ADD}
                        </button>
                        <button className={"btn btn-outline-secondary"}
                                onClick={resetAddIssueForm}>
                            {LABELS_AND_HEADINGS.RESET_FORM}
                        </button>
                    </div>
                        <h2>{LABELS_AND_HEADINGS.AUTO_GENERATE_ISSUES_FOR} {title.name}</h2>
                        <p>{TEXTS.AUTO_GENERATE_ISSUES_INFO}</p>
                        <button className={"btn btn-primary"}
                                onClick={() => generateIssuesForTitle(titleData)}>
                            {LABELS_AND_HEADINGS.GENERATE_ISSUES}
                        </button>
                    </div>

                </div>
            </div>
        </main>
    )
}
