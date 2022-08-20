import React, {useState} from "react";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS} from "../../../helpers/constants";
import {addPublisherData, deleteImage, uploadImage} from "../../serviceFunctions";
import {handleNameInput, printOptions} from "../../../helpers/functions";
import {BackButton} from "../../miniComponents/BackButton";
import countryData from "../../../helpers/valueLists/countries.json";
import {ImageUploader} from "../../ImageUploader";
import {useCommonFormStates} from "../../../helpers/customHooks/useCommonFormStates";
import {AdminIcon} from "../../icons/AdminIcon";


export const AdminPublisherAdd = () => {

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

    const [countryId, setCountryId] = useState('');

    const deletePublisherImage = async () => {
        await deleteImage(imageFilename, setUploading, BUCKETS.TITLE_IMAGES,
            setImageUrl, setImageFilename);
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
                    <h1 className={"text-icon-header"}><AdminIcon textVariant={"xl"}/><span>{LABELS_AND_HEADINGS.ADD_PUBLISHER}</span></h1>
                    <BackButton customClass={"mb-3"}/>
                    <div className={'row'}>
                        <div className={'sms-dashboard-col'}>
                            <div className={'sms-form'}>
                                <ImageUploader
                                    imageUrl={imageUrl}
                                    imageFilename={imageFilename}
                                    uploading={uploading}
                                    uploadImage={e => uploadImage(e, imageFilename, setUploading, setDisableReset, BUCKETS.PUBLISHER_IMAGES,
                                        FILETYPES.PUBLISHER_IMAGE, imageUrl, setImageFilename ,setImageUrl)}
                                    deleteImage={deletePublisherImage}
                                />
                                <label className={'form-label'} htmlFor='name'>{LABELS_AND_HEADINGS.NAME}</label>
                                <input
                                    id='name'
                                    className={formInputClass}
                                    type='text'
                                    value={name || ''}
                                    onChange={e => handleNameInput(e, setName, setFormInputClass, setNameValidated)}
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
