import React, {useState} from "react";
import {BUCKETS, CLASSES, FILETYPES, LABELS_AND_HEADINGS, MESSAGES} from "../../../helpers/constants";
import {addPublisherData, deleteImage, uploadImage} from "../../serviceFunctions";
import {validateText} from "../../../helpers/validations";
import {handleGenericFormInput, printOptions} from "../../../helpers/functions";
import {BanIcon} from "@heroicons/react/solid";
import {BackButton} from "../../miniComponents/BackButton";
import countryData from "../../../helpers/valueLists/countries.json";
import {ImageUploader} from "../../ImageUploader";


export const AdminPublisherAdd = () => {

    const [name, setName] = useState('');
    const [showFormError, setShowFormError] = useState(false);
    const [showFormSuccess, setShowFormSuccess] = useState(false);
    const [formMessage, setFormMessage] = useState('');
    const [nameValidated, setNameValidated] = useState(false);
    const [formInputClass, setFormInputClass] = useState(CLASSES.FORM_INPUT_DEFAULT);
    const [uploading, setUploading] = useState(false);
    const [imageFilename, setImageFilename] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [disableReset, setDisableReset] = useState(false);

    const [countryId, setCountryId] = useState('');

    const handleNameInputChange = (e) => {
        setName(e.target.value)
        // Send true for success
        validateText(e) ? handleGenericFormInput(true, setFormInputClass, setNameValidated) : handleGenericFormInput(false, setFormInputClass, setNameValidated);
    }

    const deletePublisherImage = async () => {
        await deleteImage(imageFilename, setUploading, BUCKETS.TITLE_IMAGES,
            setImageUrl, setImageFilename);
    }

    const uploadPublisherImage = async (event) => {
        setUploading(true);
        setDisableReset(true);
        let file = null;
        if (!event.target.files || event.target.files.length === 0) {
            console.log(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
        } else {
            file = event.target.files[0];
            await uploadImage(file, imageFilename, setUploading, BUCKETS.PUBLISHER_IMAGES, FILETYPES.PUBLISHER_IMAGE,
                imageUrl, setImageFilename, setImageUrl)
        }
    }

    const resetAddPublisherForm = async () => {
        setImageFilename(null);
        setImageUrl(null);
        setName('');
        setShowFormError(false);
        setShowFormSuccess(false);
    }

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <h1 className={"text-icon-header"}><BanIcon className={"sms-icon--text-xl"}/><span>{LABELS_AND_HEADINGS.ADD_PUBLISHER}</span></h1>
                    <BackButton customClass={"mb-3"}/>
                    <div className={'row'}>
                        <div className={'sms-dashboard-col'}>
                            <div className={'sms-form'}>
                                <ImageUploader
                                    imageUrl={imageUrl}
                                    imageFilename={imageFilename}
                                    uploading={uploading}
                                    uploadImage={uploadPublisherImage}
                                    deleteImage={deletePublisherImage}
                                />
                                <label className={'form-label'} htmlFor='name'>{LABELS_AND_HEADINGS.NAME}</label>
                                <input
                                    id='name'
                                    className={formInputClass}
                                    type='text'
                                    value={name || ''}
                                    onChange={handleNameInputChange}
                                />
                                <label className={'form-label'} htmlFor='format'>{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                                {
                                    countryData &&
                                        <select name="countries" id="country" className={"form-select mb-3"}
                                                onChange={(e) => setCountryId(e.target.value)}>
                                            <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                            {printOptions(countryData)}
                                        </select>
                                }
                                <button className={'btn btn-primary me-3 mb-2'}
                                        onClick={() => addPublisherData({
                                            name: name,
                                            countryId: countryId,
                                            publisherImageFilename: imageFilename,
                                            publisherImageUrl: imageUrl
                                        }, deletePublisherImage, setFormMessage, setShowFormSuccess, setShowFormError).then(() => setDisableReset(false))}
                                        disabled={!nameValidated || !imageFilename}>
                                    {LABELS_AND_HEADINGS.ADD}
                                </button>
                                <button className={'btn btn-outline-secondary mb-2'}
                                        onClick={resetAddPublisherForm} disabled={disableReset}>
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
