import {supabase} from "../supabase/supabaseClient";
import {TABLES} from "../helpers/constants/serviceConstants";


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

export const getAllActiveGlobalMessages = async (setData) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.MESSAGES)
            .select("*")
            .eq("is_global", 1)
            .eq("status", 1)
            .is("receiver_id", null)
            .order("created_at", {ascending: false})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllUnreadMessages = async (setData) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.MESSAGES)
            .select("*")
            .eq("is_global", 0)
            .eq("status", 0)
            .is("receiver_id", null)
            .order("created_at", {ascending: true})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllTodoMessages = async (setData) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.MESSAGES)
            .select("*")
            .eq("is_global", 0)
            .eq("status", 2)
            .is("receiver_id", null)
            .order("created_at", {ascending: true})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getAllUserMessages = async (user, setData) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.MESSAGES)
            .select("*")
            .eq("receiver_id", user.id)
            .order("created_at", {ascending: true})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}
