import React from "react";
import {LABELS_AND_HEADINGS} from "../helpers/constants";
import {Spinner} from "./minis/Spinner";
import {NoDataAvailable} from "./minis/NoDataAvailable";
import {TrashIcon} from "@heroicons/react/solid";


export const AvatarImageUploader = ({imageUrl, imageFilename, uploading, uploadImage, deleteImage}) => {

    return (
        <>
            <div className={"mb-3"}>
                <label className={"form-label d-block"}>{LABELS_AND_HEADINGS.IMAGE}</label>
                {
                    imageUrl ?
                        <>
                            <img
                                src={imageUrl}
                                alt={imageFilename}
                                className="w-100 mb-3"
                            />
                            <p>{imageFilename}</p>
                            <button className={"btn btn-danger"} onClick={deleteImage}>
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
                onChange={uploadImage}
                disabled={uploading}
            />
        </>
    )
}
