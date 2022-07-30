import React, {useState} from "react";
import {BUCKETS, CLASSES, FILETYPES, LABELS_AND_HEADINGS, MESSAGES} from "../../../helpers/constants";
import {Spinner} from "../../Spinner";
import {addTitleData, deleteImage, uploadImage} from "../../serviceFunctions";
import {validateText} from "../../../helpers/validations";
import {handleGenericFormInput, printOptions} from "../../../helpers/functions";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import {NoDataAvailable} from "../../miniComponents/NoDataAvailable";
import formatData from "../../../helpers/valueLists/formats.json";


// TODO: Lägga till förlag väljare
// TODO: På title - visa upp land från valt förlag

export const AdminTitleAdd = () => {

    const [name, setName] = useState('');
    const [startYear, setStartYear] = useState(1975);
    const [endYear, setEndYear] = useState(1975);
    const [formatId, setFormatId] = useState('');
    const [totalIssues, setTotalIssues] = useState(12);
    const [showFormError, setShowFormError] = useState(false);
    const [showFormSuccess, setShowFormSuccess] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [nameValidated, setNameValidated] = useState(false);
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [uploading, setUploading] = useState(false);
    const [titleImageFilename, setTitleImageFilename] = useState('');
    const [titleImageUrl, setTitleImageUrl] = useState('');

    const handleNameInputChange = (e) => {
        setName(e.target.value)
        // Send true for success
        validateText(e) ? handleGenericFormInput(true, setFormInputClass, setNameValidated) : handleGenericFormInput(false, setFormInputClass, setNameValidated);
    }

    const uploadTitleImage = async (event) => {
        setUploading(true);
        let file = null;
        await deleteImage(titleImageFilename, setUploading, BUCKETS.TITLE_IMAGES,
            setTitleImageUrl, setTitleImageFilename);
        if (!event.target.files || event.target.files.length === 0) {
            console.log(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
        } else {
            file = event.target.files[0];
            await uploadImage(file, titleImageFilename, setUploading, BUCKETS.TITLE_IMAGES, FILETYPES.TITLE_IMAGE,
                titleImageUrl, setTitleImageFilename, setTitleImageUrl)
        }
    }

    const resetAddTitleForm = async () => {
        await deleteImage(titleImageFilename, setUploading, BUCKETS.TITLE_IMAGES,
            setTitleImageUrl, setTitleImageFilename);
        setName('');
        setStartYear(1975);
        setEndYear(1975);
        setTotalIssues(12);
        setShowFormError(false);
        setShowFormSuccess(false);
    }

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{LABELS_AND_HEADINGS.ADD_TITLE}</span></h1>
                    <BackButton customClass={"mb-3"}/>
                    <div className={'row'}>
                        <div className={'sms-dashboard-col'}>
                            <div className={'sms-form'}>
                                <div className={"mb-3"}>
                                    <label className={'form-label d-block mb-2'} htmlFor='name'>{LABELS_AND_HEADINGS.IMAGE}</label>
                                    {
                                        titleImageUrl ?
                                            <>
                                                <img
                                                    src={titleImageUrl}
                                                    alt={titleImageFilename}
                                                    className='w-100 mb-3'
                                                />
                                                <p>{titleImageFilename}</p>
                                                <label className='btn btn-primary' htmlFor='single'>
                                                    {uploading ? <Spinner small={true} color={'text-black'}/> : LABELS_AND_HEADINGS.CHANGE_IMAGE}
                                                </label>
                                            </>
                                            :
                                            <>
                                                <NoDataAvailable/>
                                                <label className='btn btn-primary' htmlFor='single'>
                                                    {uploading ? <Spinner small={true} color={'text-black'}/> : LABELS_AND_HEADINGS.UPLOAD_IMAGE}
                                                </label>
                                            </>
                                    }
                                </div>
                                <input
                                    className={'d-none'}
                                    type='file'
                                    id='single'
                                    accept='image/*'
                                    onChange={uploadTitleImage}
                                    disabled={uploading}
                                />

                                <label className={'form-label'} htmlFor='name'>{LABELS_AND_HEADINGS.NAME}</label>
                                <input
                                    id='name'
                                    className={formInputClass}
                                    type='text'
                                    value={name || ''}
                                    onChange={handleNameInputChange}
                                />
                                <label className={'form-label'} htmlFor='startyear'>{LABELS_AND_HEADINGS.START_YEAR}</label>
                                <input
                                    id='startyear'
                                    className={formInputClass}
                                    type='number'
                                    value={startYear || 1975}
                                    onChange={(e) => setStartYear(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='endyear'>{LABELS_AND_HEADINGS.END_YEAR}</label>
                                <input
                                    id='endyear'
                                    className={formInputClass}
                                    type='number'
                                    value={endYear || 1977}
                                    onChange={(e) => setEndYear(e.target.value)}
                                />
                                <label className={'form-label'} htmlFor='format'>{LABELS_AND_HEADINGS.FORMAT_DB}</label>
                                {
                                    formatData &&
                                        <select name="formats" id="format" className={"form-select mb-3"} onChange={(e) => setFormatId(e.target.value)}>
                                            <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                            {printOptions(formatData)}
                                        </select>
                                }
                                <label className={'form-label'} htmlFor='totalissues'>{LABELS_AND_HEADINGS.TOTAL_ISSUES_DB}</label>
                                <input
                                    id='totalissues'
                                    className={formInputClass}
                                    type='number'
                                    value={totalIssues || 12}
                                    onChange={(e) => setTotalIssues(e.target.value)}
                                />
                                <button className={'btn btn-primary me-3 mb-2'}
                                        onClick={() => addTitleData({
                                            name: name,
                                            startYear: startYear,
                                            endYear: endYear,
                                            formatId: formatId,
                                            totalIssues: totalIssues,
                                            titleImageFilename: titleImageFilename,
                                            titleImageUrl: titleImageUrl
                                        }, setFormMessage, setShowFormSuccess, setShowFormError).then()}
                                        disabled={!nameValidated || !titleImageFilename}>
                                    {LABELS_AND_HEADINGS.ADD}
                                </button>
                                <button className={'btn btn-outline-secondary mb-2'}
                                        onClick={resetAddTitleForm}>
                                    {LABELS_AND_HEADINGS.RESET_FORM}
                                </button>
                                {showFormError && <p className={'alert alert-danger mt-3'}>{formMessage}</p>}
                                {showFormSuccess && <p className={'alert alert-success mt-3'}>{formMessage}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
