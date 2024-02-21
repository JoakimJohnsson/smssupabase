import {supabase} from "../supabase/supabaseClient";

// Helper methods for performing SQL Supabase database functions defined and edited in the SMS Supabase project.

export const deleteAllGradeValuesForIssue = async (issueId, callbackFunction) => {
    try {
        await supabase.rpc('delete_all_grade_values_for_issue', {input_issue_id: issueId}).then(() => callbackFunction());
    } catch (error) {
        console.error(error);
    }
}

export const insertAllGradeValuesForIssue = async (issueId, callbackFunction) => {
    try {
        await supabase.rpc('insert_all_grade_values_for_issue', {input_issue_id: issueId, input_value: 0}).then(() => callbackFunction());
    } catch (error) {
        console.error(error);
    }
}

export const doesUserCollectIssue = async (userId, issueId) => {
    try {
        return await supabase.rpc('does_user_collect_issue', {input_user_id: userId, input_issue_id: issueId});
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const doesUserCollectTitle = async (userId, titleId) => {
    try {
        return await supabase.rpc('does_user_collect_title', {input_user_id: userId, input_title_id: titleId});
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const updateGradeValuesForTitles = async (titleId, prValue, gdValue, vgValue, fnValue, vfValue, nmValue, callbackFunction) => {
    try {
        await supabase.rpc('update_grade_values_for_titles', {
            title_ids: [titleId],
            value_pr: prValue,
            value_gd: gdValue,
            value_vg: vgValue,
            value_fn: fnValue,
            value_vf: vfValue,
            value_nm: nmValue,
        }).then(() => callbackFunction(false));
    } catch (error) {
        console.error(error);
    }
}

