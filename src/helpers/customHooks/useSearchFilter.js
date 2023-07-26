import {useSearchParams} from "react-router-dom";


export const useSearchFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams({filterQuery: "", filterFormat: ""});
    const filterQuery = searchParams.get("filterQuery");
    const filterFormat = searchParams.get("filterFormat");

    return [
        searchParams,
        setSearchParams,
        filterQuery,
        filterFormat
    ]
}