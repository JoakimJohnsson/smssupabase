import {useSearchParams} from "react-router-dom";
import {DEFAULT_SEARCH_PARAMS_FORMATS} from "../constants";


export const useFormatQueryFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams(DEFAULT_SEARCH_PARAMS_FORMATS);

    const query = searchParams.get("query");
    const comic = searchParams.get("comic");
    const comiclarge = searchParams.get("comiclarge");
    const album = searchParams.get("album");
    const pocket = searchParams.get("pocket");
    const hardcover = searchParams.get("hardcover");
    const special = searchParams.get("special");
    const collectible = searchParams.get("collectible");

    return {
        setSearchParams,
        query,
        comic,
        comiclarge,
        album,
        pocket,
        hardcover,
        special,
        collectible
    }
}
