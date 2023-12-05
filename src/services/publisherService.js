import {supabase} from "../supabase/supabaseClient";
import {TABLES} from "../helpers/constants";

export const addPublisherData = async (data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.PUBLISHERS)
            .insert([{
                name: data.name,
                description: data.description,
                wiki_url: data.wiki_url,
                country_id: data.country_id
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updatePublisherData = async (id, data) => {
    try {
        await supabase
            .from(TABLES.PUBLISHERS)
            .update([{
                name: data.name,
                description: data.description,
                wiki_url: data.wiki_url,
                country_id: data.country_id
            }])
            .eq("id", id);
    } catch (error) {
        console.error(error);
    }
}
