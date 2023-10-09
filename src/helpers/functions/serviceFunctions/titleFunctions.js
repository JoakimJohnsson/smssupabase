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
                comics_org_url: data.comics_org_url,
                start_year: data.start_year,
                end_year: data.end_year,
                format_id: data.format_id,
                total_issues: data.total_issues
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updateTitleData = async (id, data) => {
    try {
        await supabase
            .from(TABLES.TITLES)
            .update([{
                name: data.name,
                description: data.description,
                wiki_url: data.wiki_url,
                comics_org_url: data.comics_org_url,
                start_year: data.start_year,
                end_year: data.end_year,
                publisher_id: data.publisher_id,
                format_id: data.format_id,
                total_issues: data.total_issues
            }])
            .eq("id", id);
    } catch (error) {
        console.error(error);
    }
}

export const getTitlesForUser = async (userId, setTitlesData) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USERS)
            .select(`
            id,
            titles (*)
            `).eq("id", userId)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data[0] && data[0].titles) {
            setTitlesData(data[0].titles)
        }
    } catch (error) {
        console.error(error);
    }
}
