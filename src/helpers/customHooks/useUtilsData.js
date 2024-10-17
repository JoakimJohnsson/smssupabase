import {useState, useCallback, useEffect} from "react";
import {getRowByTableAndId} from "../../services/serviceFunctions";
import {TABLES} from "../constants/serviceConstants";


export const useUtilsData = () => {

    const [utilsData, setUtilsData] = useState(null);
    const fetchUtilsData = useCallback(() => {
        getRowByTableAndId(TABLES.UTILS, setUtilsData, 1).then();
    }, []);

    useEffect(() => {
        fetchUtilsData();
    }, [fetchUtilsData]);

    return {
        utilsData
    }
};
