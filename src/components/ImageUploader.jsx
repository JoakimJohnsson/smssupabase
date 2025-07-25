import React from "react";
import {LABELS} from "../helpers/constants/textConstants/labelsAndHeadings";
import {CustomSpinner} from "./minis/CustomSpinner";
import {NoDataAvailable} from "./minis/NoDataAvailable";
import {deleteImageFromBucket, updateImageDataOnTable, uploadImage} from "../services/imageService";
import {IconButton} from "./minis/IconButton";
import {faTrashCan} from "@fortawesome/pro-regular-svg-icons";
import {useAppContext} from "../context/AppContext";
import {Icon, imageIcon} from "./icons/Icons.jsx";


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

    const {setInformationMessage} = useAppContext();

    const handleDeleteImage = async () => {
        try {
            await deleteImageFromBucket(imageFilename, setUploading, bucketName, setImageUrl, setImageFilename)
                .then(() => {
                    updateImageDataOnTable(tableName, id, "", "");
                    update();
                });
        } catch (error) {
            setInformationMessage({show: true, status: 4, error: null});
            console.error(error);
        }
    }

    const handleUploadImage = async (e) => {
        try {
            await uploadImage(e, tableName, id, setUploading, bucketName, fileType,
                imageUrl, setImageFilename, setImageUrl);
            update();
        } catch (error) {
            setInformationMessage({show: true, status: 4, error: null});
            console.error(error);
        }
    }

    return (
        <>
            <div className={"mb-3"}>
                <h2>{LABELS.COMMON.IMAGE}</h2>
                {
                    imageUrl ?
                        <>
                            <img
                                src={imageUrl}
                                alt={imageFilename}
                                className="w-100 mb-3 bg-light"
                            />
                            <p>{imageFilename}</p>
                            <IconButton variant={"danger"} icon={faTrashCan} onClick={handleDeleteImage} label={LABELS.COMMON.DELETE_IMAGE}/>
                        </>
                        :
                        <>
                            <NoDataAvailable/>
                            <label className="btn btn-primary sms-btn align-items-center" htmlFor="single">
                                {uploading ?
                                    <>
                                        <CustomSpinner size={"1x"} color={"text-black"} className={"me-2"}/>
                                        {LABELS.COMMON.UPLOADING_IMAGE}
                                    </>
                                    :
                                    <>
                                        <Icon icon={imageIcon} size={"1x"} className={"me-2"}/>
                                        {LABELS.COMMON.UPLOAD_IMAGE}
                                    </>
                                }
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
