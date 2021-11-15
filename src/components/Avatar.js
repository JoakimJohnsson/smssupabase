import React, {useEffect, useState} from 'react';
import {supabase} from '../supabase/supabaseClient';

function Avatar({url, onUpload}) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) {
            downloadImage(url).then(() => "Do something");
        }
    }, [url]);

    async function downloadImage(path) {
        try {
            const {data, error} = await supabase.storage.from('avatars').download(path);
            if (error) {
                console.log('Error trying to download image: ', error.message);
            }
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.log('Error downloading image: ', error.message);
        }
    }

    async function uploadAvatar(event) {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }
            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            let {error: uploadError} = await supabase.storage
                .from('avatars')
                .upload(filePath, file);
            if (uploadError) {
                throw uploadError;
            }
            onUpload(filePath);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div>
            {avatarUrl ?
                <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="w-100 mb-3"
                />
                :
                false
            }
            {avatarUrl ?
                <label className="btn btn-primary" htmlFor="single">
                    {uploading ? 'Uploading ...' : 'Change image'}
                </label>
                :
                <label className="btn btn-primary" htmlFor="single">
                    {uploading ? 'Uploading ...' : 'Upload new image'}
                </label>
            }
            <input
                className={"d-none"}
                type="file"
                id="single"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
            />
        </div>
    )
}

export default Avatar;
