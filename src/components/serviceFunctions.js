import {supabase} from "../supabase/supabaseClient";
import {MESSAGES, TABLES} from "../helpers/constants";
import {generateUniqueHashedFilename} from "../helpers/functions";

// PROFILES FUNCTIONS
export async function getProfile(setLoading, setFirstname, setLastname, setWebsite, setAvatarImageFilename, id) {
    try {
        if (id) {
            setLoading(true);
            let {data, error, status} = await supabase
                .from(TABLES.PROFILES)
                .select("firstname, lastname, website, avatar_image_filename")
                .eq("id", id)
                .single();

            if (error && status !== 406) {
                console.error(error);
            }
            if (data) {
                setFirstname(data.firstname);
                setLastname(data.lastname);
                setWebsite(data.website);
                setAvatarImageFilename(data.avatar_image_filename);
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false)
    }
}

// TITLES FUNCTIONS
export async function addTitleData(data, setFormMessage) {
    try {
        let {error} = await supabase
            .from(TABLES.TITLES)
            .insert([{
                name: data.name,
                start_year: data.startYear,
                end_year: data.endYear,
                publisher_id: data.publisherId,
                format_id: data.formatId,
                total_issues: data.totalIssues
            }])
        if (error) {
            console.error(error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
        } else {
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updateTitleData(id, data, setFormMessage) {
    try {
        let {error} = await supabase
            .from(TABLES.TITLES)
            .update([{
                name: data.name,
                start_year: data.start_year,
                end_year: data.end_year,
                publisher_id: data.publisher_id,
                format_id: data.format_id,
                total_issues: data.total_issues
            }])
            .eq("id", id)
        if (error) {
            console.error(error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_UPDATE);
        } else {
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_UPDATE);
        }
    } catch (error) {
        console.error(error);
    }
}

// PUBLISHERS FUNCTIONS
export async function addPublisherData(data, setFormMessage) {
    try {
        let {error} = await supabase
            .from(TABLES.PUBLISHERS)
            .insert([{
                name: data.name,
                country_id: data.countryId
            }])
        if (error) {
            console.error(error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_INSERT);
        } else {
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_INSERT);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function updatePublisherData(id, data, setFormMessage) {
    try {
        let {error} = await supabase
            .from(TABLES.PUBLISHERS)
            .update([{
                name: data.name,
                country_id: data.country_id
            }])
            .eq("id", id)
        if (error) {
            console.error(error);
            setFormMessage(MESSAGES.ERROR.VALIDATION_UPDATE);
        } else {
            setFormMessage(MESSAGES.SUCCESS.VALIDATION_UPDATE);
        }
    } catch (error) {
        console.error(error);
    }
}

// GENERIC FUNCTIONS

export async function getRowsByTable(table, setData) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("*")
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getRowByTableAndId(table, setData, id) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("*")
            .eq("id", id)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data[0]);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getNameByTableAndId(table, id, setData) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("name")
            .eq("id", id)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data[0].name);
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteRowsByTableAndId(table, id, name, setData, initialData) {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE + name + MESSAGES.CONFIRM.FROM + table + ".")) {
        return false;
    }
    try {
        let {data, error, status} = await supabase
            .from(table)
            .delete()
            .match({id: id})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(initialData.filter((x) => x.id !== id))
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getRowsByTableWithLimitAndOrderByColumn(table, column, setData, limit, ascending) {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("*")
            .limit(limit)
            .order(column, {ascending})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data)
        }
    } catch (error) {
        console.error(error);
    }
}

// IMAGE FUNCTIONS

export const uploadImage = async (e, tableName, id, setUploading, bucketName, fileType, imageUrl, setImageFilename, setImageUrl) => {
    setUploading(true);
    if (!e.target.files || e.target.files.length === 0) {
        console.info(MESSAGES.ERROR.VALIDATION_UPLOAD_IMAGE);
    } else {
        let file = e.target.files[0];
        try {
            const fileExt = file.name.split(".").pop();
            const newFileName = generateUniqueHashedFilename(fileExt, fileType);
            let {error: uploadError} = await supabase
                .storage
                .from(bucketName)
                .upload(newFileName, file);
            setImageFilename(newFileName);
            setImageUrl(supabase
                .storage
                .from(bucketName)
                .getPublicUrl(newFileName).data.publicUrl);

            // Only used when updating image on existing row
            if (id) {
                await updateImageDataOnTable(tableName, id, newFileName, supabase
                    .storage
                    .from(bucketName)
                    .getPublicUrl(newFileName).data.publicUrl);
            }

            if (uploadError) {
                console.error(MESSAGES.ERROR.VALIDATION_UPLOAD);
            }
        } catch (error) {
            console.error(error);
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
            console.error(error);
        } finally {
            setUploading(false);
        }
    }
}

export const updateImageDataOnTable = async (tableName, id, updatedImageFileName, updatedImageUrl) => {
    if (id) {
        try {
            let {error} = await supabase
                .from(tableName)
                .update({image_filename: updatedImageFileName, image_url: updatedImageUrl})
                .match({id: id})
            if (error) {
                console.error(MESSAGES.ERROR.VALIDATION_DELETE_IMAGE_FROM_TABLE);
            }
        } catch (error) {
            console.error(error);
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
        console.error(error);
    }
}
