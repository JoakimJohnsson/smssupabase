import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faSearch} from "@fortawesome/pro-solid-svg-icons";
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

    // Pick up search params if provided
    useEffect(() => {
        setFilterQuery(query || "");
        setFilterComic(isTrue(comic) || false);
        setFilterComiclarge(isTrue(comiclarge) || false);
        setFilterAlbum(isTrue(album) || false);
        setFilterPocket(isTrue(pocket) || false);
        setFilterHardcover(isTrue(hardcover) || false);
        setFilterSpecial(isTrue(special) || false);
    }, [query, comic, comiclarge, album, pocket, hardcover, special]);

    const updateSearchParams = () => {
        setSearchParams({
            query: filterQuery,
            comic: filterComic,
            comiclarge: filterComiclarge,
            album: filterAlbum,
            pocket: filterPocket,
            hardcover: filterHardcover,
            special: filterSpecial
        });
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            updateSearchParams();
        }
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
                           onChange={(e) => setFilterQuery(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" onClick={() => setFilterQuery("")} aria-label={LABELS_AND_HEADINGS.RESET}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
            </div>
            <div className="col-12 mb-2">
                <div className={"input-group"}>
                    {/* comic */}
                    <FilterButton id={formatData[0].id} name={formatData[0].name} state={filterComic} setState={setFilterComic}/>
                    {/* comiclarge */}
                    <FilterButton id={formatData[1].id} name={formatData[1].name} state={filterComiclarge} setState={setFilterComiclarge}/>
                    {/* album */}
                    <FilterButton id={formatData[2].id} name={formatData[2].name} state={filterAlbum} setState={setFilterAlbum}/>
                    {/* pocket */}
                    <FilterButton id={formatData[3].id} name={formatData[3].name} state={filterPocket} setState={setFilterPocket}/>
                    {/* hardcover */}
                    <FilterButton id={formatData[4].id} name={formatData[4].name} state={filterHardcover} setState={setFilterHardcover}/>
                    {/* special */}
                    <FilterButton id={formatData[5].id} name={formatData[5].name} state={filterSpecial} setState={setFilterSpecial}/>
                </div>
            </div>
            <button className="btn btn-primary mb-3" onClick={() => updateSearchParams()}>
                <FontAwesomeIcon icon={faSearch} className={"me-2"}/>
                {LABELS_AND_HEADINGS.SEARCH}
            </button>

            {/* TODO - remove testcode */}
            <div className={"bg-dark mb-3"}>
                <p className={"mt-4"}>filterComic {filterComic.toString()}</p>
                <p>filterComiclarge {filterComiclarge.toString()}</p>
                <p>filterAlbum {filterAlbum.toString()}</p>
                <p>filterPocket {filterPocket.toString()}</p>
                <p>filterHardcover {filterHardcover.toString()}</p>
                <p className={"mb-0"}>filterSpecial {filterSpecial.toString()}</p>
            </div>

        </div>
    )
};
export default FilterFormFormat;
