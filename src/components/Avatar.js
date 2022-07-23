import React, {useState} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {LABELS_AND_HEADINGS, MESSAGES} from '../helpers/constants';
import {Spinner} from './Spinner';
import {useAppContext} from '../context/AppContext';

export const Avatar = ({onUpload}) => {
    const [uploading, setUploading] = useState(false);
    const {avatarImageUrl, setAvatarImageUrl, avatarFilename, setAvatarFilename} = useAppContext();

    async function uploadAvatar(event) {
        await deleteImage();
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                console.log(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
            }
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            let {error: uploadError} = await supabase.storage
                .from('avatars')
                .upload(filePath, file);
            setAvatarFilename(fileName);
            console.log('profile here with updated name', avatarFilename);

            setAvatarImageUrl(supabase
                .storage
                .from('avatars')
                .getPublicUrl(fileName).publicURL)

            if (uploadError) {
                console.log(MESSAGES.ERROR.VALIDATION_UPLOAD + ' 1');
            }
            onUpload(filePath);
        } catch (error) {
            console.log(error.message);
        } finally {
            setUploading(false);
        }
    }

    async function deleteImage() {
        if (avatarFilename) {
            try {
                setUploading(true);
                let {error: deleteError} = await supabase.storage
                    .from('avatars')
                    .remove([avatarFilename]);

                let {error} = await supabase
                    .from('profiles')
                    .update({avatar_image_filename: null})
                    .match({avatar_image_filename: avatarFilename})
                setAvatarImageUrl(null);
                setAvatarFilename(null);
                if (deleteError || error) {
                    console.log(MESSAGES.ERROR.VALIDATION_UPLOAD);
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                setUploading(false);
            }
        }
    }

    return (
        <div>
            {avatarImageUrl &&
            <img
                src={avatarImageUrl}
                alt='User avatar'
                className='w-100 mb-3'
            />
            }
            {avatarImageUrl ?
                <div>
                    <label className='btn btn-primary' htmlFor='single'>
                        {uploading ? <Spinner small={true} color={'text-black'}/> : LABELS_AND_HEADINGS.CHANGE_IMAGE}
                    </label>
                    <button className={'btn btn-outline-secondary ms-3'} onClick={deleteImage}>{LABELS_AND_HEADINGS.DELETE_IMAGE}</button>
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
                onChange={uploadAvatar}
                disabled={uploading}
            />
        </div>
    )
}
