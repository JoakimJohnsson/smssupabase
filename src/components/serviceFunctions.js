import {supabase} from "../supabase/supabaseClient";
import {MESSAGES, TABLES} from "../helpers/constants";
import {generateUniqueHashedFilename} from "../helpers/functions";

// PROFILES FUNCTIONS
export async function getProfile(setLoading, setFirstname, setLastname, setWebsite, setAvatarImageFilename, id) {
    try {
        setLoading(true);
        let {data, error, status} = await supabase
            .from(TABLES.PROFILES)
            .select(`firstname, lastname, website, avatar_image_filename`)
            .eq("id", id)
            .single();

        if (error && status !== 406) {
            console.error("Error: ", error);
        }
        if (data) {
            setFirstname(data.firstname);
            setLastname(data.lastname);
            setWebsite(data.website);
            setAvatarImageFilename(data.avatar_image_filename);
        }
    } catch (error) {
        console.error("Error: ", error);
    } finally {
        setLoading(false)
    }
}

// TITLES FUNCTIONS
export async function addTitleData(data, deleteTitleImage, setFormMessage, setShowFormSuccess, setShowFormError) {
    try {
        let {error} = await supabase.from(TABLES.TITLES).insert([{
            name: data.name,
            start_year: data.startYear,
            end_year: data.endYear,
            publisher_id: data.publisherId,
            format_id: data.formatId,
            total_issues: data.totalIssues,
            image_filename: data.titleImageFilename,
            image_url: data.titleImageUrl
        }])
        if (error) {
            deleteTitleImage();
            console.error("Error: ", error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
            setShowFormSuccess(false);
            setShowFormError(true);
        } else {
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
            setShowFormError(false);
            setShowFormSuccess(true);
        }
    } catch (error) {
        deleteTitleImage();
        console.error("Error: ", error);
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
            console.error("Error: ", error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
            setShowFormSuccess(false);
            setShowFormError(true);
        } else {
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
            setShowFormError(false);
            setShowFormSuccess(true);
        }
    } catch (error) {
        deletePublisherImage();
        console.error("Error: ", error);
    }
}

// GENERIC FUNCTIONS

export async function getRowsByTable(table, setData) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("*")
        if (error && status !== 406) {
            console.error("Error: ", error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getRowByTableAndId(table, setData, id) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("*").eq("id", id)
        if (error && status !== 406) {
            console.error("Error: ", error);
        }
        if (data) {
            setData(data[0]);
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getNameByTableAndId(table, id, setData) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("name").eq("id", id)
        if (error && status !== 406) {
            console.error("Error: ", error);
        }
        if (data) {
            setData(data[0].name);
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function deleteRowsByTableAndId(table, id, name, setData, initialData) {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE + name + MESSAGES.CONFIRM.FROM + table + ".")) {
        return false;
    }
    try {
        let {data, error, status} = await supabase
            .from(table)
            .delete().match({id: id})
        if (error && status !== 406) {
            console.error("Error: ", error);
        }
        if (data) {
            setData(initialData.filter((x) => x.id !== id))
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getRowsByTableWithLimitAndOrderByColumn(table, column, setData, limit, ascending) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("*").limit(limit).order(column, {ascending})
        if (error && status !== 406) {
            console.error("Error: ", error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}

// IMAGE FUNCTIONS

export const uploadImage = async (e, fileName, setUploading, setDisableReset, bucketName, fileType, imageUrl, setImageFilename, setImageUrl) => {
    setUploading(true);
    setDisableReset(true);
    if (!e.target.files || e.target.files.length === 0) {
        console.info(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
    } else {
        let file = e.target.files[0];
        try {
            const fileExt = file.name.split(".").pop();
            const newFileName = generateUniqueHashedFilename(fileExt, fileType);
            let {error: uploadError} = await supabase.storage
                .from(bucketName)
                .upload(newFileName, file);
            setImageFilename(newFileName);
            setImageUrl(supabase
                .storage
                .from(bucketName)
                .getPublicUrl(newFileName).publicURL)
            if (uploadError) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
            }
        } catch (error) {
            console.error("Error: ", error);
        } finally {
            setUploading(false);
        }
    }
}

export const deleteImageFromBucket = async (fileName, setUploading, bucketName, setImageUrl, setImageFilename, table) => {
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
            console.error("Error: ", error);
        } finally {
            setUploading(false);
        }
    }
}

export const updateImageDataOnTable = async (tableName, imageFileName, updatedImageFileName, updatedImageUrl) => {
    if (imageFileName) {
        try {
            let {error} = await supabase
                .from(tableName)
                .update({image_filename: updatedImageUrl, image_url: updatedImageUrl})
                .match({image_filename: imageFileName})
            if (error) {
                console.error(MESSAGES.ERROR.VALIDATION_DELETE_IMAGE_FROM_TABLE);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }
}

export const deleteImageFromBucketSimple = async (fileName, bucketName) => {
    try {
        let {error} = await supabase.storage
            .from(bucketName)
            .remove([fileName]);
        if (error) {
            console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
        }
    } catch (error) {
        console.error("Error: ", error);
    }
}
