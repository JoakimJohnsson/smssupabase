import React, {useEffect, useState} from "react";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import {addTitleData, deleteImageFromBucket, getRowsByTable} from "../../serviceFunctions";
import {handleNameInput, hideAndResetMessage, printOptions} from "../../../helpers/functions";
import formatData from "../../../helpers/valueLists/formats.json";
import {useCommonFormStates} from "../../../helpers/customHooks/useCommonFormStates";
import {AdminH1} from "../../headings";
import {ImageUploader} from "../../ImageUploader";


export const AdminTitleAdd = () => {

    const [
        name, setName,
        showFormError, setShowFormError,
        showFormSuccess, setShowFormSuccess,
        formMessage, setFormMessage,
        nameValidated, setNameValidated,
        formInputClass, setFormInputClass,
        uploading, setUploading,
        imageFilename, setImageFilename,
        imageUrl, setImageUrl,
        disableReset, setDisableReset
    ] = useCommonFormStates();

    const [startYear, setStartYear] = useState(1975);
    const [endYear, setEndYear] = useState(1975);
    const [formatId, setFormatId] = useState("");
    const [totalIssues, setTotalIssues] = useState(12);
    const [publishersData, setPublishersData] = useState(null);
    const [publisherId, setPublisherId] = useState("");

    useEffect(() => {
        getRowsByTable(TABLES.PUBLISHERS, setPublishersData).then();
    }, [])

    const deleteTitleImage = async () => {
        await deleteImageFromBucket(imageFilename, setUploading, BUCKETS.TITLE_IMAGES,
            setImageUrl, setImageFilename);
    }

    const resetAddTitleForm = async () => {
        setImageFilename(null);
        setImageUrl(null);
        setName("");
        setStartYear(1975);
        setEndYear(1975);
        setTotalIssues(12);
        setDisableReset(false);
        hideAndResetMessage(setShowFormError, setShowFormSuccess, setFormMessage);
    }

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADD_TITLE}/>
                    <div className={"row"}>
                        <div className={"sms-dashboard-col"}>
                            <div className={"sms-form"}>
                                <ImageUploader
                                    imageUrl={imageUrl}
                                    setImageUrl={setImageUrl}
                                    imageFilename={imageFilename}
                                    setImageFilename={setImageFilename}
                                    uploading={uploading}
                                    setUploading={setUploading}
                                    bucketName={BUCKETS.TITLE_IMAGES}
                                    setDisableReset={setDisableReset}
                                    fileType={FILETYPES.TITLE_IMAGE}
                                />
                                <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME}</label>
                                <input
                                    id="name"
                                    className={formInputClass}
                                    type="text"
                                    value={name || ""}
                                    onChange={e => handleNameInput(e, setName, setFormInputClass, setNameValidated)}
                                />
                                <label className={"form-label"} htmlFor="startyear">{LABELS_AND_HEADINGS.START_YEAR}</label>
                                <input
                                    id="startyear"
                                    className={formInputClass}
                                    type="number"
                                    value={startYear || 1975}
                                    onChange={(e) => setStartYear(e.target.value)}
                                />
                                <label className={"form-label"} htmlFor="endyear">{LABELS_AND_HEADINGS.END_YEAR}</label>
                                <input
                                    id="endyear"
                                    className={formInputClass}
                                    type="number"
                                    value={endYear || 1977}
                                    onChange={(e) => setEndYear(e.target.value)}
                                />
                                <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.PUBLISHERS_DB}</label>
                                {
                                    publishersData &&
                                    <select name="publisher" id="publisher" className={"form-select mb-3"} onChange={(e) => setPublisherId(e.target.value)}>
                                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                        {printOptions(publishersData)}
                                    </select>
                                }
                                <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                                {
                                    formatData &&
                                    <select name="formats" id="format" className={"form-select mb-3"} onChange={(e) => setFormatId(e.target.value)}>
                                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                        {printOptions(formatData)}
                                    </select>
                                }
                                <label className={"form-label"} htmlFor="totalissues">{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>
                                <input
                                    id="totalissues"
                                    className={formInputClass}
                                    type="number"
                                    value={totalIssues || 12}
                                    onChange={(e) => setTotalIssues(e.target.value)}
                                />
                                <button className={"btn btn-primary me-3 mb-2"}
                                        onClick={() => addTitleData({
                                            name: name,
                                            startYear: startYear,
                                            endYear: endYear,
                                            publisherId: publisherId,
                                            formatId: formatId,
                                            totalIssues: totalIssues,
                                            titleImageFilename: imageFilename,
                                            titleImageUrl: imageUrl
                                        }, deleteTitleImage,setFormMessage, setShowFormSuccess, setShowFormError).then(() => resetAddTitleForm())}
                                        disabled={!nameValidated || !imageFilename}>
                                    {LABELS_AND_HEADINGS.ADD}
                                </button>
                                <button className={"btn btn-outline-secondary mb-2"}
                                        onClick={resetAddTitleForm} disabled={disableReset}>
                                    {LABELS_AND_HEADINGS.RESET_FORM}
                                </button>
                                {showFormError && <p className={"alert alert-danger mt-3"}>{formMessage}</p>}
                                {showFormSuccess && <p className={"alert alert-success mt-3"}>{formMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
