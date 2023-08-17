import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/pro-solid-svg-icons";
import {faFilters} from "@fortawesome/pro-duotone-svg-icons";
import {DEFAULT_SEARCH_PARAMS_FORMATS, LABELS_AND_HEADINGS} from "../../helpers/constants";
import formatData from "../../helpers/valueLists/formats.json";


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

    return (
        <div className={"form-group sms-section--light mb-4"}>
            <div className="col-12 mb-2">
                <label className={"form-label"} htmlFor="query">{LABELS_AND_HEADINGS.DO_FILTER}</label>
                <div className="input-group mb-3">
                    <span className="input-group-text"><FontAwesomeIcon icon={faFilters}/></span>
                    <input id="query"
                           name="query"
                           type="text"
                           className="form-control border-bottom-0"
                           placeholder={placeholder}
                           value={query}
                           onChange={e => setSearchParams({query: e.target.value})}
                    />
                </div>
                <div className={"input-group mb-3"}>
                    {/* comic */}
                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={formatData[0].id} autoComplete="off"/>
                        <label className={"btn btn-sm btn-outline-secondary mb-2"} htmlFor={formatData[0].id}>{formatData[0].name}</label>
                    </div>
                    {/* comiclarge */}
                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={formatData[1].id} autoComplete="off"/>
                        <label className={"btn btn-sm btn-outline-secondary mb-2"} htmlFor={formatData[1].id}>{formatData[1].name}</label>
                    </div>
                    {/* album */}
                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={formatData[2].id} autoComplete="off"/>
                        <label className={"btn btn-sm btn-outline-secondary mb-2"} htmlFor={formatData[2].id}>{formatData[2].name}</label>
                    </div>
                    {/* pocket */}
                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={formatData[3].id} autoComplete="off"/>
                        <label className={"btn btn-sm btn-outline-secondary mb-2"} htmlFor={formatData[3].id}>{formatData[3].name}</label>
                    </div>
                    {/* hardcover */}
                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={formatData[4].id} autoComplete="off"/>
                        <label className={"btn btn-sm btn-outline-secondary mb-2"} htmlFor={formatData[4].id}>{formatData[4].name}</label>
                    </div>
                    {/* special */}
                    <div className={"form-check p-0 me-3"}>
                        <input type={"checkbox"} className={"btn-check"} id={formatData[5].id} autoComplete="off"/>
                        <label className={"btn btn-sm btn-outline-secondary mb-2"} htmlFor={formatData[5].id}>{formatData[5].name}</label>
                    </div>
                </div>
                {
                    query !== "" &&
                    <button className="btn btn-primary" onClick={() => setSearchParams(DEFAULT_SEARCH_PARAMS_FORMATS)}>
                        <FontAwesomeIcon icon={faTimes} className={"me-2"}/>
                        {LABELS_AND_HEADINGS.RESET_FILTER}
                    </button>
                }
            </div>
        </div>
    )
};
export default FilterFormFormat;
