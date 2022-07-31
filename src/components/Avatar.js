import React, {useState} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {BUCKETS, FILETYPES, MESSAGES, TABLES} from '../helpers/constants';
import {useAppContext} from '../context/AppContext';
import {generateUniqueHashedFilename} from "../helpers/functions";
import {ImageUploader} from "./ImageUploader";


export const Avatar = ({onUpload}) => {
    const [uploading, setUploading] = useState(false);
    const {avatarImageUrl, setAvatarImageUrl, avatarImageFilename, setAvatarImageFilename} = useAppContext();

    const uploadAvatarImage = async (event) => {
        await deleteAvatarImage();
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                console.log(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
            }
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = generateUniqueHashedFilename(fileExt, FILETYPES.AVATAR_IMAGE);
            const filePath = fileName;
            let {error: uploadError} = await supabase.storage
                .from(BUCKETS.AVATAR_IMAGES)
                .upload(filePath, file);
            setAvatarImageFilename(fileName);
            setAvatarImageUrl(supabase
                .storage
                .from(BUCKETS.AVATAR_IMAGES)
                .getPublicUrl(fileName).publicURL)
            if (uploadError) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD + ' 1');
            }
            onUpload(filePath);
        } catch (error) {
            console.error(error.message);
        } finally {
            setUploading(false);
        }
    }

    const deleteAvatarImage = async () => {
        if (avatarImageFilename) {
            try {
                setUploading(true);
                let {error: deleteError} = await supabase.storage
                    .from(BUCKETS.AVATAR_IMAGES)
                    .remove([avatarImageFilename]);
                let {error} = await supabase
                    .from(TABLES.PROFILES)
                    .update({avatar_image_filename: null})
                    .match({avatar_image_filename: avatarImageFilename})
                setAvatarImageUrl(null);
                setAvatarImageFilename(null);
                if (deleteError || error) {
                    console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setUploading(false);
            }
        }
    }

    return (
        <ImageUploader
            imageUrl={avatarImageUrl}
            imageFilename={avatarImageFilename}
            uploading={uploading}
            uploadImage={uploadAvatarImage}
            deleteImage={deleteAvatarImage}
        />
    )
}
