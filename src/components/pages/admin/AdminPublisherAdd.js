import React, {useEffect, useState} from "react";
import {BUCKETS, CLASSES, FILETYPES, FORMATS, LABELS_AND_HEADINGS, MESSAGES} from "../../../helpers/constants";
import {Spinner} from "../../Spinner";
import {addPublisherData, addTitleData, deleteImage, getRowsByTable} from "../../serviceFunctions";
import {validateText} from "../../../helpers/validations";
import {generateUniqueHashedFilename, handleGenericFormInput} from "../../../helpers/functions";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import {supabase} from "../../../supabase/supabaseClient";
import {NoDataAvailable} from "../../miniComponents/NoDataAvailable";


export const AdminPublisherAdd = () => {

    const [name, setName] = useState("");
    const [showFormError, setShowFormError] = useState(false);
    const [showFormSuccess, setShowFormSuccess] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [nameValidated, setNameValidated] = useState(false);
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [uploading, setUploading] = useState(false);
    const [publisherImageFilename, setPublisherImageFilename] = useState('');
    const [publisherImageUrl, setPublisherImageUrl] = useState('');

    const handleNameInputChange = (e) => {
        setName(e.target.value)
        // Send true for success
        validateText(e) ? handleGenericFormInput(true, setFormInputClass, setNameValidated) : handleGenericFormInput(false, setFormInputClass, setNameValidated);
    }

    async function uploadPublisherImage(event) {
        await deleteImage(publisherImageFilename, setUploading, BUCKETS.PUBLISHER_IMAGES,
            setPublisherImageUrl, setPublisherImageFilename);
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

    const resetAddPublisherForm = async () => {
        await deleteImage(publisherImageFilename, setUploading, BUCKETS.PUBLISHER_IMAGES,
            setPublisherImageUrl, setPublisherImageFilename);
        setName("");
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
                                        publisherImageUrl ?
                                            <>
                                                <img
                                                    src={publisherImageUrl}
                                                    alt={publisherImageFilename}
                                                    className='w-100 mb-3'
                                                />
                                                <p>{publisherImageFilename}</p>
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
                                    onChange={uploadPublisherImage}
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
                                <button className={'btn btn-primary me-3 mb-2'}
                                        onClick={() => addPublisherData({
                                            name: name,
                                            publisherImageFilename: publisherImageFilename,
                                            publisherImageUrl: publisherImageUrl
                                        }, setFormMessage, setShowFormSuccess, setShowFormError).then()}
                                        disabled={!nameValidated || !publisherImageFilename}>
                                    {LABELS_AND_HEADINGS.ADD}
                                </button>
                                <button className={'btn btn-outline-secondary mb-2'}
                                        onClick={resetAddPublisherForm}>
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
