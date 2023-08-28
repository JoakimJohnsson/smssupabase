import React, {useCallback, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {
    getRowByTableAndId, getRowsByTable,
    handleInput
} from "../../../../helpers/functions/serviceFunctions/serviceFunctions";
import {
    addIssueData, deleteAllIssues,
    generateIssuesForTitle, getIssuesWithTitleAndPublisherByTitleId
} from "../../../../helpers/functions/serviceFunctions/issueFunctions";
import {BUCKETS, CLASSES, FILETYPES, LABELS_AND_HEADINGS, MESSAGES, TABLES, TEXTS} from "../../../../helpers/constants";
import {HeadingWithBreadCrumbs} from "../../../headings";
import {ImageUploader} from "../../../ImageUploader";
import {AdminTitleInfoEdit} from "./AdminTitleInfoEdit";
import {IssuesList} from "../../../lists/issues/IssuesList";
import {useAppContext} from "../../../../context/AppContext";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {getCalculatedYear, getIssuesPerYear, getYearsList, printOptions} from "../../../../helpers/functions/functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";
import {IssueIcon} from "../../../icons";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {titleIconDuoTone} from "../../../icons-duotone";
import {IconButton} from "../../../minis/IconButton";


export const AdminTitle = () => {

    const [title, setTitle] = useState({});
    const [titleData, setTitleData] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [publishersData, setPublishersData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingGI, setLoadingGI] = useState(false);
    const [loadingDI, setLoadingDI] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [year, setYear] = useState(1975);
    const [number, setNumber] = useState(1);
    const [is_marvelklubben, setIs_marvelklubben] = useState(0);
    const [is_variant, setIs_variant] = useState(0);
    const [is_double, setIs_double] = useState(0);
    const [marvelklubben_number, setMarvelklubben_number] = useState(0);
    const [variant_suffix, setVariant_suffix] = useState("a");
    const [newTitle, setNewTitle] = useState({});
    const {setInformationMessage} = useAppContext();
    const [publisher_id, setPublisher_id] = useState("");
    const [chosenPublisherName, setChosenPublisherName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    useEffect(() => {
        if (publishersData && publisher_id) {
            setChosenPublisherName(publishersData.find((p) => p.id === publisher_id).name);
        }
    }, [publisher_id, publishersData])

    const fetchTitleAndIssuesData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            getIssuesWithTitleAndPublisherByTitleId(setIssuesData, id).then(() => setLoading(false));
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
        setIs_marvelklubben(0);
        setIs_variant(0);
        setMarvelklubben_number(0);
        setVariant_suffix("a");
    }

    const validateTitleData = (titleData) => {
        return titleData.years.length && titleData.issuesPerYear > 0 && titleData.titleId;
    }

    const handleGenerateIssues = () => {
        setLoadingGI(true);
        if (publisher_id && titleData && validateTitleData(titleData)) {
            generateIssuesForTitle(titleData, setInformationMessage, publisher_id).then(() => {
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

    const handleCheckboxInput = (value, setData) => {
        if (value === 1) {
            setData(0)
        } else {
            setData(1)
        }
    }

    return (
        <main id="main-content" className={"container-fluid main-container"}>
            {
                title && loading ?
                    <div className={"row row-padding--main"}>
                        <OverlaySpinner/>
                    </div>
                    :
                    <>
                        <div className={"row row-padding--main"}>
                            <div className={"sms-page-col--full"}>
                                <HeadingWithBreadCrumbs text={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}/>
                                <p className={"lead"}>{TEXTS.ADMIN_TITLE_LEAD}</p>
                                <IconButton variant={"primary"} icon={titleIconDuoTone} onClick={() => navigate(`/titles/${title.id}`)}
                                            label={title.name}/>
                            </div>
                        </div>
                        <div className={"row row-padding--secondary"}>
                            <AdminTitleInfoEdit title={title} setTitle={setTitle} newTitle={newTitle} setNewTitle={setNewTitle}/>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
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
                                <div className={"sms-section--light mb-4"}>
                                    <h2>{LABELS_AND_HEADINGS.ISSUES}</h2>
                                    {
                                        issuesData && issuesData.length > 0 ?
                                            <IssuesList issuesData={issuesData} setIssuesData={setIssuesData} showAdminInfo={true}/>
                                            :
                                            <NoDataAvailable/>
                                    }
                                </div>
                            </div>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light pb-5"}>
                                    <div className={"mb-4"}>
                                        <h2>{LABELS_AND_HEADINGS.CHOOSE_PUBLISHER_FOR_ISSUE}</h2>
                                        <label className={"form-label"} htmlFor="publisher">{LABELS_AND_HEADINGS.PUBLISHER_DB}</label>
                                        {
                                            publishersData &&
                                            <select
                                                id="publisher"
                                                name={"publisher_id"}
                                                className={CLASSES.FORM_INPUT_DEFAULT + " mb-5"}
                                                onChange={(e) => handleInput(e, setPublisher_id)}>
                                                <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                                {printOptions(publishersData)}
                                            </select>
                                        }
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
                                                id={"double"}
                                                name={"is_double"}
                                                className={"form-check-input me-2"}
                                                type="checkbox"
                                                value={is_double || 0}
                                                checked={is_double === 1}
                                                onChange={() => handleCheckboxInput(is_double, setIs_double)}
                                            />
                                            <label className={"form-label"} htmlFor="double">{LABELS_AND_HEADINGS.IS_DOUBLE_DB}</label>
                                        </div>
                                        <div>
                                            <input
                                                id={"marvelklubben"}
                                                name={"is_marvelklubben"}
                                                className={"form-check-input me-2"}
                                                type="checkbox"
                                                value={is_marvelklubben || 0}
                                                checked={is_marvelklubben === 1}
                                                onChange={() => handleCheckboxInput(is_marvelklubben, setIs_marvelklubben)}
                                            />
                                            <label className={"form-label"} htmlFor="marvelklubben">{LABELS_AND_HEADINGS.IS_MARVELKLUBBEN_DB}</label>
                                        </div>
                                        <label className={"form-label"}
                                               htmlFor="marvelklubbennumber">{LABELS_AND_HEADINGS.MARVELKLUBBEN_NUMBER_DB}</label>
                                        <input
                                            id={"marvelklubbennumber"}
                                            name={"marvelklubben_number"}
                                            className={CLASSES.FORM_INPUT_DEFAULT}
                                            type="number"
                                            value={marvelklubben_number || ""}
                                            max={999}
                                            min={0}
                                            onChange={(e) => handleInput(e, setMarvelklubben_number)}
                                        />
                                        <div>
                                            <input
                                                id={"variant"}
                                                name={"is_variant"}
                                                className={"form-check-input me-2"}
                                                type="checkbox"
                                                value={is_variant || 0}
                                                checked={is_variant === 1}
                                                onChange={() => handleCheckboxInput(is_variant, setIs_variant)}
                                            />
                                            <label className={"form-label"} htmlFor="variant">{LABELS_AND_HEADINGS.IS_VARIANT_DB}</label>
                                        </div>
                                        <label className={"form-label"} htmlFor="variantsuffix">{LABELS_AND_HEADINGS.VARIANT_SUFFIX_DB}</label>
                                        <input
                                            id={"variantsuffix"}
                                            name={"variant_suffix"}
                                            className={CLASSES.FORM_INPUT_DEFAULT}
                                            type="text"
                                            value={variant_suffix || ""}
                                            onChange={(e) => handleInput(e, setVariant_suffix)}
                                        />
                                        <button className={"btn btn-primary sms-btn"}
                                                onClick={() => addIssueData({
                                                    title_id: title.id,
                                                    publisher_id: publisher_id,
                                                    year: year,
                                                    number: number,
                                                    is_marvelklubben: is_marvelklubben,
                                                    marvelklubben_number: marvelklubben_number,
                                                    is_double: is_double,
                                                    is_variant: is_variant,
                                                    variant_suffix: variant_suffix,
                                                }, setInformationMessage).then(() => fetchTitleAndIssuesData())}
                                                disabled={!year || !number}>
                                            <IssueIcon className={"me-2"}/>
                                            {LABELS_AND_HEADINGS.ADD}
                                        </button>
                                        <button className={"btn btn-secondary sms-btn"}
                                                onClick={resetAddIssueForm}>
                                            {LABELS_AND_HEADINGS.RESET_FORM}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
                                    <h2>{LABELS_AND_HEADINGS.DELETE_ALL_ISSUES_FOR} {title.name}</h2>
                                    <p>{TEXTS.DELETE_ALL_ISSUES_INFO}</p>
                                    <button className={"btn btn-danger d-flex align-items-center"} disabled={!(issuesData && issuesData.length > 0)}
                                            onClick={() => handleDeleteIssues(issuesData)}>
                                        {
                                            loadingDI ?
                                                <>
                                                    <CustomSpinner size={"1x"} className={"me-2"}/>
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
                                <div className={"sms-section--light"}>
                                    <h2>{LABELS_AND_HEADINGS.AUTO_GENERATE_ISSUES_FOR} {title.name}</h2>
                                    <p>{TEXTS.AUTO_GENERATE_ISSUES_INFO}</p>
                                    {
                                        publisher_id ?
                                            <>
                                                <p className={"alert alert-success"}>{TEXTS.AUTO_GENERATE_ISSUES_CHOSEN_PUBLISHER + chosenPublisherName}.</p>
                                                <button className={"btn btn-primary sms-btn"} onClick={() => handleGenerateIssues()}>
                                                    {
                                                        loadingGI ?
                                                            <>
                                                                <CustomSpinner size={"1x"} className={"me-2"}/>
                                                                {LABELS_AND_HEADINGS.GENERATING_ISSUES}
                                                            </>
                                                            :
                                                            <>
                                                                <IssueIcon className={"me-2"}/>
                                                                {LABELS_AND_HEADINGS.GENERATE_ISSUES}
                                                            </>
                                                    }
                                                </button>
                                            </>
                                            :
                                            <p className={"alert alert-info"}>{TEXTS.AUTO_GENERATE_ISSUES_NO_CHOICE}</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
            }
        </main>
    )
}
