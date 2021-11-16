import {supabase} from "../supabase/supabaseClient";

export   async function downloadImage(path, setAvatarUrl) {
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