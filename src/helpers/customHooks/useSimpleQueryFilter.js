import {useSearchParams} from "react-router-dom";


export const useSimpleQueryFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams({filterQuery: ""});
    const filterQuery = searchParams.get("filterQuery");


    return [
        setSearchParams,
        filterQuery
    ]
}