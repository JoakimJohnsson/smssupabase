import React, {useState} from 'react';
import {supabase} from '../supabase/supabaseClient';
import {LABELS_AND_HEADINGS, MESSAGES} from "../helpers/constants";
import Spinner from "./Spinner";
import {useAppContext} from "../context/AppContext";

function Avatar({onUpload}) {
    const [uploading, setUploading] = useState(false);
    const {avatarImageUrl, setAvatarImageUrl} = useAppContext();

    async function uploadAvatar(event) {
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

            setAvatarImageUrl(supabase
                .storage
                .from('avatars')
                .getPublicUrl(fileName).publicURL)

            if (uploadError) {
                console.log(MESSAGES.ERROR.VALIDATION_UPLOAD);
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
            {avatarImageUrl &&
            <img
                src={avatarImageUrl}
                alt="User avatar"
                className="w-100 mb-3"
            />
            }
            {avatarImageUrl ?
                <label className="btn btn-primary" htmlFor="single">
                    {uploading ? <Spinner small={true} color={"text-black"}/> : LABELS_AND_HEADINGS.CHANGE_IMAGE}
                </label>
                :
                <label className="btn btn-primary" htmlFor="single">
                    {uploading ? <Spinner small={true} color={"text-black"}/> : LABELS_AND_HEADINGS.UPLOAD_NEW_IMAGE}
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