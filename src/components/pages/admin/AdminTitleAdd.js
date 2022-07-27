import React, {useEffect, useState} from "react";
import {BUCKETS, CLASSES, FILETYPES, FORMATS, LABELS_AND_HEADINGS, MESSAGES} from "../../../helpers/constants";
import {Spinner} from "../../Spinner";
import {addTitleData, getRowsByTable} from "../../serviceFunctions";
import {validateText} from "../../../helpers/validations";
import {generateUniqueHashedFilename, handleGenericFormInput} from "../../../helpers/functions";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import {supabase} from "../../../supabase/supabaseClient";
import {NoDataAvailable} from "../../miniComponents/NoDataAvailable";


export const AdminTitleAdd = () => {

    const [name, setName] = useState("");
    const [startYear, setStartYear] = useState(1975);
    const [endYear, setEndYear] = useState(1975);
    const [format, setFormat] = useState("");
    const [totalIssues, setTotalIssues] = useState(12);
    const [formatData, setFormatData] = useState(null);
    const [showFormError, setShowFormError] = useState(false);
    const [showFormSuccess, setShowFormSuccess] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [nameValidated, setNameValidated] = useState(false);
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [uploading, setUploading] = useState(false);
    const [titleImageFilename, setTitleImageFilename] = useState('');
    const [titleImageUrl, setTitleImageUrl] = useState('');

    useEffect(() => {
        getRowsByTable('formats', setFormatData).then();
    }, [])

    const handleNameInputChange = (e) => {
        setName(e.target.value)
        // Send true for success
        validateText(e) ? handleGenericFormInput(true, setFormInputClass, setNameValidated) : handleGenericFormInput(false, setFormInputClass, setNameValidated);
    }

    const printFormatSelectOptions = (fd) => {
        return fd.length ?
            fd.map((f) => <option key={f.id} value={f.id}>{FORMATS[f.type - 1]}</option>)
            :
            <NoDataAvailable/>
    }

    async function uploadTitleImage(event) {
        await deleteTitleImage();
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                console.log(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
            }
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = generateUniqueHashedFilename(fileExt, FILETYPES.TITLE_IMAGE);
            let {error: uploadError} = await supabase.storage
                .from(BUCKETS.TITLE_IMAGES)
                .upload(fileName, file);
            setTitleImageFilename(fileName);
            setTitleImageUrl(supabase
                .storage
                .from(BUCKETS.TITLE_IMAGES)
                .getPublicUrl(fileName).publicURL)
            if (uploadError) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD + ' 1');
            }
        } catch (error) {
            console.error(error.message);
        } finally {
            setUploading(false);
        }
    }

    async function deleteTitleImage() {
        if (titleImageFilename) {
            try {
                setUploading(true);
                let {error} = await supabase.storage
                    .from(BUCKETS.TITLE_IMAGES)
                    .remove([titleImageFilename]);

                setTitleImageUrl(null);
                setTitleImageFilename(null);
                if (error) {
                    console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setUploading(false);
            }
        }
    }

    async function resetAddTitleForm() {
        await deleteTitleImage();
        setName("");
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
                                    <label className={'form-label d-block mb-2'} htmlFor='name'>{LABELS_AND_HEADINGS.TITLE_IMAGE}</label>
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
                                    formatData ?
                                        <select name="formats" id="format" className={"form-select mb-3"} onChange={(e) => setFormat(e.target.value)}>
                                            <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                            {printFormatSelectOptions(formatData)}
                                        </select>
                                        :
                                        <Spinner/>
                                }
                                <label className={'form-label'} htmlFor='totalissues'>{LABELS_AND_HEADINGS.TOTAL_ISSUES}</label>
                                <input
                                    id='totalissues'
                                    className={formInputClass}
                                    type='number'
                                    value={totalIssues || 12}
                                    onChange={(e) => setTotalIssues(e.target.value)}
                                />
                                <button className={'btn btn-primary me-3 mb-2'}
                                        onClick={() => addTitleData(name, startYear, endYear, format, totalIssues, titleImageFilename, titleImageUrl, setFormMessage, setShowFormSuccess, setShowFormError).then()}
                                        disabled={!nameValidated}>
                                    {LABELS_AND_HEADINGS.ADD}
                                </button>
                                <button className={'btn btn-outline-secondary mb-2'}
                                        onClick={() => resetAddTitleForm(setName, setStartYear, setEndYear, setFormat, setTotalIssues, setShowFormError, setShowFormSuccess)}>
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
