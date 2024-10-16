import {supabase} from "../supabase/supabaseClient";
import {MESSAGES} from "../helpers/constants/textConstants/messages";
import {TABLES} from "../helpers/constants/serviceConstants";
import {getUserIdByUserEmail} from "../helpers/databaseFunctions";


export const updateProfileData = async (id, data) => {
    try {
        await supabase
            .from(TABLES.PROFILES)
            .update([{
                website: data.website,
                firstname: data.firstname,
                lastname: data.lastname,
                is_public: data.is_public,
                allow_location_access: data.allow_location_access,
                updated_at: new Date().toISOString()
            }])
            .eq("id", id);
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

export const updateProfileLastLogin = async (email) => {
    const date = new Date().toISOString();
    const userId = await getUserIdByUserEmail(email);
    if (userId) {
        try {
            await supabase
                .from(TABLES.PROFILES)
                .update({last_login: date})
                .eq("id", userId);
        } catch (error) {
            console.error(error);
        }
    }
}

// Calculate if to show full info - If the user have a public profile, or if logged in profile is super admin, or logged in profile is looking at her own info.
export const showFullInfo = (user, profile) => {
    return user.is_public || profile.role === 2 || (user.id === profile.id);
}

export const isSuperAdmin = (profile) => {
    return profile && profile.role && profile.role === 2;
}
