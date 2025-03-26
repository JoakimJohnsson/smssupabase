import {supabase} from "../supabase/supabaseClient";


export const updateReleaseDate = async (setInformationMessage) => {
    try {
        let { error, status } = await supabase
            .rpc('update_release_date');
        setInformationMessage({ show: true, status: status, error: error });
    } catch (error) {
        console.error(error);
    }
}
