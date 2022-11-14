import React from "react";
import {LABELS_AND_HEADINGS} from "../helpers/constants";
import {Spinner} from "./minis/Spinner";
import {NoDataAvailable} from "./minis/NoDataAvailable";
import {TrashIcon} from "@heroicons/react/solid";
import {deleteImageFromBucket, updateImageDataOnTable, uploadImage} from "./serviceFunctions";


export const ImageUploader = ({
                                  imageUrl,
                                  setImageUrl,
                                  imageFilename,
                                  setImageFilename,
                                  uploading,
                                  setUploading,
                                  bucketName,
                                  tableName,
                                  fileType,
                                  id,
                                  update
                              }) => {

    const handleDeleteImage = async () => {
        try {
            await deleteImageFromBucket(imageFilename, setUploading, bucketName, setImageUrl, setImageFilename)
                .then(() => {
                    updateImageDataOnTable(tableName, id, "", "");
                    update();
                });
        } catch (error) {
            console.error(error);
        }
    }

    const handleUploadImage = async (e) => {
        try {
            await uploadImage(e, tableName, id, setUploading, bucketName, fileType,
                imageUrl, setImageFilename, setImageUrl);
            update();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className={"mb-3"}>
                <label className={"form-label d-block mb-2"}>{LABELS_AND_HEADINGS.IMAGE}</label>
                {
                    imageUrl ?
                        <>
                            <img
                                src={imageUrl}
                                alt={imageFilename}
                                className="w-100 mb-3"
                            />
                            <p>{imageFilename}</p>

                            <button className={"btn btn-danger"}
                                    onClick={handleDeleteImage}>
                                <TrashIcon className={"sms-icon--text-lg"}/> {LABELS_AND_HEADINGS.DELETE_IMAGE}
                            </button>
                        </>
                        :
                        <>
                            <NoDataAvailable/>
                            <label className="btn btn-primary" htmlFor="single">
                                {uploading ?
                                    <Spinner small={true} color={"text-black"}/>
                                    :
                                    LABELS_AND_HEADINGS.UPLOAD_IMAGE}
                            </label>
                        </>
                }
            </div>
            <input
                className={"d-none"}
                type="file"
                id="single"
                accept="image/*"
                onChange={(e) => handleUploadImage(e)}
                disabled={uploading}
            />
        </>
    )
}
