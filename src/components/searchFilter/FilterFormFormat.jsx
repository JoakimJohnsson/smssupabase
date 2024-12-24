import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDeleteLeft} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import formatData from "../../helpers/valueLists/formats.json";
import {isTrue} from "../../helpers/functions";
import FilterButtonFormat from "./FilterButtonFormat.jsx";
import {LABELS} from "../../helpers/constants/textConstants/labelsAndHeadings";

const FilterFormFormat = ({
                              setSearchParams,
                              query,
                              comic,
                              comiclarge,
                              album,
                              pocket,
                              hardcover,
                              special,
                              collectible,
                              placeholder
                          }) => {

    const [filterQuery, setFilterQuery] = useState("");
    const [filterComic, setFilterComic] = useState(false);
    const [filterComiclarge, setFilterComiclarge] = useState(false);
    const [filterAlbum, setFilterAlbum] = useState(false);
    const [filterPocket, setFilterPocket] = useState(false);
    const [filterHardcover, setFilterHardcover] = useState(false);
    const [filterSpecial, setFilterSpecial] = useState(false);
    const [filterCollectible, setFilterCollectible] = useState(false);

    useEffect(() => {
        setFilterQuery(query || "");
        setFilterComic(isTrue(comic) || false);
        setFilterComiclarge(isTrue(comiclarge) || false);
        setFilterAlbum(isTrue(album) || false);
        setFilterPocket(isTrue(pocket) || false);
        setFilterHardcover(isTrue(hardcover) || false);
        setFilterSpecial(isTrue(special) || false);
        setFilterCollectible(isTrue(collectible) || false);
    }, [query, comic, comiclarge, album, pocket, hardcover, special, collectible]);

    useEffect(() => {
        updateSearchParams();
    }, [filterQuery, filterComic, filterComiclarge, filterAlbum, filterPocket, filterHardcover, filterSpecial, filterCollectible]);

    const updateSearchParams = () => {
        setSearchParams({
            query: filterQuery,
            comic: filterComic,
            comiclarge: filterComiclarge,
            album: filterAlbum,
            pocket: filterPocket,
            hardcover: filterHardcover,
            special: filterSpecial,
            collectible: filterCollectible
        });
    }

    const handleChange = (e) => {
        setFilterQuery(e.target.value);
    }

    const handleReset = () => {
        setFilterQuery("");
        setFilterComic(false);
        setFilterComiclarge(false);
        setFilterAlbum(false);
        setFilterPocket(false);
        setFilterHardcover(false);
        setFilterSpecial(false);
        setFilterCollectible(false);
    }

    const getFormat = (id) => {
        return formatData.find(item => item.id === id);
    }

    return (
        <div className={"col-12 form-group mb-4 bg-horse p-4"}>
            <div className="col-12 col-xl-8 mb-2">
                <label className={"form-label"} htmlFor="query">{LABELS.COMMON.DO_FILTER}</label>
                <div className="input-group mb-3 col-8">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="query"
                           name="query"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={placeholder}
                           value={filterQuery}
                           onChange={handleChange}
                    />
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className={"input-group"}>
                    <FilterButtonFormat format={getFormat(32545)} state={filterComic} setState={setFilterComic}/>
                    <FilterButtonFormat format={getFormat(33541)} state={filterComiclarge} setState={setFilterComiclarge}/>
                    <FilterButtonFormat format={getFormat(23445)} state={filterAlbum} setState={setFilterAlbum}/>
                    <FilterButtonFormat format={getFormat(24543)} state={filterPocket} setState={setFilterPocket}/>
                    <FilterButtonFormat format={getFormat(23577)} state={filterHardcover} setState={setFilterHardcover}/>
                    <FilterButtonFormat format={getFormat(26224)} state={filterSpecial} setState={setFilterSpecial}/>
                    <FilterButtonFormat format={getFormat(674899)} state={filterCollectible} setState={setFilterCollectible}/>
                </div>
            </div>
            <button className="btn btn-lg btn-outline-primary mb-3" onClick={handleReset}>
                <FontAwesomeIcon icon={faDeleteLeft} className={"me-2"}/>
                {LABELS.COMMON.RESET_FILTER}
            </button>
        </div>
    )
};

export default FilterFormFormat;