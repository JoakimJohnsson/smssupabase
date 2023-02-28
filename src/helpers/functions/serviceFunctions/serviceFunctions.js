import {supabase} from "../../../supabase/supabaseClient";
import {MESSAGES} from "../../constants";
import {deleteImageFromBucketSimple} from "./imageFunctions";

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
