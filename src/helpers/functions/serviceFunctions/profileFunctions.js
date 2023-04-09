import {supabase} from "../../../supabase/supabaseClient";
import {MESSAGES, TABLES} from "../../constants";

export const updateProfileData = async (id, data) => {
    try {
        await supabase
            .from(TABLES.PROFILES)
            .update([{
                website: data.website,
                firstname: data.firstname,
                lastname: data.lastname
            }])
            .eq("id", id);
    } catch (error) {
        console.error(error);
    }
}

export const updateProfileRole = async (id, value, setInformationMessage, setConfirmed) => {
    if (!window.confirm(MESSAGES.CONFIRM.CHANGE_ROLE)) {
        setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
        return false;
    } else {
        setConfirmed(true);
    }
    try {
        await supabase
            .from(TABLES.PROFILES)
            .update([{
                role: value
            }])
            .eq("id", id);
    } catch (error) {
        console.error(error);
    }
}
