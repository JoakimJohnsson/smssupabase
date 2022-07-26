import React, {useState} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {FILETYPES, LABELS_AND_HEADINGS, MESSAGES} from '../helpers/constants';
import {Spinner} from './Spinner';
import {useAppContext} from '../context/AppContext';
import {generateUniqueHashedFilename} from "../helpers/functions";


export const Avatar = ({onUpload}) => {
    const [uploading, setUploading] = useState(false);
    const {avatarImageUrl, setAvatarImageUrl, avatarImageFilename, setAvatarImageFilename} = useAppContext();

    async function uploadAvatarImage(event) {
        await deleteAvatarImage();
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                console.log(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
            }
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = generateUniqueHashedFilename(fileExt, FILETYPES.AVATAR_IMAGE);
            const filePath = `${fileName}`;
            let {error: uploadError} = await supabase.storage
                .from('avatars')
                .upload(filePath, file);
            setAvatarImageFilename(fileName);
            setAvatarImageUrl(supabase
                .storage
                .from('avatars')
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

    async function deleteAvatarImage() {
        if (avatarImageFilename) {
            try {
                setUploading(true);
                let {error: deleteError} = await supabase.storage
                    .from('avatars')
                    .remove([avatarImageFilename]);
                let {error} = await supabase
                    .from('profiles')
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
        <div>
            {
                avatarImageUrl &&
                <img
                    src={avatarImageUrl}
                    alt='User avatar'
                    className='w-100 mb-3'
                />
            }
            {
                avatarImageUrl ?
                    <div>
                        <label className='btn btn-primary' htmlFor='single'>
                            {uploading ? <Spinner small={true} color={'text-black'}/> : LABELS_AND_HEADINGS.CHANGE_IMAGE}
                        </label>
                        <button className={'btn btn-outline-secondary ms-3'} onClick={deleteAvatarImage}>{LABELS_AND_HEADINGS.DELETE_IMAGE}</button>
                    </div>
                    :
                    <label className='btn btn-primary' htmlFor='single'>
                        {uploading ? <Spinner small={true} color={'text-black'}/> : LABELS_AND_HEADINGS.UPLOAD_NEW_IMAGE}
                    </label>
            }
            <input
                className={'d-none'}
                type='file'
                id='single'
                accept='image/*'
                onChange={uploadAvatarImage}
                disabled={uploading}
            />
        </div>
    )
}
