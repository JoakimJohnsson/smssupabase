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
            console.log('Error: ', error);
        }

        if (data) {
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setWebsite(data.website);
            setAvatarImageFilename(data.avatar_image_filename);
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        setLoading(false)
    }
}

// TITLE FUNCTIONS
export async function addTitleData(name, startYear, endYear, format, totalIssues, setFormMessage, setShowFormSuccess, setShowFormError) {
    try {
        let {error} = await supabase.from('titles').insert([{
            name: name, start_year: startYear, end_year: endYear, format: format, total_issues: totalIssues
        }])
        if (error) {
            console.log('Error: ', error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
            setShowFormSuccess(false);
            setShowFormError(true);
        } else {
            console.log("Done")
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
            setShowFormError(false);
            setShowFormSuccess(true);
        }
    } catch (error) {
        console.log(error.message)
    }
}

// GENERAL FUNCTIONS
export async function getRowsByTable(setLoading, table, setData) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from(table)
            .select('*')
        if (error && status !== 406) {
            console.log('Error: ', error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        setLoading(false)
    }
}

export async function getRowsByTableWithLimitAndOrderByColumn(setLoading, table, column, setData, limit, ascending) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from(table)
            .select('*').limit(limit).order(column, {ascending})
        if (error && status !== 406) {
            console.log('Error: ', error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        setLoading(false)
    }
}

export async function getRowCountOfTable(setLoading, table, setRowCount) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from(table)
            .select('*', {count: 'exact'});
        if (error && status !== 406) {
            console.log('Error: ', error);
        }
        if (data) {
            setRowCount(data.length)
        }
    } catch (error) {
        console.log(error.message)
    } finally {
        setLoading(false)
    }
}
