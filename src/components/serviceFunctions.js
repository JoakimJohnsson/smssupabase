import {supabase} from "../supabase/supabaseClient";

export async function getProfile(setLoading, setFirstname, setLastname, setWebsite, setAvatarImageFilename, id) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from('profiles')
            .select(`firstname, lastname, website, avatar_image_filename`)
            .eq('id', id)
            .single();

        if (error && status !== 406) {
            console.log('Error: ', error);
        }

        if (data) {
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setWebsite(data.website);
            setAvatarImageFilename(data.avatar_image_filename);
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        setLoading(false)
    }
}

export async function getFormats(setLoading, setFormatData) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from('formats')
            .select('*')
        if (error && status !== 406) {
            console.log('Error: ', error);
        }
        if (data) {
            setFormatData(data)
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        setLoading(false)
    }
}
