import {supabase} from "../../../supabase/supabaseClient";
import {MESSAGES, TABLES} from "../../constants";

// TITLE
export const checkIfIsCollectingTitle = async (userId, titleId, setCollectingTitle) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USERS_TITLES)
            .select()
            .match({user_id: userId, title_id: titleId})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data.length > 0) {
            setCollectingTitle(true)
        }
    } catch (error) {
        console.error(error);
    }
}

export const addTitleToCollection = async (userId, titleId, setInformationMessage, setCollectingTitle) => {
    try {
        await supabase
            .from(TABLES.USERS_TITLES)
            .insert([{
                user_id: userId,
                title_id: titleId,
            }])
    } catch (error) {
        console.error(error);
    }
}

export const removeTitleFromCollection = async (userId, titleId, displayName, setInformationMessage, setCollectingTitle) => {
    if (!window.confirm(MESSAGES.CONFIRM.REMOVE_1 + displayName + MESSAGES.CONFIRM.REMOVE_2)) {
        return false;
    }
    try {
        let {error, status} = await supabase
            .from(TABLES.USERS_TITLES)
            .delete()
            .match({user_id: userId, title_id: titleId})
        if (error && status !== 406) {
            setInformationMessage({show: true, status: status, error: error});
        } else {
            setCollectingTitle(false);
        }
    } catch (error) {
        console.error(error);
    }
}

