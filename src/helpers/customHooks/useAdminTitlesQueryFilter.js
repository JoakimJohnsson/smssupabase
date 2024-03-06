import {useSearchParams} from "react-router-dom";


export const useAdminTitlesQueryFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams({query: "", isvalued: "", isnotvalued: ""});
    const query = searchParams.get("query");
    const isvalued = searchParams.get("isvalued");
    const isnotvalued = searchParams.get("isnotvalued");


    return {
        setSearchParams,
        query,
        isvalued,
        isnotvalued
    }
}