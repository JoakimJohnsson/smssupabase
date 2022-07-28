import {supabase} from "../supabase/supabaseClient";
import {MESSAGES} from "../helpers/constants";
import {logErrorMessage} from "../helpers/functions";

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
            logErrorMessage(error);
        }
        if (data) {
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setWebsite(data.website);
            setAvatarImageFilename(data.avatar_image_filename);
        }
    } catch (error) {
        logErrorMessage(error);
    } finally {
        setLoading(false)
    }
}

// TITLE FUNCTIONS
export async function getTitle(setLoading, setTitle, id) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from('titles')
            .select('*').eq('id', id)
        if (error && status !== 406) {
            logErrorMessage(error);
        }
        if (data) {
            setTitle(data[0])
        }
    } catch (error) {
        logErrorMessage(error);
    } finally {
        setLoading(false)
    }
}
export async function addTitleData(data, setFormMessage, setShowFormSuccess, setShowFormError) {
    try {
        let {error} = await supabase.from('titles').insert([{
            name: data.name,
            start_year: data.startYear,
            end_year: data.endYear,
            format: data.format,
            total_issues: data.totalIssues,
            image_filename: data.titleImageFilename,
            image_url: data.titleImageUrl
        }])
        if (error) {
            handleError(error, setFormMessage, setShowFormSuccess, setShowFormError);
        } else {
            handleSuccess(error, setFormMessage, setShowFormSuccess, setShowFormError);
        }
    } catch (error) {
        logErrorMessage(error);
    }
}

// PUBLISHER FUNCTIONS
export async function addPublisherData(data, setFormMessage, setShowFormSuccess, setShowFormError) {
    try {
        let {error} = await supabase.from('titles').insert([{
            name: data.name, image_filename: data.publisherImageFilename, image_url: data.publisherImageUrl
        }])
        if (error) {
            handleError(error, setFormMessage, setShowFormSuccess, setShowFormError);
        } else {
            handleSuccess(error, setFormMessage, setShowFormSuccess, setShowFormError);
        }
    } catch (error) {
        logErrorMessage(error);
    }
}

// GENERIC FUNCTIONS
export async function getRowsByTable(table, setData) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select('*')
        if (error && status !== 406) {
            logErrorMessage(error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        logErrorMessage(error);
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
        logErrorMessage(error);
    }
}

export async function getRowsByTableWithLimitAndOrderByColumn(table, column, setData, limit, ascending) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select('*').limit(limit).order(column, {ascending})
        if (error && status !== 406) {
            logErrorMessage(error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        logErrorMessage(error);
    }
}

export const deleteImage = async (fileName, setUploading, bucketName, setImageUrl, setImageFilename) => {
    if (fileName) {
        try {
            setUploading(true);
            let {error} = await supabase.storage
                .from(bucketName)
                .remove([fileName]);

            setImageUrl(null);
            setImageFilename(null);
            if (error) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
            }
        } catch (error) {
            logErrorMessage(error);
        } finally {
            setUploading(false);
        }
    }
}

export const deleteImageSimple = async (fileName, bucketName) => {
    try {
        let {error} = await supabase.storage
            .from(bucketName)
            .remove([fileName]);
        if (error) {
            console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
        }
    } catch (error) {
        logErrorMessage(error);
    }
}

// SERVICE FUNCTIONS UTILS
const handleError = (error, setFormMessage, setShowFormSuccess, setShowFormError) => {
    console.error('Error: ', error);
    setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
    setShowFormSuccess(false);
    setShowFormError(true);
}

const handleSuccess = (error, setFormMessage, setShowFormSuccess, setShowFormError) => {
    console.info("Done")
    setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
    setShowFormError(false);
    setShowFormSuccess(true);
}
