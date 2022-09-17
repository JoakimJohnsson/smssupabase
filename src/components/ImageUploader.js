import React from "react";
import {LABELS_AND_HEADINGS} from "../helpers/constants";
import {Spinner} from "./miniComponents/Spinner";
import {NoDataAvailable} from "./miniComponents/NoDataAvailable";
import {TrashIcon} from "@heroicons/react/solid";
import {deleteImageFromBucket, uploadImage} from "./serviceFunctions";


export const ImageUploader = ({
                                        imageUrl,
                                        setImageUrl,
                                        imageFilename,
                                        setImageFilename,
                                        uploading,
                                        setUploading,
                                        bucketName,
                                        setDisableReset,
                                        fileType
                                    }) => {

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

                            <button className={"btn btn-danger mb-2"}
                                    onClick={() => deleteImageFromBucket(imageFilename, setUploading, bucketName, setImageUrl, setImageFilename)}>
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
                onChange={(e) => uploadImage(e, imageFilename, setUploading, setDisableReset, bucketName, fileType,
                    imageUrl, setImageFilename, setImageUrl)}
                disabled={uploading}
            />
        </>
    )
}
