import {supabase} from "../supabase/supabaseClient";
import {MESSAGES, TABLES} from "../helpers/constants";
import {deleteImageFromBucketSimple} from "./imageService";
import * as CollectingService from "./collectingService";
import {doesEmailExist, getCurrentDateAsISOString} from "../helpers/functions";

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
            setData(data);
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
            setData(data);
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

export const getCountByTable = async (table, setData) => {
    try {
        let {count, error} = await supabase
            .from(table)
            .select('*', {count: 'exact', head: true})
        if (error) {
            console.error(error);
        }
        if (count) {
            setData(count);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getRowCountByTableAndUserId = async (table, userId, setData) => {
    try {
        let {count, error} = await supabase
            .from(table)
            .select('*', {count: 'exact', head: true})
            .eq("user_id", userId);
        if (error) {
            console.error(error);
        }
        if (count) {
            setData(count);
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

export const getStartYearByTableAndId = async (table, id, setData) => {
    try {
        let {data, error, status} = await supabase
            .from(table)
            .select("start_year")
            .eq("id", id)
        if (error && status !== 406) {
            console.error(error);
        }
        if (data && data[0].start_year) {
            setData(data[0].start_year);
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
            .order(column, {ascending: true})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            setData(data);
        }
    } catch (error) {
        console.error(error);
    }
}

export const getTotalValuationValuesForUser = async (userId) => {
    try {
        let {data, error, status} = await supabase
            .from(TABLES.USER_TOTAL_VALUATION_VALUES)
            .select("*")
            .match({user_id: userId})
            .order("total_valuation_date", {ascending: true})
        if (error && status !== 406) {
            console.error(error);
        }
        if (data) {
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}

export const addTotalValuationValueForUser = async (userId, value) => {
    try {
        await supabase
            .from(TABLES.USER_TOTAL_VALUATION_VALUES)
            .insert([{
                user_id: userId,
                total_valuation_value: value,
                total_valuation_date: getCurrentDateAsISOString()
            }]);
    } catch (error) {
        console.error(error);
    }
}

export const deleteTotalValuationValueForUserById = async (id) => {
    try {
        await supabase
            .from(TABLES.USER_TOTAL_VALUATION_VALUES)
            .delete()
            .match({id: id});
    } catch (error) {
        console.error(error);
    }
}

export const deleteAllTotalValuationValueForUserByUserId = async (userId) => {
    try {
        await supabase
            .from(TABLES.USER_TOTAL_VALUATION_VALUES)
            .delete()
            .match({user_id: userId});
    } catch (error) {
        console.error(error);
    }
}

// HANDLERS
export const handleDelete = async (table, id, name, setData, initialData, image_filename, bucket, setInformationMessage) => {
    if (!window.confirm(MESSAGES.CONFIRM.DELETE + name + MESSAGES.CONFIRM.FROM + table + ".")) {
        return false;
    }
    try {
        if (table === TABLES.ISSUES) {
            // Delete all grades
            try {
                await supabase
                    .from(TABLES.GRADES)
                    .delete()
                    .match({issue_id: id})
            } catch (error) {
                console.error(error);
            }
            // Delete users issues
            try {
                await supabase
                    .from(TABLES.USERS_ISSUES)
                    .delete()
                    .match({issue_id: id})
            } catch (error) {
                console.error(error);
            }
        }
        console.log("Deleting rows");
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

export const handleCollectingTitle = (userId, titleId, setInformationMessage, isCollectingTitle, setIsCollectingTitle, doConfirm) => {
    if (isCollectingTitle) {
        CollectingService.deleteTitleFromCollection(userId, titleId, setInformationMessage, setIsCollectingTitle, doConfirm).then(() => {
        });

    } else {
        CollectingService.addTitleToCollection(userId, titleId).then(() => setIsCollectingTitle(true));
    }
}

export const handleCollectingIssue = (userId, issueId, setInformationMessage, isCollectingIssue, setIsCollectingIssue) => {
    if (isCollectingIssue) {
        CollectingService.deleteIssueFromCollection(userId, issueId, setInformationMessage, setIsCollectingIssue).then(() => {
            CollectingService.deleteAllGradesByUserAndIssue(userId, issueId).then();
        });
    } else {
        CollectingService.addIssueToCollection(userId, issueId).then(() => setIsCollectingIssue(true));
    }
}

// Trigger a reset of password
export const requestPasswordResetForEmail = async (email, setMessage, e) => {
    e.preventDefault();
    const emailExists = await doesEmailExist(email);
    if (emailExists) {
        try {
            await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: "https://svenskamarvelsamlare.se/change-password",
            })
        } catch (error) {
            console.error(error.message)
            setMessage({show: true, message: MESSAGES.ERROR.VALIDATION_PASSWORD_REQUEST_FORM, isError: true})
        } finally {
            setMessage({show: true, message: MESSAGES.SUCCESS.VALIDATION_PASSWORD_REQUEST_FORM, isError: false})
            console.info("Reset password request sent for email: ", email);
        }
    } else {
        setMessage({show: true, message: MESSAGES.ERROR.VALIDATION_PASSWORD_REQUEST_FORM_NOTFOUND, isError: true})
    }
}

export const handleChange = (obj, setObj, name, value) => {
    setObj({...obj, [name]: value});
}

export const handleInput = (e, setInput) => {
    setInput(e.target.value)
}
