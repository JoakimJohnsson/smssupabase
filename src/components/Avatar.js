import React, {useEffect, useState} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {downloadImage} from "../helpers/functions";

function Avatar({url, onUpload}) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (url) {
            downloadImage(url, setAvatarUrl).then(() => "Do something");
        }
    }, [url]);

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
            {avatarUrl &&
                <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="w-100 mb-3"
                />
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
