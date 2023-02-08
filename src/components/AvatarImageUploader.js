import React from "react";
import {LABELS_AND_HEADINGS} from "../helpers/constants";
import {Spinner} from "./minis/Spinner";
import {NoDataAvailable} from "./minis/NoDataAvailable";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";
import {IconButton} from "./minis/IconButton";


export const AvatarImageUploader = ({imageUrl, imageFilename, uploading, uploadImage, deleteImage}) => {

    return (
        <>
            <div className={"mb-3"}>
                {
                    imageUrl ?
                        <>
                            <img
                                src={imageUrl}
                                alt={imageFilename}
                                className="w-100 mb-3"
                            />
                            <p>{imageFilename}</p>
                            <IconButton variant={"danger"} icon={faTrashCan} onClick={deleteImage} label={LABELS_AND_HEADINGS.DELETE_IMAGE}/>
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
