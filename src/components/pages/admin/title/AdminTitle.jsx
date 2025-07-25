import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CustomSpinner} from "../../../minis/CustomSpinner";
import {
    getRowByTableAndId, getRowsByTable,
    handleInput
} from "../../../../services/serviceFunctions";
import {
    addIssueData, deleteAllIssues,
    generateIssuesForTitle, getIssuesWithTitleAndPublisherAndGradeValuesByTitleId
} from "../../../../services/issueService";
import {CONFIG, FILETYPES, LOADING_STATES} from "../../../../helpers/constants/configConstants";
import {TEXTS} from "../../../../helpers/constants/textConstants/texts";
import {LABELS} from "../../../../helpers/constants/textConstants/labelsAndHeadings";
import {MESSAGES} from "../../../../helpers/constants/textConstants/messages";
import {BUCKETS, TABLES} from "../../../../helpers/constants/serviceConstants";
import {ImageUploader} from "../../../ImageUploader";
import {AdminTitleInfoEdit} from "./AdminTitleInfoEdit";
import {IssuesList} from "../../../lists/issues/IssuesList";
import {useAppContext} from "../../../../context/AppContext";
import {NoDataAvailable} from "../../../minis/NoDataAvailable";
import {
    getCalculatedYear,
    getIssuesPerYear,
    getYearsList,
    objectDoesExist,
    printOptions
} from "../../../../helpers/functions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";
import {Icon, issueIcon, valueIcon, titleIconDuoTone} from "../../../icons/Icons.jsx";
import {OverlaySpinner} from "../../../minis/OverlaySpinner";
import {IconButton} from "../../../minis/IconButton";
import {updateIsValued} from "../../../../services/collectingService";
import {IconLink} from "../../../minis/IconLink";
import {updateGradeValuesForTitles} from "../../../../helpers/databaseFunctions";
import {NoMatch} from "../../../routes/NoMatch";
import {PageMainContent} from "../../pagecomponents/PageMainContent.jsx";


