import React, {useState} from "react";
import {BUCKETS, FILETYPES, LABELS_AND_HEADINGS, TABLES} from "../../../helpers/constants";
import {addPublisherData, deleteImageFromBucket} from "../../serviceFunctions";
import {handleNameInput, hideAndResetMessage, printOptions} from "../../../helpers/functions";
import countryData from "../../../helpers/valueLists/countries.json";
import {useCommonFormStates} from "../../../helpers/customHooks/useCommonFormStates";
import {AdminH1} from "../../headings";
import {ImageUploader} from "../../ImageUploader";


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

    const [countryId, setCountryId] = useState("");

    const deletePublisherImage = async () => {
        await deleteImageFromBucket(imageFilename, setUploading, BUCKETS.PUBLISHER_IMAGES,
            setImageUrl, setImageFilename, TABLES.PUBLISHERS);
    }

    const resetAddPublisherForm = async () => {
        setImageFilename(null);
        setImageUrl(null);
        setName("");
        setDisableReset(false);
        hideAndResetMessage(setShowFormError, setShowFormSuccess, setFormMessage);
    }

    return (
        <main className={"container-fluid main-container"}>
            <div className={"row"}>
                <div className={"col-12 main-col"}>
                    <AdminH1 text={LABELS_AND_HEADINGS.ADD_PUBLISHER}/>
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
                                    bucketName={BUCKETS.PUBLISHER_IMAGES}
                                    tableName={TABLES.PUBLISHERS}
                                    setDisableReset={setDisableReset}
                                    fileType={FILETYPES.PUBLISHER_IMAGE}
                                    id={false}
                                />
                                <label className={"form-label"} htmlFor="name">{LABELS_AND_HEADINGS.NAME}</label>
                                <input
                                    id="name"
                                    className={formInputClass}
                                    type="text"
                                    value={name || ""}
                                    onChange={e => handleNameInput(e, setName, setFormInputClass, setNameValidated)}
                                />
                                <label className={"form-label"} htmlFor="format">{LABELS_AND_HEADINGS.COUNTRY_DB}</label>
                                {
                                    countryData &&
                                    <select name="countries" id="country" className={"form-select mb-3"}
                                            onChange={(e) => setCountryId(e.target.value)}>
                                        <option value={""}>{LABELS_AND_HEADINGS.CHOOSE}</option>
                                        {printOptions(countryData)}
                                    </select>
                                }
                                <button className={"btn btn-primary me-3 mb-2"}
                                        onClick={() => addPublisherData({
                                            name: name,
                                            countryId: countryId,
                                            publisherImageFilename: imageFilename,
                                            publisherImageUrl: imageUrl
                                        }, deletePublisherImage, setFormMessage, setShowFormSuccess, setShowFormError).then(() => resetAddPublisherForm())}
                                        disabled={!nameValidated || !imageFilename}>
                                    {LABELS_AND_HEADINGS.ADD}
                                </button>
                                <button className={"btn btn-outline-secondary mb-2"}
                                        onClick={resetAddPublisherForm} disabled={disableReset}>
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
