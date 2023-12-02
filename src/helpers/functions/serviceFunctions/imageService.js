import {MESSAGES} from "../../constants";
import {generateUniqueHashedFilename} from "../functions";
import {supabase} from "../../../supabase/supabaseClient";


export const uploadImage = async (e, tableName, id, setUploading, bucketName, fileType, imageUrl, setImageFilename, setImageUrl) => {
    setUploading(true);
    if (!e.target.files || e.target.files.length === 0) {
        console.info(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
    } else {
        let file = e.target.files[0];
        try {
            const fileExt = file.name.split(".").pop();
            const newFileName = generateUniqueHashedFilename(fileExt, fileType);
            let {error: uploadError} = await supabase
                .storage
                .from(bucketName)
                .upload(newFileName, file);
            setImageFilename(newFileName);
            setImageUrl(supabase
                .storage
                .from(bucketName)
                .getPublicUrl(newFileName).data.publicUrl);

            // Only used when updating image on existing row
            if (id) {
                await updateImageDataOnTable(tableName, id, newFileName, supabase
                    .storage
                    .from(bucketName)
                    .getPublicUrl(newFileName).data.publicUrl);
            }
            if (uploadError) {
                console.error(uploadError);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    }
}

export const deleteImageFromBucket = async (fileName, setUploading, bucketName, setImageUrl, setImageFilename) => {
    if (fileName) {
        try {
            setUploading(true);
            let {error} = await supabase.storage
                .from(bucketName)
                .remove([fileName]);
            setImageUrl(null);
            setImageFilename(null);
            if (error) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    }
}

export const updateImageDataOnTable = async (tableName, id, updatedImageFileName, updatedImageUrl) => {
    if (id) {
        try {
            let {error} = await supabase
                .from(tableName)
                .update({image_filename: updatedImageFileName, image_url: updatedImageUrl})
                .match({id: id})
            if (error) {
                console.error(error);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export const deleteImageFromBucketSimple = async (fileName, bucketName) => {
    try {
        let {error} = await supabase.storage
            .from(bucketName)
            .remove([fileName]);
        if (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}