export const AdminTitle = () => {

    const [title, setTitle] = useState({});
    const [titleData, setTitleData] = useState({});
    const [issuesData, setIssuesData] = useState({});
    const [publishersData, setPublishersData] = useState(null);
    const [loadingState, setLoadingState] = useState(LOADING_STATES.NONE);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const {id} = useParams();
    const [year, setYear] = useState(1975);
    const [number, setNumber] = useState(1);
    const [source, setSource] = useState("");
    const [description, setDescription] = useState("");
    const [is_marvelklubben, setIs_marvelklubben] = useState(0);
    const [is_variant, setIs_variant] = useState(0);
    const [is_valued, setIs_valued] = useState(0);
    const [is_double, setIs_double] = useState(0);
    const [marvelklubben_number, setMarvelklubben_number] = useState(0);
    const [variant_suffix, setVariant_suffix] = useState("a");
    const [newTitle, setNewTitle] = useState({});
    const [updateGradeValues, setUpdateGradeValues] = useState(
        {
            pr: 0,
            gd: 0,
            vg: 0,
            fn: 0,
            vf: 0,
            nm: 0
        }
    );
    const {setInformationMessage} = useAppContext();
    const [publisher_id, setPublisher_id] = useState("");
    const [chosenPublisherName, setChosenPublisherName] = useState("");

    useEffect(() => {
        setLoadingState(LOADING_STATES.GENERAL);
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, []);

    useEffect(() => {
        if (publishersData && publisher_id) {
            setChosenPublisherName(publishersData.find((p) => p.id === publisher_id).name);
        }
    }, [publisher_id, publishersData])

    const fetchTitleAndIssuesData = useCallback(() => {
        getRowByTableAndId(TABLES.TITLES, setTitle, id).then(() => {
            getIssuesWithTitleAndPublisherAndGradeValuesByTitleId(setIssuesData, id).then(() => setLoadingState(LOADING_STATES.NONE));
        });
    }, [id]);

    useEffect(() => {
        fetchTitleAndIssuesData();
        setImageFilename(title.image_filename);
        setImageUrl(title.image_url);
        setYear(title.start_year);
        setIs_valued(title.is_valued);
    }, [id, fetchTitleAndIssuesData, setImageFilename, setImageUrl, imageFilename, imageUrl, title.image_filename, title.image_url, title.start_year, title.title_id, title.is_valued])

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
        setSource("");
        setIs_marvelklubben(0);
        setIs_variant(0);
        setMarvelklubben_number(0);
        setVariant_suffix("a");
    }

    const validateTitleData = (titleData) => {
        return titleData.years.length && titleData.issuesPerYear > 0 && titleData.titleId;
    }

    const handleGenerateIssues = () => {
        setLoadingState(LOADING_STATES.GENERATE_ISSUES);
        if (publisher_id && titleData && validateTitleData(titleData)) {
            generateIssuesForTitle(titleData, setInformationMessage, publisher_id).then(() => {
                setTimeout(() => {
                    setLoadingState(LOADING_STATES.NONE);
                    fetchTitleAndIssuesData();
                }, CONFIG.TIMEOUT_XL);
            })
        } else {
            setInformationMessage({show: true, status: 4, error: MESSAGES.ERROR.VALIDATION_UPLOAD_MISSING_INFO});
            setTimeout(() => {
                setLoadingState(LOADING_STATES.NONE);
            }, CONFIG.TIMEOUT_XL);
        }
    }

    const handleDeleteIssues = (issuesData) => {
        setLoadingState(LOADING_STATES.DELETE_ISSUES);
        if (issuesData && issuesData.length > 0) {
            deleteAllIssues(issuesData, setIssuesData, setInformationMessage).then(() => {
                setTimeout(() => {
                    setLoadingState(LOADING_STATES.NONE);
                    fetchTitleAndIssuesData();
                }, CONFIG.TIMEOUT_XL);
            })
        } else {
            setInformationMessage({show: true, status: 4, error: MESSAGES.ERROR.VALIDATION_DELETE});
            setTimeout(() => {
                setLoadingState(LOADING_STATES.NONE);
            }, CONFIG.TIMEOUT_XL);
        }
    }

    const handleIsValued = () => {
        setLoadingState(LOADING_STATES.IS_VALUED);
        if (is_valued === 0) {
            updateIsValued(title.id, 1).then(() => {
                setIs_valued(1);
                setLoadingState(LOADING_STATES.NONE);
            });
        } else {
            updateIsValued(title.id, 0).then(() => {
                setIs_valued(0);
                setLoadingState(LOADING_STATES.NONE);
            });
        }
    }

    const handleCheckboxInput = (value, setData) => {
        if (value === 1) {
            setData(0)
        } else {
            setData(1)
        }
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUpdateGradeValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleUpdateDefaultGradeValues = async () => {
        setLoadingState(LOADING_STATES.GRADE_VALUES);
        await updateGradeValuesForTitles(title.id, updateGradeValues.pr, updateGradeValues.gd, updateGradeValues.vg, updateGradeValues.fn, updateGradeValues.vf, updateGradeValues.nm, setLoadingState);
    }

    return objectDoesExist(title) ?
        <>
            {
                title && loadingState === LOADING_STATES.GENERAL ?
                    <OverlaySpinner/>
                    :
                    <PageMainContent heading={title.name + " " + getCalculatedYear(title.start_year, title.end_year)}>
                        <div className={"lead-wrapper"}>
                            <p className={"lead"}>{TEXTS.ADMIN_TITLE_LEAD}</p>
                        </div>
                        <div className="mb-5">
                            <IconLink
                                variant={"primary"}
                                icon={titleIconDuoTone}
                                path={`/titles/${title.id}`}
                                label={title.name}
                            />
                        </div>
                        <div className={"row"}>
                            <AdminTitleInfoEdit title={title} setTitle={setTitle} newTitle={newTitle}
                                                setNewTitle={setNewTitle}/>
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
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
                                    <div className={"mb-3"}>
                                        <h2>{LABELS.SECTIONS.GRADES.GRADE}</h2>
                                        <p>{TEXTS.GRADE_IS_VALUED_LEAD}</p>
                                        {
                                            is_valued === 0 ?
                                                <p className={"alert alert-info"}>{TEXTS.GRADE_IS_NOT_VALUED}</p>
                                                :
                                                <p className={"alert alert-success"}>{TEXTS.GRADE_TITLE_IS_VALUED}</p>
                                        }
                                        <IconButton variant={"primary"} icon={valueIcon} onClick={handleIsValued}
                                                    loading={loadingState === LOADING_STATES.IS_VALUED}
                                                    label={LABELS.COMMON.UPDATE}/>
                                    </div>
                                    <div>
                                        <h3>{TEXTS.UPDATE_DEFAULT_VALUES}</h3>
                                        {
                                            Object.entries(updateGradeValues).map(([key, value]) => {
                                                return (
                                                    <div key={key}>
                                                        <label className={"form-label"}
                                                               htmlFor={key}>{key.toUpperCase()}</label>
                                                        <input
                                                            id={key + key.toUpperCase()}
                                                            name={key}
                                                            className={"form-input--default"}
                                                            type="number"
                                                            step={"10"}
                                                            min={0}
                                                            value={value}
                                                            onChange={handleInputChange}
                                                            disabled={is_valued === 1 || loadingState === LOADING_STATES.GRADE_VALUES}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                        <IconButton variant={"primary"} icon={valueIcon}
                                                    onClick={handleUpdateDefaultGradeValues}
                                                    label={LABELS.COMMON.UPDATE} disabled={is_valued === 1}
                                                    loading={loadingState === LOADING_STATES.GRADE_VALUES}/>
                                    </div>

                                </div>
                            </div>

                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light pb-5"}>
                                    <div className={"mb-4"}>
                                        <h2>{TEXTS.CHOOSE_PUBLISHER_FOR_ISSUE}</h2>
                                        <label className={"form-label"}
                                               htmlFor="publisher">{LABELS.SECTIONS.PUBLISHERS.PUBLISHER_DB}</label>
                                        {
                                            publishersData &&
                                            <select
                                                id="publisher"
                                                name={"publisher_id"}
                                                className={"form-input--default mb-5"}
                                                onChange={(e) => handleInput(e, setPublisher_id)}>
                                                <option value={""}>{LABELS.COMMON.CHOOSE}</option>
                                                {printOptions(publishersData)}
                                            </select>
                                        }
                                        <h2>{TEXTS.ADD_ISSUE_FOR} {title.name}</h2>
                                        <label className={"form-label"} htmlFor="year">{LABELS.COMMON.YEAR_DB}</label>
                                        <input
                                            id="year"
                                            name="year"
                                            className={"form-input--default"}
                                            type="number"
                                            value={year || ""}
                                            onChange={(e) => handleInput(e, setYear)}
                                        />
                                        <label className={"form-label"}
                                               htmlFor="number">{LABELS.COMMON.NUMBER_DB}</label>
                                        <input
                                            id="number"
                                            name="number"
                                            className={"form-input--default"}
                                            type="number"
                                            value={number || ""}
                                            max={999}
                                            min={1}
                                            onChange={(e) => handleInput(e, setNumber)}
                                        />
                                        <label className={"form-label"}
                                               htmlFor="description">{LABELS.COMMON.DESCRIPTION_DB}</label>
                                        <textarea
                                            id={"description"}
                                            name={"description"}
                                            className={"form-input--default"}
                                            rows={3}
                                            value={description || ""}
                                            onChange={(e) => handleInput(e, setDescription)}
                                        />
                                        <label className={"form-label mb-0"}
                                               htmlFor="source">{LABELS.SECTIONS.ISSUES.SOURCE_DB}</label>
                                        <p className={"form-text"}>{TEXTS.SOURCE_EXAMPLE}</p>
                                        <textarea
                                            id={"source"}
                                            name={"source"}
                                            className={"form-input--default"}
                                            rows={3}
                                            value={source || ""}
                                            onChange={(e) => handleInput(e, setSource)}
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
                                            <label className={"form-label"}
                                                   htmlFor="double">{LABELS.SECTIONS.ISSUES.IS_DOUBLE_DB}</label>
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
                                            <label className={"form-label"}
                                                   htmlFor="marvelklubben">{LABELS.SECTIONS.MARVELKLUBBEN.IS_MARVELKLUBBEN_DB}</label>
                                        </div>
                                        <label className={"form-label"}
                                               htmlFor="marvelklubbennumber">{LABELS.SECTIONS.MARVELKLUBBEN.MARVELKLUBBEN_NUMBER_DB}</label>
                                        <input
                                            id={"marvelklubbennumber"}
                                            name={"marvelklubben_number"}
                                            className={"form-input--default"}
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
                                            <label className={"form-label"}
                                                   htmlFor="variant">{LABELS.SECTIONS.ISSUES.IS_VARIANT_DB}</label>
                                        </div>
                                        <label className={"form-label"}
                                               htmlFor="variantsuffix">{LABELS.SECTIONS.ISSUES.VARIANT_SUFFIX_DB}</label>
                                        <input
                                            id={"variantsuffix"}
                                            name={"variant_suffix"}
                                            className={"form-input--default"}
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
                                                    description: description,
                                                    source: source,
                                                    is_marvelklubben: is_marvelklubben,
                                                    marvelklubben_number: marvelklubben_number,
                                                    is_double: is_double,
                                                    is_variant: is_variant,
                                                    variant_suffix: variant_suffix,
                                                }, setInformationMessage).then(() => fetchTitleAndIssuesData())}
                                                disabled={!year || !number}>
                                            <Icon icon={issueIcon} className={"me-2"}/>
                                            {LABELS.COMMON.ADD}
                                        </button>
                                        <button className={"btn btn-secondary sms-btn"}
                                                onClick={resetAddIssueForm}>
                                            {LABELS.COMMON.RESET_FORM}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light mb-4"}>
                                    <h2>{LABELS.SECTIONS.ISSUES.ISSUES}</h2>
                                    {
                                        issuesData && issuesData.length > 0 ?
                                            <IssuesList issuesData={issuesData} setIssuesData={setIssuesData}
                                                        showAdminInfo={true}/>
                                            :
                                            <NoDataAvailable/>
                                    }
                                </div>
                            </div>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
                                    <h2>{TEXTS.DELETE_ALL_ISSUES_FOR} {title.name}</h2>
                                    <p>{TEXTS.DELETE_ALL_ISSUES_INFO}</p>
                                    <button className={"btn btn-danger d-flex align-items-center"}
                                            disabled={!(issuesData && issuesData.length > 0)}
                                            onClick={() => handleDeleteIssues(issuesData)}>
                                        {
                                            loadingState === LOADING_STATES.DELETE_ISSUES ?
                                                <>
                                                    <CustomSpinner size={"1x"} className={"me-2"}/>
                                                    {LABELS.COMMON.DELETING}
                                                </>
                                                :
                                                <>
                                                    <FontAwesomeIcon className={"me-2"} icon={faTrashCan}/>
                                                    {LABELS.COMMON.DELETE}
                                                </>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div className={"sms-dashboard-col"}>
                                <div className={"sms-section--light"}>
                                    <h2>{TEXTS.AUTO_GENERATE_ISSUES_FOR} {title.name}</h2>
                                    <p>{TEXTS.AUTO_GENERATE_ISSUES_INFO}</p>
                                    {
                                        publisher_id ?
                                            <>
                                                <p className={"alert alert-success"}>{TEXTS.AUTO_GENERATE_ISSUES_CHOSEN_PUBLISHER + chosenPublisherName}.</p>
                                                <button className={"btn btn-primary sms-btn"}
                                                        onClick={() => handleGenerateIssues()}>
                                                    {
                                                        loadingState === LOADING_STATES.GENERATE_ISSUES ?
                                                            <>
                                                                <CustomSpinner size={"1x"} className={"me-2"}/>
                                                                {TEXTS.GENERATING_ISSUES}
                                                            </>
                                                            :
                                                            <>
                                                                <Icon icon={issueIcon} className={"me-2"}/>
                                                                {TEXTS.GENERATE_ISSUES}
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
                    </PageMainContent>
            }
        </>
        :
        <NoMatch/>
}
