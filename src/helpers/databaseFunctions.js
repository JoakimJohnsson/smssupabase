import {supabase} from "../supabase/supabaseClient";
import {LOADING_STATES} from "./constants/configConstants.jsx";

// Helper methods for performing SQL Supabase database functions defined and edited in the SMS Supabase project.

// Collecting
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

export const getUserIssues = async (userId) => {
    try {
        return await supabase.rpc('get_user_issues', {input_user_id: userId});
    } catch (error) {
        console.error(error);
        return false;
    }
}
export const getTop5Issues = async () => {
    try {
        return await supabase.rpc('get_top_5_highest_rated_issues');
    } catch (error) {
        console.error(error);
        return false;
    }
}
export const getTop5Titles = async () => {
    try {
        return await supabase.rpc('get_top_5_highest_rated_titles');
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getMissingUserIssues = async (userId) => {
    try {
        return await supabase.rpc('get_missing_user_issues', {input_user_id: userId});
    } catch (error) {
        console.error(error);
        return false;
    }
}

// Returns wanted, upgraded and favorites lists of issues and titles.
export const getUserSelectedIssuesAndTitlesData = async (userId) => {
    try {
        return await supabase.rpc('get_user_selected_issue_and_titles_data', {input_user_id: userId});
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getAdjacentIssueIds = async (titleId, currentYear, currentNumber, isVariant, variantSuffix) => {
    const {data: prevIssueId} = await supabase
        .rpc('get_previous_issue_id', {
            p_title_id: titleId,
            p_year: currentYear,
            p_number: currentNumber,
            p_is_variant: isVariant,
            p_variant_suffix: variantSuffix
        });
    const {data: nextIssueId} = await supabase
        .rpc('get_next_issue_id', {
            p_title_id: titleId,
            p_year: currentYear,
            p_number: currentNumber,
            p_is_variant: isVariant,
            p_variant_suffix: variantSuffix
        });
    return {prevIssueId, nextIssueId};
}

// Grade values
export const deleteAllGradeValuesForIssue = async (issueId, callbackFunction) => {
    try {
        await supabase.rpc('delete_all_grade_values_for_issue', {input_issue_id: issueId}).then(() => callbackFunction());
    } catch (error) {
        console.error(error);
    }
}

export const getGradeValueByIssueIdAndGrade = async (issueId, grade) => {
    try {
        return await supabase.rpc('get_grade_value_by_issue_id_and_grade', {
            input_issue_id: issueId,
            input_grade: grade
        });
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const getTitleTotalValuesByUserAndTitle = async (userId, titleId) => {
    const {data, error} = await supabase.rpc('get_title_total_values_by_user_and_title', {
        input_user_id: userId,
        input_title_id: titleId
    });
    if (error) {
        console.error("Error in get_title_total_values_by_user: ", error);
        return null;
    }
    return data;
}

export const insertAllGradeValuesForIssue = async (issueId, callbackFunction) => {
    try {
        await supabase.rpc('insert_all_grade_values_for_issue', {
            input_issue_id: issueId,
            input_value: 0
        }).then(() => callbackFunction());
    } catch (error) {
        console.error(error);
    }
}

export const updateGradeValuesForTitles = async (titleId, prValue, gdValue, vgValue, fnValue, vfValue, nmValue, setLoadingState) => {
    try {
        await supabase.rpc('update_grade_values_for_titles', {
            title_ids: [titleId],
            value_pr: prValue,
            value_gd: gdValue,
            value_vg: vgValue,
            value_fn: fnValue,
            value_vf: vfValue,
            value_nm: nmValue,
        }).then(() => setLoadingState(LOADING_STATES.NONE));
    } catch (error) {
        console.error(error);
    }
}

// User
export const getUserIdByUserEmail = async (email) => {
    try {
        const {data, error} = await supabase.rpc('get_user_id_by_user_email', {input_user_email: email});
        if (error) {
            console.error("Error calling function: ", error);
            return null;
        }
        return data;
    } catch (error) {
        console.error("Unexpected error: ", error);
        return null;
    }
}
