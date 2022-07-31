import {supabase} from "../supabase/supabaseClient";
import {MESSAGES, TABLES} from "../helpers/constants";
import {generateUniqueHashedFilename, logErrorMessage} from "../helpers/functions";

// PROFILES FUNCTIONS
export async function getProfile(setLoading, setFirstname, setLastname, setWebsite, setAvatarImageFilename, id) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from(TABLES.PROFILES)
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

// TITLES FUNCTIONS
export async function getTitle(setLoading, setTitle, id) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from(TABLES.TITLES)
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

export async function addTitleData(data, deleteTitleImage, setFormMessage, setShowFormSuccess, setShowFormError) {
    try {
        let {error} = await supabase.from(TABLES.TITLES).insert([{
            name: data.name,
            start_year: data.startYear,
            end_year: data.endYear,
            publisher: data.publisherId,
            format_id: data.formatId,
            total_issues: data.totalIssues,
            image_filename: data.titleImageFilename,
            image_url: data.titleImageUrl
        }])
        if (error) {
            deleteTitleImage();
            handleError(error, setFormMessage, setShowFormSuccess, setShowFormError);
        } else {
            handleSuccess(error, setFormMessage, setShowFormSuccess, setShowFormError);
        }
    } catch (error) {
        deleteTitleImage();
        logErrorMessage(error);
    }
}

// PUBLISHERS FUNCTIONS
export async function addPublisherData(data, deletePublisherImage, setFormMessage, setShowFormSuccess, setShowFormError) {
    try {
        let {error} = await supabase.from(TABLES.PUBLISHERS).insert([{
            name: data.name, country_id: data.countryId, image_filename: data.publisherImageFilename, image_url: data.publisherImageUrl
        }])
        if (error) {
            deletePublisherImage();
            handleError(error, setFormMessage, setShowFormSuccess, setShowFormError);
        } else {
            handleSuccess(error, setFormMessage, setShowFormSuccess, setShowFormError);
        }
    } catch (error) {
        deletePublisherImage();
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

// IMAGE FUNCTIONS

export const uploadImage = async (e, fileName, setUploading, setDisableReset, bucket, fileType, imageUrl, setImageFilename, setImageUrl) => {
    setUploading(true);
    setDisableReset(true);
    if (!e.target.files || e.target.files.length === 0) {
        console.log(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
    } else {
        let file = e.target.files[0];
        try {
            const fileExt = file.name.split('.').pop();
            const newFileName = generateUniqueHashedFilename(fileExt, fileType);
            let {error: uploadError} = await supabase.storage
                .from(bucket)
                .upload(newFileName, file);
            setImageFilename(newFileName);
            setImageUrl(supabase
                .storage
                .from(bucket)
                .getPublicUrl(newFileName).publicURL)
            if (uploadError) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD + ' 1');
            }
        } catch (error) {
            logErrorMessage(error);
        } finally {
            setUploading(false);
        }
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

// UTILS
const handleError = (error, setFormMessage, setShowFormSuccess, setShowFormError) => {
    logErrorMessage(error);
    setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
    setShowFormSuccess(false);
    setShowFormError(true);
}

const handleSuccess = (error, setFormMessage, setShowFormSuccess, setShowFormError) => {
    setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
    setShowFormError(false);
    setShowFormSuccess(true);
}
