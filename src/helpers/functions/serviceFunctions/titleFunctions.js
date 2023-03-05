import {supabase} from "../../../supabase/supabaseClient";
import {TABLES} from "../../constants";

export const addTitleData = async (data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.TITLES)
            .insert([{
                name: data.name,
                description: data.description,
                wiki_url: data.wiki_url,
                start_year: data.start_year,
                end_year: data.end_year,
                publisher_id: data.publisher_id,
                format_id: data.format_id,
                total_issues: data.total_issues
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updateTitleData = async (id, data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.TITLES)
            .update([{
                name: data.name,
                description: data.description,
                wiki_url: data.wiki_url,
                start_year: data.start_year,
                end_year: data.end_year,
                publisher_id: data.publisher_id,
                format_id: data.format_id,
                total_issues: data.total_issues
            }])
            .eq("id", id)
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}
