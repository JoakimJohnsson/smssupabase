import {supabase} from "../supabase/supabaseClient";
import {TABLES} from "../helpers/constants";
import {getCurrentDate} from "../helpers/functions";

export const updateReleaseDate = async (setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.UTILS)
            .update([{
                release_date: getCurrentDate(),
            }])
            .eq("id", 1)
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}
