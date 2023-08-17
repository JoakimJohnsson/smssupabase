import {useSearchParams} from "react-router-dom";


export const useSimpleQueryFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams({query: ""});
    const query = searchParams.get("query");


    return [
        setSearchParams,
        query
    ]
}