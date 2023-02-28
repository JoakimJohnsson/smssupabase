import {supabase} from "../../../supabase/supabaseClient";
import {MESSAGES, TABLES} from "../../constants";

export const updateProfileData = async (id, data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.PROFILES)
            .update([{
                website: data.website,
                firstname: data.firstname,
                lastname: data.lastname
            }])
            .eq("id", id)
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updateProfileRole = async (id, value, setInformationMessage) => {
    if (!window.confirm(MESSAGES.CONFIRM.CHANGE_ROLE)) {
        setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
        return false;
    }
    try {
        let {error, status} = await supabase
            .from(TABLES.PROFILES)
            .update([{
                role: value
            }])
            .eq("id", id)
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}
