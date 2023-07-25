import {useSearchParams} from "react-router-dom";


export const useSearchFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams({filterQuery: ""});
    const filterQuery = searchParams.get("filterQuery");

    return [
        searchParams,
        setSearchParams,
        filterQuery
    ]
}