import {supabase} from "../supabase/supabaseClient";
import {BUCKETS, MESSAGES, TABLES} from "../helpers/constants";
import {generateUniqueHashedFilename} from "../helpers/functions";

// PROFILES FUNCTIONS
export const getProfile = async (setLoading, setFirstname, setLastname, setWebsite, setAvatarImageFilename, id) => {
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


// PUBLISHERS FUNCTIONS
export const addPublisherData = async (data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.PUBLISHERS)
            .insert([{
                name: data.name,
                description: data.description,
                wiki_url: data.wiki_url,
                country_id: data.country_id
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updatePublisherData = async (id, data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.PUBLISHERS)
            .update([{
                name: data.name,
                description: data.description,
                wiki_url: data.wiki_url,
                country_id: data.country_id
            }])
            .eq("id", id)
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}


// ISSUES FUNCTIONS
export const addIssueData = async (data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.ISSUES)
            .insert([{
                title_id: data.title_id,
                year: data.year,
                number: data.number,
                is_marvelklubben: data.is_marvelklubben,
                marvelklubben_number: data.marvelklubben_number,
            }])
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const updateIssueData = async (id, data, setInformationMessage) => {
    try {
        let {error, status} = await supabase
            .from(TABLES.ISSUES)
            .update([{
                title_id: data.title_id,
                year: data.year,
                number: data.number,
                is_marvelklubben: data.is_marvelklubben,
                marvelklubben_number: data.marvelklubben_number,
            }])
            .eq("id", id)
        setInformationMessage({show: true, status: status, error: error});
    } catch (error) {
        console.error(error);
    }
}

export const generateIssuesForTitle = async (titleData, setInformationMessage) => {
    if (!window.confirm(MESSAGES.CONFIRM.GENERATE_ISSUES + " " + MESSAGES.CONFIRM.GENERATE + titleData.issuesPerYear + MESSAGES.CONFIRM.ISSUES_PER_YEAR)) {
        setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
        return false;
    }
    try {
        titleData.years.map(async (year) => {
            for (let i = 0; i < titleData.issuesPerYear; i++) {
                try {
                    await supabase
                        .from(TABLES.ISSUES)
                        .insert([{
                            title_id: titleData.titleId,
                            year: year,
                            number: i + 1,
                            is_marvelklubben: false,
                            marvelklubben_number: 0,
                        }])
                } catch (error) {
                    console.error(error);
                }
            }
        })
        setInformationMessage({show: true, status: 201, error: null});
    } catch (error) {
        console.error(error);
    }
}

export const deleteAllIssues = async (issuesData, setIssuesData, setInformationMessage) => {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE_ISSUES)) {
        setInformationMessage({show: true, status: 1, error: MESSAGES.INFO.ABORTED});
        return false;
    }
    try {
        issuesData.map(async (issue, index) => {
            await handleMultipleDeleteNoConfirm(TABLES.ISSUES, issue.id, issue.number, setIssuesData, issuesData,
                issue.image_filename, BUCKETS.ISSUE_IMAGES, setInformationMessage);
        })
        setInformationMessage({show: true, status: 2, error: MESSAGES.SUCCESS.VALIDATION_DELETE});
    } catch (error) {
        console.error(error);
    }
}


// GENERIC FUNCTIONS
export const getRowsByTable = async (table, setData) => {
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

export const getRowsByTableForeignKeyColumnAndForeignKeyId = async (table, keyCol, keyId, setData) => {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("*")
            .eq(keyCol, keyId)
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

export const getRowByTableAndId = async (table, setData, id) => {
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

export const getNameByTableAndId = async (table, id, setData) => {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("name")
            .eq("id", id)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data[0].name) {
            setData(data[0].name);
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteRowsByTableAndId = async (table, id, setData, initialData, setInformationMessage, doConfirm) => {
    try {
        let {error, status} = await supabase
            .from(table)
            .delete()
            .match({id: id})
        if (error && status !== 406) {
            setInformationMessage({show: true, status: status, error: error});
        } else {
            if (doConfirm) {
                setInformationMessage({show: true, status: status, error: error});
            }
            setData(initialData.filter((x) => x.id !== id))
        }
    } catch (error) {
        console.error(error);
    }
}

export const getRowsByTableWithLimitAndOrderByColumn = async (table, column, setData, limit, ascending) => {
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
                console.error(uploadError);
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
                console.error(error);
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
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
}

// HANDLER FUNCTIONS
export const handleDelete = async (table, id, name, setData, initialData, image_filename, bucket, setInformationMessage) => {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE + name + MESSAGES.CONFIRM.FROM + table + ".")) {
        return false;
    }
    try {
        deleteRowsByTableAndId(table, id, setData, initialData, setInformationMessage, true)
            .then(() => {
                if (image_filename && image_filename !== "") {
                    deleteImageFromBucketSimple(image_filename, bucket)
                }
            });
    } catch (error) {
        console.error(error);
    }
}

export const handleMultipleDeleteNoConfirm = async (table, id, name, setData, initialData, image_filename, bucket, setInformationMessage) => {
    try {
        deleteRowsByTableAndId(table, id, setData, initialData, setInformationMessage, false)
            .then(() => {
                if (image_filename && image_filename !== "") {
                    deleteImageFromBucketSimple(image_filename, bucket)
                }
            });
    } catch (error) {
        console.error(error);
    }
}


export const handleChange = (obj, setObj, name, value) => {
    setObj({...obj, [name]: value});
}

export const handleInput = (e, setInput) => {
    setInput(e.target.value)
}
