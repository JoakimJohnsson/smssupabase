import {supabase} from "../supabase/supabaseClient";
import {MESSAGES} from "../helpers/constants";

// PROFILE FUNCTIONS
export async function getProfile(setLoading, setFirstname, setLastname, setWebsite, setAvatarImageFilename, id) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from('profiles')
            .select(`firstname, lastname, website, avatar_image_filename`)
            .eq('id', id)
            .single();

        if (error && status !== 406) {
            console.error('Error: ', error);
        }
        if (data) {
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setWebsite(data.website);
            setAvatarImageFilename(data.avatar_image_filename);
        }
    } catch (error) {
        console.error(error.message)
    } finally {
        setLoading(false)
    }
}

// TITLE FUNCTIONS
export async function addTitleData(name, startYear, endYear, format, totalIssues, titleImageFileName, titleImageUrl, setFormMessage, setShowFormSuccess, setShowFormError) {
    try {
        let {error} = await supabase.from('titles').insert([{
            name: name, start_year: startYear, end_year: endYear, format: format, total_issues: totalIssues, title_image_filename: titleImageFileName, title_image_url: titleImageUrl
        }])
        if (error) {
            console.error('Error: ', error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
            setShowFormSuccess(false);
            setShowFormError(true);
        } else {
            console.info("Done")
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
            setShowFormError(false);
            setShowFormSuccess(true);
        }
    } catch (error) {
        console.error(error.message)
    }
}

// GENERIC FUNCTIONS
export async function getRowsByTable(table, setData) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select('*')
        if (error && status !== 406) {
            console.error('Error: ', error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.error(error.message)
    }
}

export async function deleteRowsByTableAndId(table, id, name, setData, initialData) {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE + name + MESSAGES.CONFIRM.FROM + table + '.')) {
        return false;
    }
    try {
        await supabase
            .from(table)
            .delete().match({id: id})
        setData(initialData.filter((x) => x.id !== id));
    } catch (error) {
        console.error(error.message)
    }
}

export async function getRowsByTableWithLimitAndOrderByColumn(table, column, setData, limit, ascending) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select('*').limit(limit).order(column, {ascending})
        if (error && status !== 406) {
            console.error('Error: ', error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.error(error.message)
    }
}
