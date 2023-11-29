import {supabase} from "../../../supabase/supabaseClient";
import {TABLES} from "../../constants";

export const addMessageData = async (data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.MESSAGES)
            .insert([{
                origin_id: data.origin_id,
                origin_table: data.origin_table,
                is_global: data.is_global,
                status: data.status,
                sender_id: data.sender_id,
                receiver_id: data.receiver_id,
                topic_id: data.topic_id,
                title: data.title,
                text: data.text
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updateMessageStatus = async (id, value) => {
    try {
        await supabase
            .from(TABLES.MESSAGES)
            .update([{
                status: value
            }])
            .eq("id", id);
    } catch (error) {
        console.error(error);
    }
}
