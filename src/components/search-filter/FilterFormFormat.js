import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faSearch, faDeleteLeft} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import {LABELS_AND_HEADINGS} from "../../helpers/constants";
import formatData from "../../helpers/valueLists/formats.json";
import {isTrue} from "../../helpers/functions/functions";
import FilterButton from "./FilterButton";


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

    // Initial states to hold our input queries
    const [filterQuery, setFilterQuery] = useState("");
    const [filterComic, setFilterComic] = useState(false);
    const [filterComiclarge, setFilterComiclarge] = useState(false);
    const [filterAlbum, setFilterAlbum] = useState(false);
    const [filterPocket, setFilterPocket] = useState(false);
    const [filterHardcover, setFilterHardcover] = useState(false);
    const [filterSpecial, setFilterSpecial] = useState(false);
    const [filterCollectible, setFilterCollectible] = useState(false);
    const [readyForSearch, setReadyForSearch] = useState(false);

    // Pick up search params if provided
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
        setReadyForSearch(false);
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            updateSearchParams();
        }
    }

    const handleChange = (e) => {
        setReadyForSearch(true);
        setFilterQuery(e.target.value);
    }

    const handleReset = () => {
        setReadyForSearch(true);
        setFilterQuery("");
    }

    const handleResetAll = () => {
        handleReset();
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
        <div className={"form-group sms-section--light mb-4"}>
            <div className="col-12 col-xl-8 mb-2">
                <label className={"form-label"} htmlFor="query">{LABELS_AND_HEADINGS.DO_FILTER}</label>
                <div className="input-group mb-3 col-8">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="query"
                           name="query"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={placeholder}
                           value={filterQuery}
                           onKeyDown={(e) => handleEnter(e)}
                           onChange={(e) => handleChange(e)}
                    />
                    {
                        filterQuery !== "" &&
                        <button className="btn btn-primary" onClick={() => handleReset()}>
                            <FontAwesomeIcon icon={faTimes} className={"me-2"}/>
                            {LABELS_AND_HEADINGS.RESET}
                        </button>
                    }
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className={"input-group"}>
                    {/* comic 32545 */}
                    <FilterButton format={getFormat(32545)} state={filterComic} setState={setFilterComic}
                                  setReadyForSearch={setReadyForSearch}/>
                    {/* comiclarge 33541 */}
                    <FilterButton format={getFormat(33541)} state={filterComiclarge} setState={setFilterComiclarge}
                                  setReadyForSearch={setReadyForSearch}/>
                    {/* album 23445 */}
                    <FilterButton format={getFormat(23445)} state={filterAlbum} setState={setFilterAlbum}
                                  setReadyForSearch={setReadyForSearch}/>
                    {/* pocket 24543 */}
                    <FilterButton format={getFormat(24543)} state={filterPocket} setState={setFilterPocket}
                                  setReadyForSearch={setReadyForSearch}/>
                    {/* hardcover 23577 */}
                    <FilterButton format={getFormat(23577)} state={filterHardcover} setState={setFilterHardcover}
                                  setReadyForSearch={setReadyForSearch}/>
                    {/* special 26224 */}
                    <FilterButton format={getFormat(26224)} state={filterSpecial} setState={setFilterSpecial}
                                  setReadyForSearch={setReadyForSearch}/>
                    {/* special 674899 */}
                    <FilterButton format={getFormat(674899)} state={filterCollectible} setState={setFilterCollectible}
                                  setReadyForSearch={setReadyForSearch}/>
                </div>
            </div>
            <button className="btn btn-lg btn-primary mb-3 me-3" onClick={() => updateSearchParams()} disabled={!readyForSearch}>
                <FontAwesomeIcon icon={faSearch} className={"me-2"}/>
                {LABELS_AND_HEADINGS.FIND_TITLES}
            </button>
            <button className="btn btn-lg btn-outline-primary mb-3" onClick={() => handleResetAll()}>
                <FontAwesomeIcon icon={faDeleteLeft} className={"me-2"}/>
                {LABELS_AND_HEADINGS.RESET_FILTER}
            </button>
        </div>
    )
};
export default FilterFormFormat;
