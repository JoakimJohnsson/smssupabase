import {useSearchParams} from "react-router-dom";


export const useSearchFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams({filter: ""});
    const filter = searchParams.get("filter");

    return [
        searchParams,
        setSearchParams,
        filter
    ]
}